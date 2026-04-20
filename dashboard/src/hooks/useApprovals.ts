import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { CmsApproval, ApprovalStatus, CreateApprovalResult } from '@/types/cms'

interface ApprovalsFilter {
  approverId?: string | null
  status?: ApprovalStatus | null
  entityType?: CmsApproval['entity_type'] | null
  entityId?: string | null
}

export function useApprovals(filter: ApprovalsFilter = {}) {
  return useQuery({
    queryKey: ['cms-approvals', filter],
    queryFn: async () => {
      let q = supabase.from('admin_effix_approvals').select('*').order('requested_at', { ascending: false })
      if (filter.approverId) q = q.eq('approver_id', filter.approverId)
      if (filter.status) q = q.eq('status', filter.status)
      if (filter.entityType) q = q.eq('entity_type', filter.entityType)
      if (filter.entityId) q = q.eq('entity_id', filter.entityId)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as CmsApproval[]
    },
    staleTime: 1000 * 15,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  })
}

export function useCreateApproval() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      entity_type: CmsApproval['entity_type']
      entity_id: string
      approver_id: string
      request_md?: string | null
      approved_snapshot?: Record<string, unknown> | null
    }) => {
      const { data, error } = await supabase.rpc('admin_effix_create_approval', {
        p_entity_type: input.entity_type,
        p_entity_id: input.entity_id,
        p_approver_id: input.approver_id,
        p_request_md: input.request_md ?? null,
        p_approved_snapshot: input.approved_snapshot ?? null,
      })
      if (error) throw error
      return data as CreateApprovalResult
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-approvals'] }),
  })
}

export function useDecideApproval() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { approvalId: string; status: ApprovalStatus; decision_md?: string | null }) => {
      const { error } = await supabase.rpc('admin_effix_decide_approval', {
        p_approval_id: input.approvalId,
        p_status: input.status,
        p_decision_md: input.decision_md ?? null,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cms-approvals'] }),
  })
}
