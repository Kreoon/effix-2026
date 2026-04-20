import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { MAX_UPLOAD_BYTES, storagePath } from '@/lib/cms'
import type { CmsAsset } from '@/types/cms'

export function useAssets(requirementId: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-assets', requirementId],
    enabled: Boolean(requirementId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_effix_assets')
        .select('*')
        .eq('requirement_id', requirementId!)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as CmsAsset[]
    },
  })
}

export function useUploadAsset() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      requirementId: string
      file: File
      kind: CmsAsset['kind']
      platform?: string | null
      format?: string | null
      variant_label?: string | null
    }) => {
      if (input.file.size > MAX_UPLOAD_BYTES) {
        throw new Error(
          `Archivo muy grande (${(input.file.size / 1024 / 1024).toFixed(1)} MB). Máximo 25 MB — subilo a Drive/Vimeo/Bunny y usá "URL externa".`,
        )
      }

      const path = storagePath('requirement', { requirementId: input.requirementId }, input.file.name)
      const { error: uploadError } = await supabase.storage
        .from('cms-assets')
        .upload(path, input.file, { cacheControl: '3600', upsert: false })
      if (uploadError) throw uploadError

      const { data, error } = await supabase
        .from('admin_effix_assets')
        .insert({
          requirement_id: input.requirementId,
          kind: input.kind,
          platform: input.platform ?? null,
          format: input.format ?? null,
          variant_label: input.variant_label ?? null,
          storage_path: path,
          file_size_bytes: input.file.size,
          mime_type: input.file.type,
        })
        .select('*')
        .single()
      if (error) throw error
      return data as CmsAsset
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-assets', d.requirement_id] }),
  })
}

export function useCreateExternalAsset() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: Partial<CmsAsset> & Pick<CmsAsset, 'requirement_id' | 'kind' | 'external_url'>) => {
      const { data, error } = await supabase.from('admin_effix_assets').insert(input).select('*').single()
      if (error) throw error
      return data as CmsAsset
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-assets', d.requirement_id] }),
  })
}

export function useCreateCopyAsset() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      input: Partial<CmsAsset> & Pick<CmsAsset, 'requirement_id' | 'copy_text_md' | 'platform'>,
    ) => {
      const { data, error } = await supabase
        .from('admin_effix_assets')
        .insert({ ...input, kind: 'copy' })
        .select('*')
        .single()
      if (error) throw error
      return data as CmsAsset
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-assets', d.requirement_id] }),
  })
}

export function useDeleteAsset() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (asset: Pick<CmsAsset, 'id' | 'requirement_id' | 'storage_path'>) => {
      if (asset.storage_path) {
        await supabase.storage.from('cms-assets').remove([asset.storage_path])
      }
      const { error } = await supabase.from('admin_effix_assets').delete().eq('id', asset.id)
      if (error) throw error
      return asset
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-assets', d.requirement_id] }),
  })
}

/** Genera URL firmada (válida 1h) para visualizar un asset almacenado */
export async function getSignedUrl(storagePathOrAsset: string | Pick<CmsAsset, 'storage_path'>): Promise<string | null> {
  const path = typeof storagePathOrAsset === 'string' ? storagePathOrAsset : storagePathOrAsset.storage_path
  if (!path) return null
  const { data, error } = await supabase.storage.from('cms-assets').createSignedUrl(path, 3600)
  if (error) return null
  return data.signedUrl
}
