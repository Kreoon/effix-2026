import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsSpendEntry, ComputeSpendUsdResult } from '@/types/cms'

interface SpendFilter {
  strategyId?: string | null
  platform?: string | null
  dateFrom?: string | null
  dateTo?: string | null
  reconciled?: boolean | null
}

export function useSpendEntries(filter: SpendFilter = {}) {
  return useQuery({
    queryKey: ['cms-spend', filter],
    queryFn: async () => {
      let q = supabase.from('admin_effix_spend_entries').select('*').order('fecha', { ascending: false })
      if (filter.strategyId) q = q.eq('strategy_id', filter.strategyId)
      if (filter.platform) q = q.eq('platform', filter.platform)
      if (filter.dateFrom) q = q.gte('fecha', filter.dateFrom)
      if (filter.dateTo) q = q.lte('fecha', filter.dateTo)
      if (filter.reconciled != null) q = q.eq('reconciled', filter.reconciled)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsSpendEntry[]
    },
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  })
}

/**
 * Resuelve amount_usd + fx_rate + fx_date para una entry.
 * Úsalo antes de insertar un spend entry.
 */
export async function computeSpendUsd(input: {
  fecha: string
  currency: string
  amount_local: number
}): Promise<ComputeSpendUsdResult> {
  const { data, error } = await supabase.rpc('admin_effix_compute_spend_usd', {
    p_fecha: input.fecha,
    p_currency: input.currency,
    p_amount_local: input.amount_local,
  })
  if (error) throw error
  return data as ComputeSpendUsdResult
}

export function useCreateSpendEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      input: Omit<CmsSpendEntry, 'id' | 'amount_usd' | 'fx_rate' | 'fx_date' | 'created_at' | 'updated_at' | 'reconciled' | 'reconciled_by' | 'reconciled_at' | 'metadata' | 'created_by' | 'csv_import_id' | 'source'> & {
        source?: CmsSpendEntry['source']
      },
    ) => {
      const { fx_rate, fx_date, amount_usd } = await computeSpendUsd({
        fecha: input.fecha,
        currency: input.currency,
        amount_local: input.amount_local,
      })
      const { data, error } = await supabase
        .from('admin_effix_spend_entries')
        .insert({
          ...input,
          fx_rate,
          fx_date,
          amount_usd,
          source: input.source ?? 'manual',
        })
        .select('*')
        .single()
      if (error) throw error
      return data as CmsSpendEntry
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-spend'] }),
  })
}

export function useUpdateSpendEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsSpendEntry> }) => {
      const { data, error } = await supabase
        .from('admin_effix_spend_entries')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsSpendEntry
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-spend'] }),
  })
}

export function useReconcileMonth() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { strategyId: string; year: number; month: number }) => {
      const { data, error } = await supabase.rpc('admin_effix_reconcile_month', {
        p_strategy_id: input.strategyId,
        p_year: input.year,
        p_month: input.month,
      })
      if (error) throw error
      return data as number
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-spend'] }),
  })
}
