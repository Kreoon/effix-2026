import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsBudget } from '@/types/cms'

export function useBudgets(strategyId: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-budgets', strategyId],
    enabled: Boolean(strategyId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_effix_budgets')
        .select('*')
        .eq('strategy_id', strategyId!)
        .order('period_start', { ascending: true })
      if (error) throw error
      return (data ?? []) as CmsBudget[]
    },
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  })
}

export function useCreateBudget() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      input: Partial<CmsBudget> & Pick<CmsBudget, 'strategy_id' | 'platform' | 'period_start' | 'period_end' | 'amount_usd'>,
    ) => {
      const { data, error } = await supabase.from('admin_effix_budgets').insert(input).select('*').single()
      if (error) throw error
      return data as CmsBudget
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-budgets', d.strategy_id] }),
  })
}

export function useUpdateBudget() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsBudget> }) => {
      const { data, error } = await supabase
        .from('admin_effix_budgets')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsBudget
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-budgets', d.strategy_id] }),
  })
}

export function useDeleteBudget() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, strategyId }: { id: string; strategyId: string }) => {
      const { error } = await supabase.from('admin_effix_budgets').delete().eq('id', id)
      if (error) throw error
      return { id, strategyId }
    },
    onSuccess: (d) => qc.invalidateQueries({ queryKey: ['cms-budgets', d.strategyId] }),
  })
}
