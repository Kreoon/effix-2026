import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsReport } from '@/types/cms'

export function useReports(filter: { strategyId?: string | null; type?: CmsReport['type'] | null } = {}) {
  return useQuery({
    queryKey: ['cms-reports', filter],
    queryFn: async () => {
      let q = supabase.from('admin_effix_reports').select('*').order('period_end', { ascending: false })
      if (filter.strategyId) q = q.eq('strategy_id', filter.strategyId)
      if (filter.type) q = q.eq('type', filter.type)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsReport[]
    },
  })
}

export function useCreateReport() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      input: Partial<CmsReport> &
        Pick<CmsReport, 'strategy_id' | 'type' | 'period_start' | 'period_end'>,
    ) => {
      const { data, error } = await supabase.from('admin_effix_reports').insert(input).select('*').single()
      if (error) throw error
      return data as CmsReport
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-reports'] }),
  })
}

export function useUpdateReport() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsReport> }) => {
      const { data, error } = await supabase
        .from('admin_effix_reports')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsReport
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-reports'] }),
  })
}
