import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, X, Calendar, User, FileText, CheckCircle2, type LucideIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useChangeRequirementStatus, useRequirement } from '@/hooks/useRequirements'
import { useApprovals, useCreateApproval, useDecideApproval } from '@/hooks/useApprovals'
import { useAuth } from '@/components/AuthProvider'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { StatusPill } from './StatusPill'
import { MarkdownView } from './MarkdownView'
import { AssetUploader } from './AssetUploader'
import {
  AREA_META,
  APPROVAL_STATUS_META,
  PRIORITY_META,
  REQUIREMENT_STATUS_META,
  formatDate,
} from '@/lib/cms'
import type { AdminProfile } from '@/types/admin'
import type { ApprovalStatus, CmsRequirement, RequirementStatus } from '@/types/cms'
import { RequirementForm } from './RequirementForm'

interface RequirementDetailProps {
  requirementId: string
  onClose: () => void
}

export function RequirementDetail({ requirementId, onClose }: RequirementDetailProps) {
  const { data: req, isLoading } = useRequirement(requirementId)
  const { data: approvals = [] } = useApprovals({ entityType: 'requirement', entityId: requirementId })
  const changeStatus = useChangeRequirementStatus()
  const { isAdmin } = useAdminProfile()
  const [editing, setEditing] = useState(false)
  const [askingChanges, setAskingChanges] = useState(false)
  const [changesText, setChangesText] = useState('')

  if (isLoading || !req) {
    return (
      <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
        <Loader2 className="animate-spin text-white" />
      </div>
    )
  }

  if (editing) {
    return (
      <RequirementForm
        requirement={req}
        onSaved={() => setEditing(false)}
        onClose={() => setEditing(false)}
      />
    )
  }

  const reqFinal = req
  const area = AREA_META[reqFinal.area]
  const statusMeta = REQUIREMENT_STATUS_META[reqFinal.status]
  const priorityMeta = PRIORITY_META[reqFinal.priority]
  const nextStatuses = statusMeta.next

  async function advance(next: RequirementStatus) {
    if (next === 'changes_requested') {
      setAskingChanges(true)
      return
    }
    await changeStatus.mutateAsync({ id: reqFinal.id, status: next })
  }

  async function submitChangesRequest() {
    await changeStatus.mutateAsync({
      id: reqFinal.id,
      status: 'changes_requested',
      comments: changesText,
    })
    setAskingChanges(false)
    setChangesText('')
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="px-5 py-3 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <StatusPill label={area.label} color={area.color} bg={area.bg} />
              <StatusPill label={statusMeta.label} color={statusMeta.color} bg={statusMeta.bg} />
              {reqFinal.priority !== 'normal' && (
                <StatusPill label={priorityMeta.label} color={priorityMeta.color} bg={priorityMeta.bg} />
              )}
            </div>
            <h2 className="font-semibold text-lg text-[#0E2A47]">{reqFinal.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <InfoItem icon={Calendar} label="Deadline" value={formatDate(reqFinal.deadline)} />
            <InfoItem icon={User} label="Asignado" value={<AssigneeName id={reqFinal.assignee_id} />} />
            <InfoItem
              icon={FileText}
              label="Plantilla"
              value={reqFinal.template_used ? reqFinal.template_used.split('/').pop() : '—'}
            />
            <InfoItem icon={FileText} label="Revisiones" value={String(req.revision_count)} />
          </div>

          {/* Brief */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Brief</h3>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <MarkdownView md={req.brief_md} fallback="Sin brief escrito todavía." />
            </div>
          </section>

          {/* Review comments (si hay) */}
          {req.review_comments_md && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-orange-700 mb-2">
                Comentarios de revisión
              </h3>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <MarkdownView md={req.review_comments_md} />
              </div>
            </section>
          )}

          {/* Assets */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Entregables
            </h3>
            <AssetUploader requirementId={req.id} />
          </section>

          {/* Approvals */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Aprobaciones</h3>
              <NewApprovalButton requirement={req} />
            </div>
            {approvals.length === 0 ? (
              <p className="text-xs text-slate-400">Sin solicitudes de aprobación.</p>
            ) : (
              <ul className="space-y-2">
                {approvals.map((a) => (
                  <ApprovalRow key={a.id} approvalId={a.id} />
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Footer actions */}
        <footer className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {nextStatuses.length > 0 && isAdmin && (
              <span className="text-xs text-slate-400 mr-2">Mover a:</span>
            )}
            {isAdmin &&
              nextStatuses.map((s) => {
                const meta = REQUIREMENT_STATUS_META[s]
                return (
                  <button
                    key={s}
                    onClick={() => void advance(s)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium hover:opacity-90 ${meta.bg} ${meta.color}`}
                  >
                    {meta.label}
                  </button>
                )
              })}
          </div>
          {isAdmin && (
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Editar
            </button>
          )}
        </footer>

        {/* Modal anidado para comentarios de changes_requested */}
        {askingChanges && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 rounded-xl">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-5">
              <h3 className="font-semibold text-[#0E2A47] mb-2">Pedir cambios</h3>
              <textarea
                rows={4}
                value={changesText}
                onChange={(e) => setChangesText(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
                placeholder="Qué hay que cambiar..."
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setAskingChanges(false)}
                  className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitChangesRequest}
                  disabled={!changesText.trim() || changeStatus.isPending}
                  className="rounded-lg bg-orange-500 text-white px-3 py-1.5 text-sm disabled:opacity-60"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} className="text-slate-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-[#0E2A47] truncate">{value}</p>
      </div>
    </div>
  )
}

function AssigneeName({ id }: { id: string | null }) {
  const { data } = useQuery({
    queryKey: ['cms-profile', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await supabase
        .from('admin_effix_profiles')
        .select('email, full_name')
        .eq('id', id!)
        .maybeSingle()
      return data as Pick<AdminProfile, 'email' | 'full_name'> | null
    },
  })
  if (!id) return <>Sin asignar</>
  return <>{data?.full_name || data?.email || id.slice(0, 8)}</>
}

// ============================================================================
// Nueva aprobación
// ============================================================================

function NewApprovalButton({ requirement }: { requirement: CmsRequirement }) {
  const [open, setOpen] = useState(false)
  const [approverId, setApproverId] = useState<string>('')
  const [requestMd, setRequestMd] = useState('')
  const createApproval = useCreateApproval()
  const { isAdmin } = useAdminProfile()

  const { data: profiles = [] } = useQuery({
    queryKey: ['cms-profiles-active'],
    queryFn: async () => {
      const { data } = await supabase
        .from('admin_effix_profiles')
        .select('id, email, full_name, role')
        .eq('is_active', true)
        .in('role', ['admin', 'super_admin'])
        .order('email')
      return (data ?? []) as Pick<AdminProfile, 'id' | 'email' | 'full_name' | 'role'>[]
    },
  })

  if (!isAdmin) return null

  async function submit() {
    if (!approverId) return
    await createApproval.mutateAsync({
      entity_type: 'requirement',
      entity_id: requirement.id,
      approver_id: approverId,
      request_md: requestMd || null,
    })
    setOpen(false)
    setApproverId('')
    setRequestMd('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-[#0E2A47] hover:underline inline-flex items-center gap-1"
      >
        + Solicitar aprobación
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-[#0E2A47] mb-3">Solicitar aprobación</h3>
            <select
              value={approverId}
              onChange={(e) => setApproverId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white mb-3"
            >
              <option value="">Seleccionar aprobador...</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name || p.email} · {p.role}
                </option>
              ))}
            </select>
            <textarea
              rows={3}
              value={requestMd}
              onChange={(e) => setRequestMd(e.target.value)}
              placeholder="Notas para el aprobador (opcional)..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono mb-3"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm">
                Cancelar
              </button>
              <button
                onClick={submit}
                disabled={!approverId || createApproval.isPending}
                className="rounded-lg bg-[#0E2A47] text-white px-3 py-1.5 text-sm disabled:opacity-60"
              >
                Enviar solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ============================================================================
// Row con acciones de aprobar/cambios/rechazar
// ============================================================================

function ApprovalRow({ approvalId }: { approvalId: string }) {
  const { profile } = useAuth()
  const { data: approvals = [] } = useApprovals()
  const approval = approvals.find((a) => a.id === approvalId)
  const decide = useDecideApproval()
  const [decisionText, setDecisionText] = useState('')
  const [showInput, setShowInput] = useState(false)

  if (!approval) return null

  const canDecide = approval.status === 'pending' && approval.approver_id === profile?.id
  const meta = APPROVAL_STATUS_META[approval.status]

  async function act(status: ApprovalStatus) {
    await decide.mutateAsync({
      approvalId: approval!.id,
      status,
      decision_md: decisionText || null,
    })
    setShowInput(false)
    setDecisionText('')
  }

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <StatusPill label={approval.ap_code} color="text-[#0E2A47]" bg="bg-amber-100" />
        <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
        <span className="text-xs text-slate-500">
          pedido {formatDate(approval.requested_at, { includeTime: true })}
        </span>
      </div>
      {approval.request_md && (
        <p className="text-xs text-slate-600 mt-2">{approval.request_md}</p>
      )}
      {approval.decision_md && (
        <div className="mt-2 text-xs bg-slate-50 border border-slate-100 rounded p-2">
          <span className="font-medium">Decisión:</span> {approval.decision_md}
        </div>
      )}
      {canDecide && (
        <div className="mt-3">
          {showInput ? (
            <div className="space-y-2">
              <textarea
                rows={2}
                value={decisionText}
                onChange={(e) => setDecisionText(e.target.value)}
                placeholder="Comentario (opcional)"
                className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => act('approved')}
                  disabled={decide.isPending}
                  className="rounded-lg bg-emerald-500 text-white px-3 py-1 text-xs disabled:opacity-60 inline-flex items-center gap-1"
                >
                  <CheckCircle2 size={12} /> Aprobar
                </button>
                <button
                  onClick={() => act('changes_requested')}
                  disabled={decide.isPending}
                  className="rounded-lg bg-orange-500 text-white px-3 py-1 text-xs disabled:opacity-60"
                >
                  Pedir cambios
                </button>
                <button
                  onClick={() => act('rejected')}
                  disabled={decide.isPending}
                  className="rounded-lg bg-red-500 text-white px-3 py-1 text-xs disabled:opacity-60"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => setShowInput(false)}
                  className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="text-xs text-[#0E2A47] hover:underline"
            >
              Decidir →
            </button>
          )}
        </div>
      )}
    </li>
  )
}
