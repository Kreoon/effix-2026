-- ============================================================================
-- Migration: 20260417 — Admin Effix schema
-- Project:   Supabase domxgsrajwyuaffiqbtr (compartido con UGC Colombia)
-- Descripción:
--   Crea el namespace admin_effix_* para la consola de administración del
--   Grupo Effi. Se aísla con prefijo para no colisionar con las tablas de
--   UGC Colombia u otras apps que usen el mismo proyecto.
--
-- Contenido:
--   1. Enums   — admin_effix_role, admin_effix_lead_status, platform, funnel
--   2. Tablas  — profiles, leads, campaigns, audit_log, settings
--   3. Índices — comunes para queries del admin
--   4. Triggers — updated_at + audit log
--   5. RLS     — lectura/escritura por role
--   6. Helpers — función current_role() para políticas
--   7. Seed    — primer super_admin (ejecutar aparte reemplazando el email)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensiones
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";


-- ----------------------------------------------------------------------------
-- 1. Enums
-- ----------------------------------------------------------------------------

do $$ begin
  create type admin_effix_role as enum ('super_admin', 'admin', 'viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_lead_status as enum (
    'new',
    'contacted',
    'qualified',
    'demo_scheduled',
    'demo_done',
    'won',
    'lost',
    'opt_out',
    'duplicate'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_platform as enum ('meta', 'google', 'tiktok', 'whatsapp', 'email', 'referral', 'organic');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_funnel as enum ('A', 'B', 'cross');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_campaign_status as enum ('draft', 'review', 'approved', 'live', 'paused', 'ended', 'archived');
exception when duplicate_object then null; end $$;


-- ----------------------------------------------------------------------------
-- 2. Tablas
-- ----------------------------------------------------------------------------

-- admin_effix_profiles — extiende auth.users con role + metadata admin
create table if not exists public.admin_effix_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null unique,
  full_name     text,
  role          admin_effix_role not null default 'viewer',
  is_active     boolean not null default true,
  marca_scope   text[] default '{}',      -- marcas que puede ver; vacío = todas
  pais_scope    text[] default '{}',      -- países; vacío = todos
  last_sign_in  timestamptz,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.admin_effix_profiles is
  'Perfil de administrador. Extiende auth.users. Solo usuarios en esta tabla entran al admin.';


-- admin_effix_leads — leads de todos los funnels (EffiCommerce CR, otros)
create table if not exists public.admin_effix_leads (
  id              uuid primary key default gen_random_uuid(),
  marca_slug      text not null,
  pais            text not null,              -- 'CR', 'CO', 'EC', 'RD', etc.
  funnel          admin_effix_funnel not null,
  source          admin_effix_platform not null,
  nombre          text,
  telefono        text,
  email           text,
  profile_type    text,                        -- 'pulperia', 'soda', 'taller', 'professional', 'shopify_store'
  negocio_nombre  text,
  negocio_url     text,
  facturacion_mes text,                        -- '<5k', '5-20k', '20-50k', '>50k' en USD
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_content     text,
  utm_term        text,
  consent_ts      timestamptz not null,
  consent_version text,
  status          admin_effix_lead_status not null default 'new',
  score           smallint,                    -- 0-100 del diagnóstico
  diagnostico     jsonb,                       -- respuestas del diagnóstico Factura 4.4
  sdr_owner       uuid references public.admin_effix_profiles(id) on delete set null,
  wa_responded    boolean not null default false,
  demo_scheduled  boolean not null default false,
  demo_scheduled_at timestamptz,
  notes           text,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.admin_effix_leads is
  'Leads capturados por todas las landings + ads del Grupo Effi. Multi-marca, multi-país.';


-- admin_effix_campaigns — campañas Meta/Google/etc. por marca-país
create table if not exists public.admin_effix_campaigns (
  id              uuid primary key default gen_random_uuid(),
  marca_slug      text not null,
  pais            text not null,
  platform        admin_effix_platform not null,
  external_id     text,                        -- Campaign ID en Meta/Google
  name            text not null,
  funnel          admin_effix_funnel,
  status          admin_effix_campaign_status not null default 'draft',
  budget_daily_usd numeric(10,2),
  budget_total_usd numeric(10,2),
  start_date      date,
  end_date        date,
  objectives      text[],
  audiences       jsonb default '[]'::jsonb,
  metrics_last    jsonb,                       -- snapshot de últimas métricas (CPM, CTR, CPA, etc.)
  metrics_updated_at timestamptz,
  created_by      uuid references public.admin_effix_profiles(id) on delete set null,
  updated_by      uuid references public.admin_effix_profiles(id) on delete set null,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (platform, external_id)
);

comment on table public.admin_effix_campaigns is
  'Campañas de pauta. external_id apunta a la ID real en la plataforma. Snapshot de métricas se actualiza via n8n.';


-- admin_effix_audit_log — log append-only
create table if not exists public.admin_effix_audit_log (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.admin_effix_profiles(id) on delete set null,
  user_email    text,                          -- snapshot por si se borra el profile
  action        text not null,                 -- 'sign_in', 'sign_out', 'create', 'update', 'delete', 'export'
  entity_type   text,                          -- 'lead', 'campaign', 'profile', 'setting'
  entity_id     uuid,
  changes       jsonb,                         -- diff si aplica
  ip_address    inet,
  user_agent    text,
  created_at    timestamptz not null default now()
);

comment on table public.admin_effix_audit_log is
  'Log append-only de acciones. No se edita ni borra. Retención mínima 12 meses.';


-- admin_effix_settings — configuración clave-valor
create table if not exists public.admin_effix_settings (
  key           text primary key,
  value         jsonb not null,
  category      text,                          -- 'general', 'ads', 'integrations', 'notifications'
  description   text,
  updated_by    uuid references public.admin_effix_profiles(id) on delete set null,
  updated_at    timestamptz not null default now()
);

comment on table public.admin_effix_settings is
  'Configuración global de la app admin. Clave-valor JSONB.';


-- ----------------------------------------------------------------------------
-- 3. Índices
-- ----------------------------------------------------------------------------

create index if not exists idx_admin_effix_leads_marca_pais
  on public.admin_effix_leads (marca_slug, pais);

create index if not exists idx_admin_effix_leads_status
  on public.admin_effix_leads (status);

create index if not exists idx_admin_effix_leads_created_at
  on public.admin_effix_leads (created_at desc);

create index if not exists idx_admin_effix_leads_sdr_owner
  on public.admin_effix_leads (sdr_owner)
  where sdr_owner is not null;

create index if not exists idx_admin_effix_leads_utm_campaign
  on public.admin_effix_leads (utm_campaign)
  where utm_campaign is not null;

create index if not exists idx_admin_effix_campaigns_marca_pais
  on public.admin_effix_campaigns (marca_slug, pais);

create index if not exists idx_admin_effix_campaigns_status
  on public.admin_effix_campaigns (status);

create index if not exists idx_admin_effix_audit_user
  on public.admin_effix_audit_log (user_id, created_at desc);

create index if not exists idx_admin_effix_audit_entity
  on public.admin_effix_audit_log (entity_type, entity_id);


-- ----------------------------------------------------------------------------
-- 4. Triggers — updated_at automático
-- ----------------------------------------------------------------------------

create or replace function public.admin_effix_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_admin_effix_profiles_updated_at on public.admin_effix_profiles;
create trigger trg_admin_effix_profiles_updated_at
  before update on public.admin_effix_profiles
  for each row execute function public.admin_effix_set_updated_at();

drop trigger if exists trg_admin_effix_leads_updated_at on public.admin_effix_leads;
create trigger trg_admin_effix_leads_updated_at
  before update on public.admin_effix_leads
  for each row execute function public.admin_effix_set_updated_at();

drop trigger if exists trg_admin_effix_campaigns_updated_at on public.admin_effix_campaigns;
create trigger trg_admin_effix_campaigns_updated_at
  before update on public.admin_effix_campaigns
  for each row execute function public.admin_effix_set_updated_at();

drop trigger if exists trg_admin_effix_settings_updated_at on public.admin_effix_settings;
create trigger trg_admin_effix_settings_updated_at
  before update on public.admin_effix_settings
  for each row execute function public.admin_effix_set_updated_at();


-- ----------------------------------------------------------------------------
-- 5. Helpers — función para conocer el role del user actual
-- ----------------------------------------------------------------------------

create or replace function public.admin_effix_current_role()
returns admin_effix_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.admin_effix_profiles
  where id = auth.uid()
    and is_active = true
  limit 1
$$;

create or replace function public.admin_effix_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_effix_profiles
    where id = auth.uid()
      and is_active = true
      and role in ('super_admin', 'admin')
  )
$$;

create or replace function public.admin_effix_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_effix_profiles
    where id = auth.uid()
      and is_active = true
      and role = 'super_admin'
  )
$$;


-- ----------------------------------------------------------------------------
-- 6. Row Level Security
-- ----------------------------------------------------------------------------

alter table public.admin_effix_profiles   enable row level security;
alter table public.admin_effix_leads      enable row level security;
alter table public.admin_effix_campaigns  enable row level security;
alter table public.admin_effix_audit_log  enable row level security;
alter table public.admin_effix_settings   enable row level security;


-- profiles
drop policy if exists "profiles_select_active" on public.admin_effix_profiles;
create policy "profiles_select_active" on public.admin_effix_profiles
  for select
  using (
    -- todos los perfiles activos pueden ver la lista de otros perfiles activos (UI de equipo)
    auth.uid() is not null
    and public.admin_effix_current_role() is not null
  );

drop policy if exists "profiles_update_self" on public.admin_effix_profiles;
create policy "profiles_update_self" on public.admin_effix_profiles
  for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.admin_effix_profiles where id = auth.uid()));
-- nota: super_admin actualiza roles via función RPC separada (security definer) para auditar

drop policy if exists "profiles_all_super_admin" on public.admin_effix_profiles;
create policy "profiles_all_super_admin" on public.admin_effix_profiles
  for all
  using (public.admin_effix_is_super_admin())
  with check (public.admin_effix_is_super_admin());


-- leads
drop policy if exists "leads_select_admins" on public.admin_effix_leads;
create policy "leads_select_admins" on public.admin_effix_leads
  for select
  using (
    public.admin_effix_current_role() is not null
    and (
      -- admins y super_admins ven todo
      public.admin_effix_is_admin()
      -- viewers ven solo si el marca/pais está en su scope (o scope vacío = ver todo)
      or exists (
        select 1 from public.admin_effix_profiles
        where id = auth.uid()
          and (
            (coalesce(array_length(marca_scope, 1), 0) = 0 or marca_slug = any(marca_scope))
            and (coalesce(array_length(pais_scope, 1), 0) = 0 or pais = any(pais_scope))
          )
      )
    )
  );

drop policy if exists "leads_insert_admins" on public.admin_effix_leads;
create policy "leads_insert_admins" on public.admin_effix_leads
  for insert
  with check (public.admin_effix_is_admin());

drop policy if exists "leads_update_admins" on public.admin_effix_leads;
create policy "leads_update_admins" on public.admin_effix_leads
  for update
  using (public.admin_effix_is_admin())
  with check (public.admin_effix_is_admin());

drop policy if exists "leads_delete_super_admin" on public.admin_effix_leads;
create policy "leads_delete_super_admin" on public.admin_effix_leads
  for delete
  using (public.admin_effix_is_super_admin());


-- campaigns
drop policy if exists "campaigns_select_all_profiles" on public.admin_effix_campaigns;
create policy "campaigns_select_all_profiles" on public.admin_effix_campaigns
  for select
  using (public.admin_effix_current_role() is not null);

drop policy if exists "campaigns_write_admins" on public.admin_effix_campaigns;
create policy "campaigns_write_admins" on public.admin_effix_campaigns
  for all
  using (public.admin_effix_is_admin())
  with check (public.admin_effix_is_admin());


-- audit log — todos leen, nadie escribe directo (se inserta via trigger o RPC)
drop policy if exists "audit_select_admins" on public.admin_effix_audit_log;
create policy "audit_select_admins" on public.admin_effix_audit_log
  for select
  using (public.admin_effix_is_admin());

drop policy if exists "audit_insert_any_authenticated" on public.admin_effix_audit_log;
create policy "audit_insert_any_authenticated" on public.admin_effix_audit_log
  for insert
  with check (auth.uid() is not null);


-- settings — todos ven, solo super_admin escribe
drop policy if exists "settings_select_admins" on public.admin_effix_settings;
create policy "settings_select_admins" on public.admin_effix_settings
  for select
  using (public.admin_effix_current_role() is not null);

drop policy if exists "settings_write_super_admin" on public.admin_effix_settings;
create policy "settings_write_super_admin" on public.admin_effix_settings
  for all
  using (public.admin_effix_is_super_admin())
  with check (public.admin_effix_is_super_admin());


-- ----------------------------------------------------------------------------
-- 7. RPC functions — para operaciones sensibles auditadas
-- ----------------------------------------------------------------------------

create or replace function public.admin_effix_promote_profile(
  target_id uuid,
  new_role admin_effix_role
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_effix_is_super_admin() then
    raise exception 'Solo super_admin puede cambiar roles';
  end if;

  update public.admin_effix_profiles
     set role = new_role,
         updated_at = now()
   where id = target_id;

  insert into public.admin_effix_audit_log (user_id, user_email, action, entity_type, entity_id, changes)
  values (
    auth.uid(),
    (select email from public.admin_effix_profiles where id = auth.uid()),
    'promote',
    'profile',
    target_id,
    jsonb_build_object('new_role', new_role)
  );
end $$;


create or replace function public.admin_effix_register_sign_in()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.admin_effix_profiles
     set last_sign_in = now()
   where id = auth.uid();

  insert into public.admin_effix_audit_log (user_id, user_email, action)
  values (
    auth.uid(),
    (select email from public.admin_effix_profiles where id = auth.uid()),
    'sign_in'
  );
end $$;


-- ----------------------------------------------------------------------------
-- 8. Seed — primer super_admin
-- ----------------------------------------------------------------------------
-- IMPORTANTE: Reemplazar el email por el del primer super_admin real.
-- Este user debe EXISTIR previamente en auth.users (registrarse con el mismo email
-- en la app de UGC Colombia o vía panel Supabase Auth).
--
-- Ejemplo (comentado por seguridad — copiar, reemplazar email y ejecutar aparte):
--
-- insert into public.admin_effix_profiles (id, email, full_name, role, is_active)
-- select id, email, coalesce(raw_user_meta_data->>'full_name', email), 'super_admin', true
-- from auth.users
-- where email = 'founder@kreoon.com'
-- on conflict (id) do update set
--   role = 'super_admin',
--   is_active = true,
--   updated_at = now();
--
-- ----------------------------------------------------------------------------

-- Configuración inicial — valores por defecto
insert into public.admin_effix_settings (key, value, category, description)
values
  ('default_timezone', '"America/Costa_Rica"'::jsonb, 'general', 'Timezone por defecto de la app'),
  ('default_currency', '"USD"'::jsonb, 'general', 'Moneda de referencia interna'),
  ('lead_auto_assign', 'false'::jsonb, 'general', 'Asignación automática de SDR a leads nuevos'),
  ('n8n_pauta_webhook', '"https://n8n.grupoeffi.com/webhook/pauta-metricas"'::jsonb, 'integrations', 'Webhook n8n de métricas de pauta'),
  ('n8n_comercial_webhook', '"https://n8n.grupoeffi.com/webhook/comercial-metricas"'::jsonb, 'integrations', 'Webhook n8n de métricas comerciales'),
  ('supported_marcas', '["feria-effix","efficommerce","effi-system","effi-living","effiwoman","efficaex","sara-montoya","juan-carmona","oswaldo-alarcon","grupo-effi-eventos"]'::jsonb, 'general', 'Marcas activas del Grupo Effi'),
  ('supported_paises', '["CR","CO","EC","RD","GT"]'::jsonb, 'general', 'Países con operación ads')
on conflict (key) do nothing;


-- ----------------------------------------------------------------------------
-- FIN migration
-- ----------------------------------------------------------------------------
