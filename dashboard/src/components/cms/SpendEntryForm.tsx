import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useCreateSpendEntry, computeSpendUsd } from '@/hooks/useSpendEntries'
import { SUPPORTED_CURRENCIES, formatUsd } from '@/lib/cms'

const PLATFORMS = ['meta', 'google', 'tiktok', 'whatsapp', 'email', 'other']

interface SpendEntryFormProps {
  strategyId: string
  onSaved: () => void
  onClose: () => void
}

export function SpendEntryForm({ strategyId, onSaved, onClose }: SpendEntryFormProps) {
  const create = useCreateSpendEntry()

  const [form, setForm] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    platform: 'meta',
    amount_local: 0,
    currency: 'USD',
    notes: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<{ fx_rate: number; amount_usd: number } | null>(null)

  // Preview USD cuando cambia moneda/monto/fecha
  useEffect(() => {
    let cancelled = false
    async function update() {
      if (!form.amount_local || form.amount_local <= 0) {
        if (!cancelled) setPreview(null)
        return
      }
      try {
        const r = await computeSpendUsd({
          fecha: form.fecha,
          currency: form.currency,
          amount_local: form.amount_local,
        })
        if (!cancelled) setPreview({ fx_rate: r.fx_rate, amount_usd: r.amount_usd })
      } catch {
        if (!cancelled) setPreview(null)
      }
    }
    const t = setTimeout(update, 300)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [form.fecha, form.currency, form.amount_local])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.amount_local <= 0) return setError('El monto debe ser mayor a 0')
    try {
      await create.mutateAsync({
        fecha: form.fecha,
        strategy_id: strategyId,
        campaign_id: null,
        platform: form.platform,
        amount_local: Number(form.amount_local),
        currency: form.currency,
        notes: form.notes || null,
      })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">Nuevo gasto</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="p-5 space-y-3">
          <Field label="Fecha *">
            <input
              type="date"
              required
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </Field>
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
          <div className="grid grid-cols-3 gap-3">
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
            <Field label="Monto local *">
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={form.amount_local}
                onChange={(e) => setForm({ ...form, amount_local: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="→ USD">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm tabular-nums">
                {preview ? formatUsd(preview.amount_usd) : '—'}
              </div>
            </Field>
          </div>
          {preview && (
            <p className="text-xs text-slate-500">
              FX rate usado: {preview.fx_rate.toFixed(6)} ({form.currency} → USD)
            </p>
          )}
          <Field label="Notas">
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ej: campaña Meta F1 Video"
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
            disabled={create.isPending || !preview}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-60"
          >
            {create.isPending && <Loader2 size={14} className="animate-spin" />}
            Registrar
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
