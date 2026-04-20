import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useCreateStrategy, useUpdateStrategy } from '@/hooks/useStrategies'
import { useAuth } from '@/components/AuthProvider'
import type { CmsStrategy, StrategyStatus } from '@/types/cms'
import {
  AREA_META,
  REQUIREMENT_STATUS_META,
  PRIORITY_META,
  formatDate,
  daysUntil,
} from '@/lib/cms'

interface StrategyFormProps {
  strategy?: CmsStrategy
  brandSlug: string
  brandCountries: string[]
  defaultCountry?: string
  onSaved: (s: CmsStrategy) => void
  onClose: () => void
}

export function StrategyForm({
  strategy,
  brandSlug,
  brandCountries,
  defaultCountry,
  onSaved,
  onClose,
}: StrategyFormProps) {
  const { profile } = useAuth()
  const createMut = useCreateStrategy()
  const updateMut = useUpdateStrategy()
  const isEdit = Boolean(strategy)

  const [form, setForm] = useState({
    nombre: strategy?.nombre ?? '',
    pais: strategy?.pais ?? defaultCountry ?? brandCountries[0] ?? 'CO',
    estado: (strategy?.estado ?? 'draft') as StrategyStatus,
    periodo_start: strategy?.periodo_start ?? '',
    periodo_end: strategy?.periodo_end ?? '',
    budget_total_usd: strategy?.budget_total_usd ?? 0,
    objetivo_md: strategy?.objetivo_md ?? '',
  })
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    const payload = {
      brand_slug: brandSlug,
      nombre: form.nombre.trim(),
      pais: form.pais,
      estado: form.estado,
      periodo_start: form.periodo_start || null,
      periodo_end: form.periodo_end || null,
      budget_total_usd: Number(form.budget_total_usd) || 0,
      objetivo_md: form.objetivo_md || null,
      owner_estratega: profile?.id ?? null,
    }
    try {
      if (isEdit && strategy) {
        const up = await updateMut.mutateAsync({ id: strategy.id, patch: payload })
        onSaved(up)
      } else {
        const cr = await createMut.mutateAsync(payload)
        onSaved(cr)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const pending = createMut.isPending || updateMut.isPending

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-xl rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">
            {isEdit ? 'Editar estrategia' : 'Nueva estrategia'}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="p-5 space-y-3">
          <Field label="Nombre *">
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ej: EffiCommerce CR 2026-Q2"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="País">
              <select
                value={form.pais}
                onChange={(e) => setForm({ ...form, pais: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {brandCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estado">
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value as StrategyStatus })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                <option value="draft">Borrador</option>
                <option value="active">Activa</option>
                <option value="paused">Pausada</option>
                <option value="closed">Cerrada</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Inicio">
              <input
                type="date"
                value={form.periodo_start}
                onChange={(e) => setForm({ ...form, periodo_start: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Fin">
              <input
                type="date"
                value={form.periodo_end}
                onChange={(e) => setForm({ ...form, periodo_end: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
          </div>
          <Field label="Presupuesto total (USD)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.budget_total_usd}
              onChange={(e) => setForm({ ...form, budget_total_usd: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Objetivo (markdown)">
            <textarea
              rows={4}
              value={form.objetivo_md}
              onChange={(e) => setForm({ ...form, objetivo_md: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
              placeholder="Qué queremos lograr con esta estrategia..."
            />
          </Field>

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
            {isEdit ? 'Guardar' : 'Crear'}
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
