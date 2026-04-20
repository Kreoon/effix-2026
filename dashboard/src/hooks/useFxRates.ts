import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { FxRate } from '@/types/cms'

export function useFxRates(currency?: string | null) {
  return useQuery({
    queryKey: ['cms-fx', currency ?? 'all'],
    queryFn: async () => {
      let q = supabase.from('admin_effix_fx_rates').select('*').order('date', { ascending: false }).limit(365)
      if (currency) q = q.eq('currency', currency)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as FxRate[]
    },
    staleTime: 1000 * 60 * 60,
  })
}

export function useUpsertFxRate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: Pick<FxRate, 'date' | 'currency' | 'rate_usd'> & Partial<Pick<FxRate, 'source'>>) => {
      const { data, error } = await supabase
        .from('admin_effix_fx_rates')
        .upsert({ ...input, source: input.source ?? 'manual' })
        .select('*')
        .single()
      if (error) throw error
      return data as FxRate
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-fx'] }),
  })
}
