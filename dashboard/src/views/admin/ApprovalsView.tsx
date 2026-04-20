import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useApprovals, useDecideApproval } from '@/hooks/useApprovals'
import { StatusPill } from '@/components/cms/StatusPill'
import { RequirementDetail } from '@/components/cms/RequirementDetail'
import { APPROVAL_STATUS_META, formatDate } from '@/lib/cms'
import { CheckCircle2, MessageSquareWarning, XCircle } from 'lucide-react'
import type { ApprovalStatus } from '@/types/cms'

export function ApprovalsView() {
  const { profile } = useAuth()
  const { data: approvals = [], isLoading } = useApprovals({
    approverId: profile?.id,
    status: 'pending',
  })
  const decide = useDecideApproval()
  const [detailId, setDetailId] = useState<string | null>(null)
  const [commentingId, setCommentingId] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')

  async function act(approvalId: string, status: ApprovalStatus) {
    await decide.mutateAsync({
      approvalId,
      status,
      decision_md: commentText || null,
    })
    setCommentingId(null)
    setCommentText('')
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-[#0E2A47]">Aprobaciones</h1>
        <p className="text-sm text-slate-600">
          Tickets AP-NNN asignados a tu usuario · {approvals.length} pendientes
        </p>
      </header>

      {isLoading && <p className="text-sm text-slate-500">Cargando...</p>}

      {!isLoading && approvals.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Sin aprobaciones pendientes 👏</p>
        </div>
      )}

      <div className="space-y-2">
        {approvals.map((a) => {
          const meta = APPROVAL_STATUS_META[a.status]
          const isCommenting = commentingId === a.id
          return (
            <div
              key={a.id}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <StatusPill label={a.ap_code} color="text-[#0E2A47]" bg="bg-amber-100" size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0E2A47] font-medium">
                    Aprobar {a.entity_type} ·{' '}
                    <span className="text-slate-500 font-normal">
                      {formatDate(a.requested_at, { includeTime: true })}
                    </span>
                  </p>
                  {a.request_md && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.request_md}</p>
                  )}
                  {a.entity_type === 'requirement' && (
                    <button
                      onClick={() => setDetailId(a.entity_id)}
                      className="mt-1 text-xs text-sky-600 hover:underline"
                    >
                      Ver requerimiento →
                    </button>
                  )}
                </div>
                <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
              </div>

              {isCommenting ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                    placeholder="Comentario (opcional)..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => act(a.id, 'approved')}
                      disabled={decide.isPending}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 text-white px-3 py-1.5 text-xs disabled:opacity-60"
                    >
                      <CheckCircle2 size={12} /> Aprobar
                    </button>
                    <button
                      onClick={() => act(a.id, 'changes_requested')}
                      disabled={decide.isPending}
                      className="inline-flex items-center gap-1 rounded-lg bg-orange-500 text-white px-3 py-1.5 text-xs disabled:opacity-60"
                    >
                      <MessageSquareWarning size={12} /> Pedir cambios
                    </button>
                    <button
                      onClick={() => act(a.id, 'rejected')}
                      disabled={decide.isPending}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-500 text-white px-3 py-1.5 text-xs disabled:opacity-60"
                    >
                      <XCircle size={12} /> Rechazar
                    </button>
                    <button
                      onClick={() => {
                        setCommentingId(null)
                        setCommentText('')
                      }}
                      className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCommentingId(a.id)}
                  className="mt-3 text-xs text-[#0E2A47] hover:underline"
                >
                  Decidir →
                </button>
              )}
            </div>
          )
        })}
      </div>

      {detailId && <RequirementDetail requirementId={detailId} onClose={() => setDetailId(null)} />}
    </div>
  )
}
