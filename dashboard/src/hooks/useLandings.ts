import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsLanding } from '@/types/cms'

export function useLandings(strategyId: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-landings', strategyId],
    enabled: Boolean(strategyId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_effix_landings')
        .select('*')
        .eq('strategy_id', strategyId!)
        .order('updated_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as CmsLanding[]
    },
    staleTime: 1000 * 30,
  })
}

export function useLandingsByBrand(brandSlug: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-landings-by-brand', brandSlug],
    enabled: Boolean(brandSlug),
    queryFn: async () => {
      // join implícito via strategies
      const { data, error } = await supabase
        .from('admin_effix_landings')
        .select('*, admin_effix_strategies!inner(brand_slug)')
        .eq('admin_effix_strategies.brand_slug', brandSlug!)
        .order('updated_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as CmsLanding[]
    },
  })
}

export function useCreateLanding() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: Partial<CmsLanding> & Pick<CmsLanding, 'strategy_id'>) => {
      const { data, error } = await supabase.from('admin_effix_landings').insert(input).select('*').single()
      if (error) throw error
      return data as CmsLanding
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-landings', d.strategy_id] }),
  })
}

export function useUpdateLanding() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsLanding> }) => {
      const { data, error } = await supabase
        .from('admin_effix_landings')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsLanding
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-landings', d.strategy_id] }),
  })
}
