import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsBrand } from '@/types/cms'

export function useBrands(opts?: { onlyActive?: boolean }) {
  return useQuery({
    queryKey: ['cms-brands', opts?.onlyActive ?? true],
    queryFn: async () => {
      let q = supabase.from('admin_effix_brands').select('*').order('display_order', { ascending: true })
      if (opts?.onlyActive !== false) q = q.eq('active', true)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsBrand[]
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function useBrand(slug: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-brand', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const { data, error } = await supabase.from('admin_effix_brands').select('*').eq('slug', slug!).maybeSingle()
      if (error) throw error
      return data as CmsBrand | null
    },
  })
}
