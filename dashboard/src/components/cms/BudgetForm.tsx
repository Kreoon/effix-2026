import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useCreateBudget, useUpdateBudget } from '@/hooks/useBudgets'
import { SUPPORTED_CURRENCIES } from '@/lib/cms'
import type { CmsBudget } from '@/types/cms'

const PLATFORMS = ['meta', 'google', 'tiktok', 'whatsapp', 'email', 'other']

interface Props {
  budget?: CmsBudget
  strategyId: string
  onSaved: () => void
  onClose: () => void
}

export function BudgetForm({ budget, strategyId, onSaved, onClose }: Props) {
  const create = useCreateBudget()
  const update = useUpdateBudget()
  const isEdit = Boolean(budget)

  const today = new Date().toISOString().slice(0, 10)
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10)

  const [form, setForm] = useState({
    platform: budget?.platform ?? 'meta',
    period_start: budget?.period_start ?? today,
    period_end: budget?.period_end ?? monthEnd,
    amount_usd: budget?.amount_usd ?? 0,
    amount_local: budget?.amount_local ?? 0,
    currency: budget?.currency ?? 'USD',
    notes_md: budget?.notes_md ?? '',
  })
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.amount_usd <= 0) return setError('El monto USD debe ser mayor a 0')
    if (form.period_end < form.period_start) return setError('La fecha fin debe ser >= inicio')
    const payload = {
      strategy_id: strategyId,
      platform: form.platform,
      period_start: form.period_start,
      period_end: form.period_end,
      amount_usd: Number(form.amount_usd),
      amount_local: form.amount_local ? Number(form.amount_local) : null,
      currency: form.currency,
      notes_md: form.notes_md || null,
    }
    try {
      if (isEdit && budget) {
        await update.mutateAsync({ id: budget.id, patch: payload })
      } else {
        await create.mutateAsync(payload)
      }
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const pending = create.isPending || update.isPending

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">
            {isEdit ? 'Editar presupuesto' : 'Nuevo presupuesto'}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="p-5 space-y-3">
          <Field label="Plataforma">
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Inicio *">
              <input
                type="date"
                required
                value={form.period_start}
                onChange={(e) => setForm({ ...form, period_start: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Fin *">
              <input
                type="date"
                required
                value={form.period_end}
                onChange={(e) => setForm({ ...form, period_end: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
          </div>
          <Field label="Monto USD *">
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={form.amount_usd}
              onChange={(e) => setForm({ ...form, amount_usd: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Monto local (opc)">
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.amount_local}
                onChange={(e) => setForm({ ...form, amount_local: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </Field>
            <Field label="Moneda">
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Notas">
            <textarea
              rows={2}
              value={form.notes_md}
              onChange={(e) => setForm({ ...form, notes_md: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
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
