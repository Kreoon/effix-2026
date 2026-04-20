import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useFxRates, useUpsertFxRate } from '@/hooks/useFxRates'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { SUPPORTED_CURRENCIES, formatDate } from '@/lib/cms'

export function FxRatesView() {
  const { isAdmin } = useAdminProfile()
  const [currencyFilter, setCurrencyFilter] = useState<string>('')
  const { data: rates = [], isLoading } = useFxRates(currencyFilter || undefined)
  const upsert = useUpsertFxRate()
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    currency: 'CRC',
    rate_usd: 0,
  })

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.rate_usd || form.rate_usd <= 0) return
    await upsert.mutateAsync({
      date: form.date,
      currency: form.currency,
      rate_usd: form.rate_usd,
    })
    setForm({ ...form, rate_usd: 0 })
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-[#0E2A47]">Tipos de cambio</h1>
        <p className="text-sm text-slate-600">
          TRMs usadas para calcular amount_usd en el libro diario.
        </p>
      </header>

      {isAdmin && (
        <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <Field label="Fecha">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
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
            <Field label="Rate → USD (1 local × rate = USD)">
              <input
                type="number"
                step="0.000001"
                min="0"
                value={form.rate_usd}
                onChange={(e) => setForm({ ...form, rate_usd: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
                placeholder="Ej CRC: 0.001923"
              />
            </Field>
            <button
              type="submit"
              disabled={upsert.isPending || !form.rate_usd}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-60"
            >
              <Plus size={14} /> Upsert
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Filtrar:</span>
        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-white"
        >
          <option value="">Todas</option>
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-2.5">Fecha</th>
              <th className="text-left px-4 py-2.5">Moneda</th>
              <th className="text-right px-4 py-2.5">Rate USD</th>
              <th className="text-right px-4 py-2.5">1 USD ≈</th>
              <th className="text-left px-4 py-2.5">Fuente</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Cargando...
                </td>
              </tr>
            )}
            {rates.map((r) => (
              <tr key={`${r.date}-${r.currency}`} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-xs">{formatDate(r.date)}</td>
                <td className="px-4 py-2 font-medium">{r.currency}</td>
                <td className="px-4 py-2 text-right tabular-nums text-xs">{r.rate_usd.toFixed(6)}</td>
                <td className="px-4 py-2 text-right tabular-nums text-xs text-slate-500">
                  {r.rate_usd > 0 ? `${(1 / r.rate_usd).toFixed(2)} ${r.currency}` : '—'}
                </td>
                <td className="px-4 py-2 text-xs text-slate-500">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
