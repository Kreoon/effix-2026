import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCreateRequirement, useUpdateRequirement } from '@/hooks/useRequirements'
import { useStrategies } from '@/hooks/useStrategies'
import { DualEditor } from './DualEditor'
import { AREA_META } from '@/lib/cms'
import type { AdminProfile } from '@/types/admin'
import type {
  BriefFormat,
  CmsArea,
  CmsPriority,
  CmsRequirement,
  RequirementStatus,
} from '@/types/cms'

const AREAS: CmsArea[] = ['estratega', 'design', 'audiovisual', 'trafficker', 'dev_web', 'finanzas']
const PRIORITIES: CmsPriority[] = ['low', 'normal', 'high', 'urgent']

const TEMPLATES: Record<CmsArea, { label: string; url: string } | null> = {
  design: { label: 'Brief creativo', url: '/templates/brief-creativo.md' },
  audiovisual: { label: 'Brief creativo', url: '/templates/brief-creativo.md' },
  trafficker: { label: 'Brief creativo', url: '/templates/brief-creativo.md' },
  dev_web: { label: 'Propuesta landing', url: '/templates/propuesta-landing.md' },
  estratega: { label: 'Brief creativo', url: '/templates/brief-creativo.md' },
  finanzas: null,
}

interface RequirementFormProps {
  /** Si se pasa: modo edición. Si no: crear nuevo. */
  requirement?: CmsRequirement
  /** Strategy default al crear */
  strategyId?: string
  /** Brand slug para filtrar estrategias disponibles */
  brandSlug?: string
  onSaved: (req: CmsRequirement) => void
  onClose: () => void
}

export function RequirementForm({
  requirement,
  strategyId,
  brandSlug,
  onSaved,
  onClose,
}: RequirementFormProps) {
  const createMut = useCreateRequirement()
  const updateMut = useUpdateRequirement()
  const isEdit = Boolean(requirement)

  const { data: strategies = [] } = useStrategies(brandSlug ? { brandSlug } : {})
  const { data: profiles = [] } = useQuery({
    queryKey: ['cms-profiles-active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_effix_profiles')
        .select('id, email, full_name, areas, role')
        .eq('is_active', true)
        .order('email')
      if (error) throw error
      return (data ?? []) as Array<{
        id: string
        email: string
        full_name: string | null
        areas: string[]
        role: AdminProfile['role']
      }>
    },
    staleTime: 1000 * 60 * 5,
  })

  const [form, setForm] = useState<{
    strategy_id: string
    area: CmsArea
    title: string
    brief_md: string
    brief_format: BriefFormat
    priority: CmsPriority
    status: RequirementStatus
    assignee_id: string
    deadline: string
  }>(() => ({
    strategy_id: requirement?.strategy_id ?? strategyId ?? strategies[0]?.id ?? '',
    area: requirement?.area ?? 'design',
    title: requirement?.title ?? '',
    brief_md: requirement?.brief_md ?? '',
    brief_format: requirement?.brief_format ?? 'markdown',
    priority: requirement?.priority ?? 'normal',
    status: requirement?.status ?? 'draft',
    assignee_id: requirement?.assignee_id ?? '',
    deadline: requirement?.deadline ?? '',
  }))

  // Default strategy si aún no tenemos una
  useEffect(() => {
    if (!form.strategy_id && strategies[0]?.id) {
      setForm((f) => ({ ...f, strategy_id: strategies[0].id }))
    }
  }, [strategies, form.strategy_id])

  const [error, setError] = useState<string | null>(null)

  const filteredProfiles = profiles.filter((p) => {
    const areas = p.areas ?? []
    return areas.length === 0 || areas.includes(form.area)
  })
  const templateRef = TEMPLATES[form.area]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.strategy_id) {
      setError('Seleccioná una estrategia.')
      return
    }
    if (!form.title.trim()) {
      setError('El título es obligatorio.')
      return
    }

    const payload = {
      strategy_id: form.strategy_id,
      area: form.area,
      title: form.title.trim(),
      brief_md: form.brief_md,
      brief_format: form.brief_format,
      priority: form.priority,
      status: form.status,
      assignee_id: form.assignee_id || null,
      deadline: form.deadline || null,
      template_used: templateRef?.url ?? null,
    }

    try {
      if (isEdit && requirement) {
        const updated = await updateMut.mutateAsync({ id: requirement.id, patch: payload })
        onSaved(updated)
      } else {
        const created = await createMut.mutateAsync(payload)
        onSaved(created)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const pending = createMut.isPending || updateMut.isPending

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">
            {isEdit ? `Editar requerimiento` : 'Nuevo requerimiento'}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Estrategia *">
              <select
                value={form.strategy_id}
                onChange={(e) => setForm({ ...form, strategy_id: e.target.value })}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                <option value="">Seleccionar...</option>
                {strategies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} · {s.pais}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Área *">
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value as CmsArea })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {AREA_META[a].label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Título *">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ej: 3 videos 9:16 para Meta Funnel A"
            />
          </Field>

          <Field label="Brief">
            <DualEditor
              value={form.brief_md}
              format={form.brief_format}
              onChange={(v, fmt) => setForm({ ...form, brief_md: v, brief_format: fmt })}
              templateUrl={templateRef?.url}
              placeholder="Contexto, objetivo, especificaciones técnicas, referencias..."
              minHeight={260}
            />
          </Field>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Field label="Prioridad">
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as CmsPriority })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estado">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as RequirementStatus })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                <option value="draft">draft</option>
                <option value="in_review">in_review</option>
                <option value="changes_requested">changes_requested</option>
                <option value="approved">approved</option>
                <option value="in_production">in_production</option>
                <option value="qa">qa</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
                <option value="blocked">blocked</option>
                <option value="cancelled">cancelled</option>
              </select>
            </Field>
            <Field label="Asignar a">
              <select
                value={form.assignee_id}
                onChange={(e) => setForm({ ...form, assignee_id: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                <option value="">Sin asignar</option>
                {filteredProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name || p.email}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Deadline">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <footer className="px-5 py-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-60"
          >
            {pending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? 'Guardar cambios' : 'Crear requerimiento'}
          </button>
        </footer>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      {children}
    </div>
  )
}
