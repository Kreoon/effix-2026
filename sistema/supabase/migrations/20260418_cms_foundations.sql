-- ============================================================================
-- Migration: 20260418 — CMS Foundations (pivote Admin → CMS de producción de pauta)
-- Project:   Supabase domxgsrajwyuaffiqbtr
-- Descripción:
--   Crea la infraestructura para el CMS operativo de pauta del Grupo Effi.
--   10 tablas nuevas + ampliaciones a 3 existentes. No rompe el admin actual.
--
-- Requiere aplicar previamente: 20260417_admin_effix_schema.sql
-- Es idempotente: re-ejecutable sin destruir datos.
--
-- Contenido:
--   1. Enums     — area, requirement_status, etc.
--   2. Tablas    — brands, fx_rates, strategies, landings, requirements,
--                  assets, approvals, budgets, spend_entries, csv_imports, reports
--   3. Ampliaciones — profiles.areas, campaigns.strategy_id, leads.strategy_id
--   4. Sequence  — admin_effix_approval_seq
--   5. Índices
--   6. Triggers  — updated_at + amount_usd persistido
--   7. RPCs      — create_approval, compute_spend_usd
--   8. RLS       — policies por tabla
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Enums nuevos
-- ----------------------------------------------------------------------------

do $$ begin
  create type admin_effix_area as enum ('design', 'audiovisual', 'trafficker', 'dev_web', 'estratega', 'finanzas');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_requirement_status as enum (
    'draft',
    'in_review',
    'changes_requested',
    'approved',
    'in_production',
    'qa',
    'published',
    'archived',
    'blocked',
    'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_priority as enum ('low', 'normal', 'high', 'urgent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_strategy_status as enum ('draft', 'active', 'paused', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_asset_kind as enum ('video', 'image', 'copy', 'doc', 'link', 'design_file');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_approval_status as enum ('pending', 'approved', 'changes_requested', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_landing_status as enum ('mockup', 'dev', 'qa', 'live', 'paused', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_landing_tipo as enum ('lead_capture', 'ventas', 'waitlist', 'comunidad', 'evento');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_report_type as enum ('weekly', 'monthly', 'ad_hoc');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_brief_format as enum ('markdown', 'rich');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_spend_source as enum ('manual', 'csv_import', 'api_meta', 'api_google', 'api_tiktok');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_effix_csv_import_status as enum ('pending', 'validating', 'committed', 'failed', 'rolled_back');
exception when duplicate_object then null; end $$;


-- ----------------------------------------------------------------------------
-- 2. Sequence para AP-NNN
-- ----------------------------------------------------------------------------

create sequence if not exists admin_effix_approval_seq start with 1 increment by 1;


-- ----------------------------------------------------------------------------
-- 3. Tablas nuevas
-- ----------------------------------------------------------------------------

-- admin_effix_brands — catálogo de marcas del grupo (reemplaza marca_slug libre)
create table if not exists public.admin_effix_brands (
  slug           text primary key,
  name           text not null,
  countries      text[] not null default '{}',
  logo_url       text,
  color_primary  text,
  active         boolean not null default true,
  display_order  integer not null default 100,
  metadata       jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.admin_effix_brands is
  'Catálogo de marcas del Grupo Effi. FK desde strategies, leads, campaigns.';


-- admin_effix_fx_rates — tipos de cambio históricos (fuente para amount_usd)
create table if not exists public.admin_effix_fx_rates (
  date        date not null,
  currency    text not null,
  rate_usd    numeric(14,6) not null,    -- 1 unidad local = rate_usd USD
  source      text not null default 'manual',
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  primary key (date, currency)
);

comment on table public.admin_effix_fx_rates is
  'TRMs históricas. rate_usd: 1 unidad local * rate_usd = USD. Ej CRC: 0.00192.';


-- admin_effix_strategies — contenedor central, todo cuelga de aquí
create table if not exists public.admin_effix_strategies (
  id                 uuid primary key default gen_random_uuid(),
  brand_slug         text not null references public.admin_effix_brands(slug) on delete restrict,
  pais               text not null,
  nombre             text not null,
  periodo_start      date,
  periodo_end        date,
  objetivo_md        text,
  estado             admin_effix_strategy_status not null default 'draft',
  owner_estratega    uuid references public.admin_effix_profiles(id) on delete set null,
  budget_total_usd   numeric(14,2) default 0,
  kpi_targets        jsonb not null default '{}'::jsonb,
  metadata           jsonb not null default '{}'::jsonb,
  created_by         uuid references public.admin_effix_profiles(id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.admin_effix_strategies is
  'Estrategia de pauta: contenedor por marca+país+período. Todo (requirements, budget, spend, reports) cuelga de aquí.';


-- admin_effix_landings
create table if not exists public.admin_effix_landings (
  id               uuid primary key default gen_random_uuid(),
  strategy_id      uuid not null references public.admin_effix_strategies(id) on delete cascade,
  slug             text,                  -- ej 'circulo-effix-ec'
  url_vercel       text,
  url_production   text,
  screenshot_url   text,
  funnel           text,
  tipo             admin_effix_landing_tipo not null default 'lead_capture',
  status           admin_effix_landing_status not null default 'mockup',
  notes_md         text,
  kpis_snapshot    jsonb,
  metadata         jsonb not null default '{}'::jsonb,
  created_by       uuid references public.admin_effix_profiles(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.admin_effix_landings is
  'Landings en producción/mockup. URL Vercel + screenshot + status.';


-- admin_effix_requirements — tickets a áreas (el corazón del workflow)
create table if not exists public.admin_effix_requirements (
  id                  uuid primary key default gen_random_uuid(),
  strategy_id         uuid not null references public.admin_effix_strategies(id) on delete cascade,
  area                admin_effix_area not null,
  title               text not null,
  brief_md            text,
  brief_rich          jsonb,                   -- JSON TipTap si brief_format='rich'
  brief_format        admin_effix_brief_format not null default 'markdown',
  priority            admin_effix_priority not null default 'normal',
  status              admin_effix_requirement_status not null default 'draft',
  assignee_id         uuid references public.admin_effix_profiles(id) on delete set null,
  deadline            date,
  template_used       text,                    -- ref /recursos/plantillas/*.md
  revision_count      integer not null default 0,
  review_comments_md  text,
  metadata            jsonb not null default '{}'::jsonb,
  created_by          uuid references public.admin_effix_profiles(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.admin_effix_requirements is
  'Requerimiento a un área: diseño, audiovisual, trafficker, dev_web, estratega. Core del CMS.';


-- admin_effix_assets — unifica creatives + copies + archivos
create table if not exists public.admin_effix_assets (
  id                uuid primary key default gen_random_uuid(),
  requirement_id    uuid not null references public.admin_effix_requirements(id) on delete cascade,
  kind              admin_effix_asset_kind not null,
  platform          text,                    -- 'meta' | 'google' | 'tiktok' | null
  format            text,                    -- '9:16' | '1:1' | 'RSA' | 'VSL_90s' | ...
  duration_s        integer,
  copy_text_md      text,                    -- para kind='copy'
  storage_path      text,                    -- si se subió a Supabase Storage cms-assets
  external_url      text,                    -- si vive afuera (Drive, Vimeo, Bunny)
  file_size_bytes   bigint,
  mime_type         text,
  thumbnail_url     text,
  variant_label     text,                    -- 'v1', 'A', 'B_bold'
  approved          boolean not null default false,
  metadata          jsonb not null default '{}'::jsonb,
  created_by        uuid references public.admin_effix_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  -- Asegurar al menos una ubicación
  check (storage_path is not null or external_url is not null or copy_text_md is not null)
);

comment on table public.admin_effix_assets is
  'Entregable de un requirement: video, imagen, copy, doc, link. Storage o URL externa.';


-- admin_effix_approvals — tabla de primera clase reutilizable
create table if not exists public.admin_effix_approvals (
  id                 uuid primary key default gen_random_uuid(),
  ap_code            text unique not null
                        default ('AP-' || lpad(nextval('admin_effix_approval_seq')::text, 4, '0')),
  entity_type        text not null,             -- 'requirement' | 'asset' | 'budget' | 'landing' | 'strategy'
  entity_id          uuid not null,
  requested_by       uuid references public.admin_effix_profiles(id) on delete set null,
  approver_id        uuid references public.admin_effix_profiles(id) on delete set null,
  status             admin_effix_approval_status not null default 'pending',
  request_md         text,                       -- qué se pide aprobar
  decision_md        text,                       -- qué decidió el approver
  approved_snapshot  jsonb,                      -- diff del contenido al momento de aprobar
  requested_at       timestamptz not null default now(),
  decided_at         timestamptz,
  metadata           jsonb not null default '{}'::jsonb
);

comment on table public.admin_effix_approvals is
  'Workflow AP-NNN. Reutilizable para requirements, assets, budgets, landings, strategies.';


-- admin_effix_budgets — presupuesto por estrategia+plataforma+período
create table if not exists public.admin_effix_budgets (
  id             uuid primary key default gen_random_uuid(),
  strategy_id    uuid not null references public.admin_effix_strategies(id) on delete cascade,
  platform       text not null,             -- 'meta' | 'google' | 'tiktok' | 'whatsapp' | 'other'
  period_start   date not null,
  period_end     date not null,
  amount_usd     numeric(14,2) not null default 0,
  amount_local   numeric(14,2),
  currency       text default 'USD',
  notes_md       text,
  metadata       jsonb not null default '{}'::jsonb,
  created_by     uuid references public.admin_effix_profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  check (period_end >= period_start)
);

comment on table public.admin_effix_budgets is
  'Presupuesto planeado por estrategia, plataforma y período. Base del pace semanal.';


-- admin_effix_csv_imports — registro de cargas CSV al libro diario
create table if not exists public.admin_effix_csv_imports (
  id             uuid primary key default gen_random_uuid(),
  strategy_id    uuid references public.admin_effix_strategies(id) on delete set null,
  file_name      text,
  status         admin_effix_csv_import_status not null default 'pending',
  rows_total     integer,
  rows_ok        integer,
  rows_error     integer,
  error_report   jsonb,
  imported_by    uuid references public.admin_effix_profiles(id) on delete set null,
  imported_at    timestamptz not null default now(),
  committed_at   timestamptz,
  rolled_back_at timestamptz
);

comment on table public.admin_effix_csv_imports is
  'Auditoría de imports CSV al libro diario. Permite rollback transaccional.';


-- admin_effix_spend_entries — libro diario de inversión
create table if not exists public.admin_effix_spend_entries (
  id             uuid primary key default gen_random_uuid(),
  fecha          date not null,
  strategy_id    uuid not null references public.admin_effix_strategies(id) on delete restrict,
  campaign_id    uuid references public.admin_effix_campaigns(id) on delete set null,
  platform       text not null,
  amount_local   numeric(14,2) not null,
  currency       text not null,
  fx_rate        numeric(14,6) not null,
  fx_date        date not null,
  amount_usd     numeric(14,2) not null,    -- persistido, trigger valida
  source         admin_effix_spend_source not null default 'manual',
  csv_import_id  uuid references public.admin_effix_csv_imports(id) on delete set null,
  reconciled     boolean not null default false,
  reconciled_by  uuid references public.admin_effix_profiles(id) on delete set null,
  reconciled_at  timestamptz,
  notes          text,
  metadata       jsonb not null default '{}'::jsonb,
  created_by     uuid references public.admin_effix_profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.admin_effix_spend_entries is
  'Libro diario de inversión: 1 row = 1 gasto en 1 día en 1 plataforma. Base de reportes financieros.';


-- admin_effix_reports — reportes semanales/mensuales con snapshot KPIs
create table if not exists public.admin_effix_reports (
  id                uuid primary key default gen_random_uuid(),
  strategy_id       uuid not null references public.admin_effix_strategies(id) on delete cascade,
  type              admin_effix_report_type not null,
  period_start      date not null,
  period_end        date not null,
  kpis_snapshot     jsonb not null default '{}'::jsonb,
  body_md           text,
  exported_pdf_url  text,
  exported_xlsx_url text,
  metadata          jsonb not null default '{}'::jsonb,
  created_by        uuid references public.admin_effix_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.admin_effix_reports is
  'Reporte humano editable con snapshot de KPIs al momento de crearlo.';


-- ----------------------------------------------------------------------------
-- 4. Ampliaciones a tablas existentes
-- ----------------------------------------------------------------------------

alter table public.admin_effix_profiles
  add column if not exists areas text[] not null default '{}';

comment on column public.admin_effix_profiles.areas is
  'En qué áreas funcionales trabaja el user (design, audiovisual, trafficker, dev_web, estratega, finanzas). Filtra visibilidad.';

alter table public.admin_effix_campaigns
  add column if not exists strategy_id uuid references public.admin_effix_strategies(id) on delete set null;

alter table public.admin_effix_leads
  add column if not exists strategy_id uuid references public.admin_effix_strategies(id) on delete set null;


-- ----------------------------------------------------------------------------
-- 5. Índices
-- ----------------------------------------------------------------------------

create index if not exists idx_strategies_brand_pais
  on public.admin_effix_strategies (brand_slug, pais);
create index if not exists idx_strategies_estado
  on public.admin_effix_strategies (estado);
create index if not exists idx_strategies_owner
  on public.admin_effix_strategies (owner_estratega) where owner_estratega is not null;

create index if not exists idx_landings_strategy
  on public.admin_effix_landings (strategy_id);
create index if not exists idx_landings_status
  on public.admin_effix_landings (status);

create index if not exists idx_requirements_strategy
  on public.admin_effix_requirements (strategy_id);
create index if not exists idx_requirements_area_status
  on public.admin_effix_requirements (area, status);
create index if not exists idx_requirements_assignee
  on public.admin_effix_requirements (assignee_id) where assignee_id is not null;
create index if not exists idx_requirements_deadline
  on public.admin_effix_requirements (deadline) where deadline is not null;

create index if not exists idx_assets_requirement
  on public.admin_effix_assets (requirement_id);
create index if not exists idx_assets_kind_platform
  on public.admin_effix_assets (kind, platform);

create index if not exists idx_approvals_entity
  on public.admin_effix_approvals (entity_type, entity_id);
create index if not exists idx_approvals_approver_status
  on public.admin_effix_approvals (approver_id, status);
create index if not exists idx_approvals_requested_at
  on public.admin_effix_approvals (requested_at desc);

create index if not exists idx_budgets_strategy_platform
  on public.admin_effix_budgets (strategy_id, platform);
create index if not exists idx_budgets_period
  on public.admin_effix_budgets (period_start, period_end);

create index if not exists idx_spend_fecha
  on public.admin_effix_spend_entries (fecha desc);
create index if not exists idx_spend_strategy_platform
  on public.admin_effix_spend_entries (strategy_id, platform);
create index if not exists idx_spend_campaign
  on public.admin_effix_spend_entries (campaign_id) where campaign_id is not null;
create index if not exists idx_spend_reconciled
  on public.admin_effix_spend_entries (reconciled);

create index if not exists idx_reports_strategy_type
  on public.admin_effix_reports (strategy_id, type);
create index if not exists idx_reports_period
  on public.admin_effix_reports (period_start, period_end);

create index if not exists idx_fx_rates_date_currency
  on public.admin_effix_fx_rates (date desc, currency);


-- ----------------------------------------------------------------------------
-- 6. Triggers
-- ----------------------------------------------------------------------------

-- Triggers updated_at
do $$ begin
  drop trigger if exists trg_brands_updated_at on public.admin_effix_brands;
  drop trigger if exists trg_strategies_updated_at on public.admin_effix_strategies;
  drop trigger if exists trg_landings_updated_at on public.admin_effix_landings;
  drop trigger if exists trg_requirements_updated_at on public.admin_effix_requirements;
  drop trigger if exists trg_assets_updated_at on public.admin_effix_assets;
  drop trigger if exists trg_budgets_updated_at on public.admin_effix_budgets;
  drop trigger if exists trg_spend_updated_at on public.admin_effix_spend_entries;
  drop trigger if exists trg_reports_updated_at on public.admin_effix_reports;
end $$;

create trigger trg_brands_updated_at       before update on public.admin_effix_brands        for each row execute function public.admin_effix_set_updated_at();
create trigger trg_strategies_updated_at   before update on public.admin_effix_strategies    for each row execute function public.admin_effix_set_updated_at();
create trigger trg_landings_updated_at     before update on public.admin_effix_landings      for each row execute function public.admin_effix_set_updated_at();
create trigger trg_requirements_updated_at before update on public.admin_effix_requirements  for each row execute function public.admin_effix_set_updated_at();
create trigger trg_assets_updated_at       before update on public.admin_effix_assets        for each row execute function public.admin_effix_set_updated_at();
create trigger trg_budgets_updated_at      before update on public.admin_effix_budgets       for each row execute function public.admin_effix_set_updated_at();
create trigger trg_spend_updated_at        before update on public.admin_effix_spend_entries for each row execute function public.admin_effix_set_updated_at();
create trigger trg_reports_updated_at      before update on public.admin_effix_reports       for each row execute function public.admin_effix_set_updated_at();


-- Trigger: validar amount_usd = round(amount_local * fx_rate, 2) en spend_entries
create or replace function public.admin_effix_validate_spend_usd()
returns trigger language plpgsql as $$
declare
  expected numeric(14,2);
begin
  expected := round(new.amount_local * new.fx_rate, 2);
  if abs(new.amount_usd - expected) > 0.05 then
    raise exception 'amount_usd (%) no coincide con amount_local * fx_rate (%). Diferencia permitida: ±0.05.',
      new.amount_usd, expected;
  end if;
  return new;
end $$;

drop trigger if exists trg_spend_validate_usd on public.admin_effix_spend_entries;
create trigger trg_spend_validate_usd
  before insert or update on public.admin_effix_spend_entries
  for each row execute function public.admin_effix_validate_spend_usd();


-- Trigger: bloquear edición de spend_entries reconciliados (solo super_admin)
create or replace function public.admin_effix_guard_reconciled()
returns trigger language plpgsql as $$
begin
  if old.reconciled = true
     and not public.admin_effix_is_super_admin()
     and (
       new.amount_local is distinct from old.amount_local
       or new.amount_usd is distinct from old.amount_usd
       or new.fx_rate is distinct from old.fx_rate
       or new.fecha is distinct from old.fecha
     )
  then
    raise exception 'Este spend entry está reconciliado. Solo super_admin puede editar campos financieros.';
  end if;
  return new;
end $$;

drop trigger if exists trg_spend_guard_reconciled on public.admin_effix_spend_entries;
create trigger trg_spend_guard_reconciled
  before update on public.admin_effix_spend_entries
  for each row execute function public.admin_effix_guard_reconciled();


-- Trigger: bloquear spend en strategies cerradas
create or replace function public.admin_effix_guard_closed_strategy()
returns trigger language plpgsql as $$
declare
  s_estado admin_effix_strategy_status;
begin
  select estado into s_estado
  from public.admin_effix_strategies
  where id = new.strategy_id;

  if s_estado = 'closed' and not public.admin_effix_is_super_admin() then
    raise exception 'La estrategia está cerrada. Solo super_admin puede agregar spend entries retroactivos.';
  end if;
  return new;
end $$;

drop trigger if exists trg_spend_guard_closed on public.admin_effix_spend_entries;
create trigger trg_spend_guard_closed
  before insert on public.admin_effix_spend_entries
  for each row execute function public.admin_effix_guard_closed_strategy();


-- ----------------------------------------------------------------------------
-- 7. RPCs (funciones callable desde el cliente)
-- ----------------------------------------------------------------------------

-- Resolver fx_rate para un par (fecha, currency). Retorna la tasa o falla.
create or replace function public.admin_effix_resolve_fx(p_date date, p_currency text)
returns numeric
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_rate numeric(14,6);
begin
  if p_currency = 'USD' then
    return 1.0;
  end if;

  -- Intento 1: match exacto fecha+currency
  select rate_usd into v_rate
  from public.admin_effix_fx_rates
  where date = p_date and currency = p_currency;

  if v_rate is not null then return v_rate; end if;

  -- Intento 2: la TRM más reciente antes o igual a esa fecha
  select rate_usd into v_rate
  from public.admin_effix_fx_rates
  where currency = p_currency and date <= p_date
  order by date desc
  limit 1;

  if v_rate is not null then return v_rate; end if;

  raise exception 'No hay TRM disponible para % en o antes de %. Agregá una fila en admin_effix_fx_rates.', p_currency, p_date;
end $$;


-- Calcular amount_usd a partir de (fecha, currency, amount_local)
create or replace function public.admin_effix_compute_spend_usd(
  p_fecha date,
  p_currency text,
  p_amount_local numeric
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_rate numeric(14,6);
  v_rate_date date;
begin
  if p_currency = 'USD' then
    return jsonb_build_object(
      'fx_rate', 1.0,
      'fx_date', p_fecha,
      'amount_usd', round(p_amount_local, 2)
    );
  end if;

  -- Buscar fecha efectiva de la rate
  select date, rate_usd
    into v_rate_date, v_rate
  from public.admin_effix_fx_rates
  where currency = p_currency and date <= p_fecha
  order by date desc
  limit 1;

  if v_rate is null then
    raise exception 'No hay TRM para % antes o igual a %', p_currency, p_fecha;
  end if;

  return jsonb_build_object(
    'fx_rate', v_rate,
    'fx_date', v_rate_date,
    'amount_usd', round(p_amount_local * v_rate, 2)
  );
end $$;


-- Crear approval con AP-NNN atómico
create or replace function public.admin_effix_create_approval(
  p_entity_type text,
  p_entity_id uuid,
  p_approver_id uuid,
  p_request_md text default null,
  p_approved_snapshot jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_ap_code text;
begin
  if not public.admin_effix_is_admin() then
    raise exception 'Solo admins pueden solicitar aprobación';
  end if;

  insert into public.admin_effix_approvals (
    entity_type, entity_id, requested_by, approver_id,
    request_md, approved_snapshot
  ) values (
    p_entity_type, p_entity_id, auth.uid(), p_approver_id,
    p_request_md, p_approved_snapshot
  )
  returning id, ap_code into v_id, v_ap_code;

  insert into public.admin_effix_audit_log (user_id, user_email, action, entity_type, entity_id, changes)
  values (
    auth.uid(),
    (select email from public.admin_effix_profiles where id = auth.uid()),
    'approval_requested',
    p_entity_type,
    p_entity_id,
    jsonb_build_object('ap_code', v_ap_code, 'approver_id', p_approver_id)
  );

  return jsonb_build_object('id', v_id, 'ap_code', v_ap_code);
end $$;


-- Decidir una aprobación
create or replace function public.admin_effix_decide_approval(
  p_approval_id uuid,
  p_status admin_effix_approval_status,
  p_decision_md text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_approver uuid;
begin
  select approver_id into v_approver
  from public.admin_effix_approvals where id = p_approval_id;

  if v_approver is null then
    raise exception 'Approval no encontrado';
  end if;

  if v_approver != auth.uid() and not public.admin_effix_is_super_admin() then
    raise exception 'Solo el approver asignado o un super_admin puede decidir';
  end if;

  update public.admin_effix_approvals
  set status = p_status,
      decision_md = p_decision_md,
      decided_at = now()
  where id = p_approval_id;

  insert into public.admin_effix_audit_log (user_id, user_email, action, entity_type, entity_id, changes)
  select
    auth.uid(),
    (select email from public.admin_effix_profiles where id = auth.uid()),
    'approval_' || p_status,
    entity_type,
    entity_id,
    jsonb_build_object('approval_id', p_approval_id, 'status', p_status)
  from public.admin_effix_approvals where id = p_approval_id;
end $$;


-- Cerrar mes: marca spend_entries de un período como reconciled
create or replace function public.admin_effix_reconcile_month(
  p_strategy_id uuid,
  p_year integer,
  p_month integer
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_start date;
  v_end date;
begin
  if not public.admin_effix_is_admin() then
    raise exception 'Solo admins pueden reconciliar meses';
  end if;

  v_start := make_date(p_year, p_month, 1);
  v_end := (v_start + interval '1 month' - interval '1 day')::date;

  update public.admin_effix_spend_entries
  set reconciled = true,
      reconciled_by = auth.uid(),
      reconciled_at = now()
  where strategy_id = p_strategy_id
    and fecha between v_start and v_end
    and reconciled = false;

  get diagnostics v_count = row_count;

  insert into public.admin_effix_audit_log (user_id, user_email, action, entity_type, entity_id, changes)
  values (
    auth.uid(),
    (select email from public.admin_effix_profiles where id = auth.uid()),
    'reconcile_month',
    'strategy',
    p_strategy_id,
    jsonb_build_object('year', p_year, 'month', p_month, 'entries_reconciled', v_count)
  );

  return v_count;
end $$;


-- ----------------------------------------------------------------------------
-- 8. Row Level Security
-- ----------------------------------------------------------------------------

alter table public.admin_effix_brands        enable row level security;
alter table public.admin_effix_fx_rates      enable row level security;
alter table public.admin_effix_strategies    enable row level security;
alter table public.admin_effix_landings      enable row level security;
alter table public.admin_effix_requirements  enable row level security;
alter table public.admin_effix_assets        enable row level security;
alter table public.admin_effix_approvals     enable row level security;
alter table public.admin_effix_budgets       enable row level security;
alter table public.admin_effix_csv_imports   enable row level security;
alter table public.admin_effix_spend_entries enable row level security;
alter table public.admin_effix_reports       enable row level security;


-- brands: todos leen, solo super_admin escribe
drop policy if exists "brands_select_auth" on public.admin_effix_brands;
create policy "brands_select_auth" on public.admin_effix_brands
  for select using (public.admin_effix_current_role() is not null);
drop policy if exists "brands_write_super" on public.admin_effix_brands;
create policy "brands_write_super" on public.admin_effix_brands
  for all using (public.admin_effix_is_super_admin())
  with check (public.admin_effix_is_super_admin());


-- fx_rates: todos leen, admin+super escribe
drop policy if exists "fx_select_auth" on public.admin_effix_fx_rates;
create policy "fx_select_auth" on public.admin_effix_fx_rates
  for select using (public.admin_effix_current_role() is not null);
drop policy if exists "fx_write_admins" on public.admin_effix_fx_rates;
create policy "fx_write_admins" on public.admin_effix_fx_rates
  for all using (public.admin_effix_is_admin())
  with check (public.admin_effix_is_admin());


-- strategies / landings / requirements / assets / budgets / reports → patrón común
-- lectura: cualquier perfil activo; escritura: admins+super
do $$
declare
  t text;
  tables text[] := array[
    'admin_effix_strategies',
    'admin_effix_landings',
    'admin_effix_requirements',
    'admin_effix_assets',
    'admin_effix_budgets',
    'admin_effix_reports'
  ];
begin
  foreach t in array tables loop
    execute format('drop policy if exists "%1$s_select" on public.%1$s', t);
    execute format(
      'create policy "%1$s_select" on public.%1$s
         for select using (public.admin_effix_current_role() is not null)',
      t
    );
    execute format('drop policy if exists "%1$s_write" on public.%1$s', t);
    execute format(
      'create policy "%1$s_write" on public.%1$s
         for all using (public.admin_effix_is_admin())
         with check (public.admin_effix_is_admin())',
      t
    );
  end loop;
end $$;


-- approvals: lectura por cualquier perfil activo (necesaria para ver el historial),
--            insert por admin via RPC, update solo del approver o super_admin
drop policy if exists "approvals_select_auth" on public.admin_effix_approvals;
create policy "approvals_select_auth" on public.admin_effix_approvals
  for select using (public.admin_effix_current_role() is not null);

drop policy if exists "approvals_insert_admin" on public.admin_effix_approvals;
create policy "approvals_insert_admin" on public.admin_effix_approvals
  for insert with check (public.admin_effix_is_admin());

drop policy if exists "approvals_update_approver" on public.admin_effix_approvals;
create policy "approvals_update_approver" on public.admin_effix_approvals
  for update using (approver_id = auth.uid() or public.admin_effix_is_super_admin())
  with check (approver_id = auth.uid() or public.admin_effix_is_super_admin());

drop policy if exists "approvals_delete_super" on public.admin_effix_approvals;
create policy "approvals_delete_super" on public.admin_effix_approvals
  for delete using (public.admin_effix_is_super_admin());


-- spend_entries: lectura por perfil activo, escritura admin, delete super
drop policy if exists "spend_select" on public.admin_effix_spend_entries;
create policy "spend_select" on public.admin_effix_spend_entries
  for select using (public.admin_effix_current_role() is not null);

drop policy if exists "spend_insert" on public.admin_effix_spend_entries;
create policy "spend_insert" on public.admin_effix_spend_entries
  for insert with check (public.admin_effix_is_admin());

drop policy if exists "spend_update" on public.admin_effix_spend_entries;
create policy "spend_update" on public.admin_effix_spend_entries
  for update using (public.admin_effix_is_admin())
  with check (public.admin_effix_is_admin());

drop policy if exists "spend_delete_super" on public.admin_effix_spend_entries;
create policy "spend_delete_super" on public.admin_effix_spend_entries
  for delete using (public.admin_effix_is_super_admin());


-- csv_imports: lectura del que importó + admins; inserción admin; actualización admin
drop policy if exists "csv_select" on public.admin_effix_csv_imports;
create policy "csv_select" on public.admin_effix_csv_imports
  for select using (
    imported_by = auth.uid() or public.admin_effix_is_admin()
  );

drop policy if exists "csv_write" on public.admin_effix_csv_imports;
create policy "csv_write" on public.admin_effix_csv_imports
  for all using (public.admin_effix_is_admin())
  with check (public.admin_effix_is_admin());


-- ----------------------------------------------------------------------------
-- FIN migration
-- ----------------------------------------------------------------------------
