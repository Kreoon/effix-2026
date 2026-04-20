import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsStrategy } from '@/types/cms'

interface StrategiesFilter {
  brandSlug?: string | null
  pais?: string | null
  estado?: CmsStrategy['estado'] | null
}

export function useStrategies(filter: StrategiesFilter = {}) {
  return useQuery({
    queryKey: ['cms-strategies', filter],
    queryFn: async () => {
      let q = supabase.from('admin_effix_strategies').select('*').order('updated_at', { ascending: false })
      if (filter.brandSlug) q = q.eq('brand_slug', filter.brandSlug)
      if (filter.pais) q = q.eq('pais', filter.pais)
      if (filter.estado) q = q.eq('estado', filter.estado)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsStrategy[]
    },
    staleTime: 1000 * 15,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  })
}

export function useStrategy(id: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-strategy', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('admin_effix_strategies').select('*').eq('id', id!).maybeSingle()
      if (error) throw error
      return data as CmsStrategy | null
    },
  })
}

export function useCreateStrategy() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: Partial<CmsStrategy> & Pick<CmsStrategy, 'brand_slug' | 'pais' | 'nombre'>) => {
      const { data, error } = await supabase.from('admin_effix_strategies').insert(input).select('*').single()
      if (error) throw error
      return data as CmsStrategy
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-strategies'] }),
  })
}

export function useUpdateStrategy() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsStrategy> }) => {
      const { data, error } = await supabase
        .from('admin_effix_strategies')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsStrategy
    },
    onSuccess: (d) => {
      qc.invalidateQueries({ queryKey: ['cms-strategies'] })
      qc.invalidateQueries({ queryKey: ['cms-strategy', d.id] })
    },
  })
}
