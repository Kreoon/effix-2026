import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsRequirement, CmsArea, RequirementStatus } from '@/types/cms'

interface RequirementsFilter {
  strategyId?: string | null
  area?: CmsArea | null
  status?: RequirementStatus | null
  assigneeId?: string | null
  overdueOnly?: boolean
}

export function useRequirements(filter: RequirementsFilter = {}) {
  return useQuery({
    queryKey: ['cms-requirements', filter],
    queryFn: async () => {
      let q = supabase.from('admin_effix_requirements').select('*').order('updated_at', { ascending: false })
      if (filter.strategyId) q = q.eq('strategy_id', filter.strategyId)
      if (filter.area) q = q.eq('area', filter.area)
      if (filter.status) q = q.eq('status', filter.status)
      if (filter.assigneeId) q = q.eq('assignee_id', filter.assigneeId)
      if (filter.overdueOnly) q = q.lt('deadline', new Date().toISOString().slice(0, 10))
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsRequirement[]
    },
    staleTime: 1000 * 15,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  })
}

export function useRequirement(id: string | null | undefined) {
  return useQuery({
    queryKey: ['cms-requirement', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('admin_effix_requirements').select('*').eq('id', id!).maybeSingle()
      if (error) throw error
      return data as CmsRequirement | null
    },
  })
}

export function useCreateRequirement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      input: Partial<CmsRequirement> & Pick<CmsRequirement, 'strategy_id' | 'area' | 'title'>,
    ) => {
      const { data, error } = await supabase.from('admin_effix_requirements').insert(input).select('*').single()
      if (error) throw error
      return data as CmsRequirement
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-requirements'] }),
  })
}

export function useUpdateRequirement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<CmsRequirement> }) => {
      const { data, error } = await supabase
        .from('admin_effix_requirements')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsRequirement
    },
    onSuccess: (d) => {
      qc.invalidateQueries({ queryKey: ['cms-requirements'] })
      qc.invalidateQueries({ queryKey: ['cms-requirement', d.id] })
    },
  })
}

export function useChangeRequirementStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status, comments }: { id: string; status: RequirementStatus; comments?: string }) => {
      const patch: Partial<CmsRequirement> = { status }
      if (status === 'changes_requested' && comments) patch.review_comments_md = comments
      const { data, error } = await supabase
        .from('admin_effix_requirements')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as CmsRequirement
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-requirements'] }),
  })
}
