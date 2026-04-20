import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useCreateLanding, useUpdateLanding } from '@/hooks/useLandings'
import type { CmsLanding, LandingStatus, LandingTipo } from '@/types/cms'

const TIPOS: LandingTipo[] = ['lead_capture', 'ventas', 'waitlist', 'comunidad', 'evento']
const STATUSES: LandingStatus[] = ['mockup', 'dev', 'qa', 'live', 'paused', 'archived']

interface Props {
  landing?: CmsLanding
  strategyId: string
  onSaved: () => void
  onClose: () => void
}

export function LandingForm({ landing, strategyId, onSaved, onClose }: Props) {
  const create = useCreateLanding()
  const update = useUpdateLanding()
  const isEdit = Boolean(landing)

  const [form, setForm] = useState({
    slug: landing?.slug ?? '',
    url_vercel: landing?.url_vercel ?? '',
    url_production: landing?.url_production ?? '',
    screenshot_url: landing?.screenshot_url ?? '',
    funnel: landing?.funnel ?? '',
    tipo: (landing?.tipo ?? 'lead_capture') as LandingTipo,
    status: (landing?.status ?? 'mockup') as LandingStatus,
    notes_md: landing?.notes_md ?? '',
  })
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const payload = {
        strategy_id: strategyId,
        slug: form.slug || null,
        url_vercel: form.url_vercel || null,
        url_production: form.url_production || null,
        screenshot_url: form.screenshot_url || null,
        funnel: form.funnel || null,
        tipo: form.tipo,
        status: form.status,
        notes_md: form.notes_md || null,
      }
      if (isEdit && landing) {
        await update.mutateAsync({ id: landing.id, patch: payload })
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
        className="bg-white w-full max-w-xl rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">{isEdit ? 'Editar landing' : 'Nueva landing'}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Slug">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="circulo-effix-ec"
              />
            </Field>
            <Field label="Funnel">
              <input
                type="text"
                value={form.funnel}
                onChange={(e) => setForm({ ...form, funnel: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="A, B, cross..."
              />
            </Field>
          </div>
          <Field label="URL Vercel (staging)">
            <input
              type="url"
              value={form.url_vercel}
              onChange={(e) => setForm({ ...form, url_vercel: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="https://landing-ecuador.vercel.app"
            />
          </Field>
          <Field label="URL producción">
            <input
              type="url"
              value={form.url_production}
              onChange={(e) => setForm({ ...form, url_production: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Screenshot URL">
            <input
              type="url"
              value={form.screenshot_url}
              onChange={(e) => setForm({ ...form, screenshot_url: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo">
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value as LandingTipo })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estado">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as LandingStatus })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Notas (markdown)">
            <textarea
              rows={3}
              value={form.notes_md}
              onChange={(e) => setForm({ ...form, notes_md: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
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
