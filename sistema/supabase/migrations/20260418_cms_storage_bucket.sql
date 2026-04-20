-- ============================================================================
-- Migration: 20260418 — CMS Storage bucket
-- Crea el bucket `cms-assets` + políticas RLS.
-- Aplicar después de 20260418_cms_foundations.sql.
-- ============================================================================

-- Crear bucket privado (no público) — los assets se sirven con URL firmadas
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-assets',
  'cms-assets',
  false,
  26214400,   -- 25 MB en bytes (validamos también en cliente)
  array[
    'image/png','image/jpeg','image/webp','image/gif','image/svg+xml',
    'application/pdf',
    'text/markdown','text/plain','text/csv',
    'application/json',
    'video/mp4','video/quicktime',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;


-- Políticas RLS del bucket
-- Lectura: cualquier perfil activo
drop policy if exists "cms_assets_select" on storage.objects;
create policy "cms_assets_select" on storage.objects
  for select
  using (
    bucket_id = 'cms-assets'
    and public.admin_effix_current_role() is not null
  );

-- Insert: admins+ solamente
drop policy if exists "cms_assets_insert" on storage.objects;
create policy "cms_assets_insert" on storage.objects
  for insert
  with check (
    bucket_id = 'cms-assets'
    and public.admin_effix_is_admin()
  );

-- Update: admins+ (reemplazo de archivo, renombrar)
drop policy if exists "cms_assets_update" on storage.objects;
create policy "cms_assets_update" on storage.objects
  for update
  using (
    bucket_id = 'cms-assets'
    and public.admin_effix_is_admin()
  );

-- Delete: solo super_admin (mantener integridad del audit trail)
drop policy if exists "cms_assets_delete" on storage.objects;
create policy "cms_assets_delete" on storage.objects
  for delete
  using (
    bucket_id = 'cms-assets'
    and public.admin_effix_is_super_admin()
  );
