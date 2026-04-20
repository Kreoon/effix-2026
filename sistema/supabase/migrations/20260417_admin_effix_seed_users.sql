-- ============================================================================
-- Migration: 20260417 — Seed users desde auth.users
-- Project:   Supabase domxgsrajwyuaffiqbtr
-- Descripción:
--   Importa todos los usuarios existentes en auth.users (los que ya tienen
--   acceso a UGC Colombia y otros proyectos del ecosistema Alexander Cast)
--   a la tabla admin_effix_profiles con role 'admin' por defecto.
--
--   Luego promueve a 'super_admin' los emails designados abajo.
--
-- Aplicar DESPUÉS de `20260417_admin_effix_schema.sql`.
-- Es idempotente: se puede re-ejecutar sin duplicar ni revertir promociones.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Importar TODOS los usuarios existentes como 'admin'
-- ----------------------------------------------------------------------------
-- Los que ya tienen acceso a UGC Colombia / proyectos Alexander Cast quedan
-- automáticamente con acceso al admin. Se preservan los perfiles ya creados
-- (on conflict do nothing).

insert into public.admin_effix_profiles (id, email, full_name, role, is_active)
select
  u.id,
  u.email,
  coalesce(
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    split_part(u.email, '@', 1)
  ),
  'admin'::admin_effix_role,
  true
from auth.users u
where u.email is not null
on conflict (id) do nothing;


-- ----------------------------------------------------------------------------
-- 2. Promover a super_admin los emails del equipo core
-- ----------------------------------------------------------------------------
-- Lista de emails que deben tener permisos de super_admin (pueden gestionar
-- usuarios, cambiar roles y editar configuración).
--
-- Editá la lista según necesidad. Los emails que no existan en auth.users
-- se ignoran silenciosamente.

update public.admin_effix_profiles
   set role = 'super_admin',
       updated_at = now()
 where email in (
   'founder@kreoon.com',
   'jacsolucionesgraficas@gmail.com',
   'alexander7818@gmail.com',
   'dev@kreoon.com'
 );


-- ----------------------------------------------------------------------------
-- 3. Reporte post-seed (informativo — la migración puede leer esto en logs)
-- ----------------------------------------------------------------------------

do $$
declare
  total_users      integer;
  total_profiles   integer;
  super_admins     integer;
  admins           integer;
  viewers          integer;
begin
  select count(*) into total_users from auth.users where email is not null;
  select count(*) into total_profiles from public.admin_effix_profiles;
  select count(*) into super_admins from public.admin_effix_profiles where role = 'super_admin';
  select count(*) into admins from public.admin_effix_profiles where role = 'admin';
  select count(*) into viewers from public.admin_effix_profiles where role = 'viewer';

  raise notice 'Admin Effix — seed aplicado';
  raise notice '  auth.users con email:          %', total_users;
  raise notice '  admin_effix_profiles total:    %', total_profiles;
  raise notice '  super_admin:                   %', super_admins;
  raise notice '  admin:                         %', admins;
  raise notice '  viewer:                        %', viewers;

  if super_admins = 0 then
    raise warning 'No hay ningún super_admin. Editá la lista de emails en este SQL y re-ejecutalo.';
  end if;
end $$;
