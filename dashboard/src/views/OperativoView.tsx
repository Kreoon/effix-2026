import { useState, useEffect, useMemo } from 'react'
import { CheckSquare, Square, Plus } from 'lucide-react'
import { BrandSelector } from '@/components/BrandSelector'
import { spendEntries, brands, countryCurrencies, type SpendEntry } from '@/data/mock-data'
import { formatUSD, formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ─── Helpers de moneda ────────────────────────────────────────────────────────

function getPrimaryCountry(slug: string): string {
  return brands.find((b) => b.slug === slug)?.countries[0] ?? 'COL'
}

function getLocalCurrency(slug: string) {
  const country = getPrimaryCountry(slug)
  return countryCurrencies[country] ?? countryCurrencies['COL']
}

function formatLocal(usd: number, slug: string): string {
  const info = getLocalCurrency(slug)
  const local = Math.round(usd * info.trm)
  if (info.currency === 'USD') return formatUSD(usd)
  if (local >= 1_000_000) return `${info.symbol}${(local / 1_000_000).toFixed(1)}M`
  if (local >= 1_000) return `${info.symbol}${(local / 1_000).toFixed(1)}K`
  return `${info.symbol}${local.toLocaleString('es-CO')}`
}

// ─── Checklist ────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

const defaultChecklist: ChecklistItem[] = [
  { id: 'chk-1', label: 'Verificar que las conversiones esten disparando correctamente', done: false },
  { id: 'chk-2', label: 'Revisar negative keywords y agregar las pendientes (25+)', done: false },
  { id: 'chk-3', label: 'Confirmar presupuesto diario no excede el limite mensual', done: false },
  { id: 'chk-4', label: 'Revisar anuncios rechazados en todas las plataformas', done: false },
  { id: 'chk-5', label: 'Actualizar Customer Match con nuevos registros', done: false },
  { id: 'chk-6', label: 'Revisar quality score de keywords activas', done: false },
  { id: 'chk-7', label: 'Registrar gasto del dia en esta vista', done: false },
  { id: 'chk-8', label: 'Revisar alertas de rendimiento en Google Ads', done: false },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SpendFormState {
  brand_slug: string
  platform: string
  date: string
  spend_usd: string
  clicks: string
  conversions: string
}

const platformOptions = [
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'tiktok-ads', label: 'TikTok Ads' },
]

const platformLabel: Record<string, string> = {
  'google-ads': 'Google Ads',
  'meta-ads': 'Meta Ads',
  'tiktok-ads': 'TikTok Ads',
}

function getBrandName(slug: string): string {
  return brands.find((b) => b.slug === slug)?.name ?? slug
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface OperativoViewProps {
  brandSlug?: string
}

export function OperativoView({ brandSlug }: OperativoViewProps) {
  const activeBrands = brands.filter((b) => b.status !== 'sin-campanas')

  // Slug activo para filtrar: si viene del sidebar, es fijo; si no, usa el selector interno
  const [selectedSlug, setSelectedSlug] = useState(
    brandSlug ?? (activeBrands[0]?.slug ?? ''),
  )
  const [selectedPlatform, setSelectedPlatform] = useState('google-ads')
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist)
  const [localEntries, setLocalEntries] = useState<SpendEntry[]>([])
  const [formError, setFormError] = useState('')

  const activeSlug = brandSlug ?? selectedSlug

  // Sincroniza el selector interno cuando brandSlug cambia por navegacion
  useEffect(() => {
    if (brandSlug) setSelectedSlug(brandSlug)
  }, [brandSlug])

  // Estado del formulario — se deriva del activeSlug para evitar stale state
  const [form, setForm] = useState<SpendFormState>({
    brand_slug: activeSlug,
    platform: 'google-ads',
    date: '2026-03-31',
    spend_usd: '',
    clicks: '',
    conversions: '',
  })

  // Sincroniza form.brand_slug cuando el slug activo cambia
  useEffect(() => {
    setForm((prev) => ({ ...prev, brand_slug: activeSlug }))
  }, [activeSlug])

  // Info de moneda de la marca activa
  const activeCurrency = useMemo(() => getLocalCurrency(activeSlug), [activeSlug])

  function toggleCheck(id: string) {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    )
  }

  function handleFormChange(field: keyof SpendFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFormError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const usd = parseFloat(form.spend_usd)
    if (isNaN(usd) || usd <= 0) {
      setFormError('El gasto en USD debe ser un numero positivo.')
      return
    }
    const entry: SpendEntry = {
      date: form.date,
      brand_slug: brandSlug ?? form.brand_slug,
      platform: form.platform,
      spend_usd: usd,
      spend_cop: Math.round(usd * activeCurrency.trm),
      clicks: parseInt(form.clicks) || 0,
      conversions: parseInt(form.conversions) || 0,
    }
    setLocalEntries((prev) => [entry, ...prev])
    setForm((prev) => ({ ...prev, spend_usd: '', clicks: '', conversions: '' }))
  }

  const filteredEntries = [...localEntries, ...spendEntries].filter(
    (e) => e.brand_slug === activeSlug && e.platform === selectedPlatform,
  )

  const doneCount = checklist.filter((c) => c.done).length

  // Etiqueta de moneda para la columna de la tabla
  const localCurrencyLabel = activeCurrency.currency === 'USD'
    ? 'Gasto USD'
    : `Gasto ${activeCurrency.currency}`

  // Preview del equivalente en moneda local al escribir el monto
  const previewLocal = useMemo(() => {
    const usd = parseFloat(form.spend_usd)
    if (isNaN(usd) || usd <= 0) return null
    if (activeCurrency.currency === 'USD') return null
    return {
      formatted: formatLocal(usd, activeSlug),
      currency: activeCurrency.currency,
      trm: activeCurrency.trm,
    }
  }, [form.spend_usd, activeSlug, activeCurrency])

  return (
    <div className="space-y-6">
      {/* Selectores */}
      <div className="flex flex-wrap items-center gap-4">
        {brandSlug ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Marca</span>
            <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg px-3 py-2 text-sm font-medium">
              {getBrandName(brandSlug)}
            </span>
            <span className="text-xs text-slate-500">
              {activeCurrency.currency}
              {activeCurrency.trm !== 1 && ` · TRM ${formatNumber(activeCurrency.trm)}`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Marca</span>
            <BrandSelector value={selectedSlug} onChange={setSelectedSlug} className="w-52" />
          </div>
        )}
        <div className="flex items-center gap-2">
          <label htmlFor="op-platform" className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Plataforma
          </label>
          <select
            id="op-platform"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {platformOptions.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Checklist diario */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-slate-200 font-semibold text-sm">Checklist Diario</h3>
            <span className="text-xs text-slate-500 tabular-nums">
              {doneCount}/{checklist.length} completados
            </span>
          </div>
          <div className="p-4 space-y-2">
            {/* Barra de progreso */}
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(doneCount / checklist.length) * 100}%` }}
                role="progressbar"
                aria-valuenow={doneCount}
                aria-valuemax={checklist.length}
                aria-label={`${doneCount} de ${checklist.length} tareas completadas`}
              />
            </div>

            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group',
                  item.done ? 'bg-green-500/10 hover:bg-green-500/20' : 'hover:bg-slate-700/60',
                )}
                aria-pressed={item.done}
                aria-label={item.label}
              >
                {item.done ? (
                  <CheckSquare size={16} className="text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <Square size={16} className="text-slate-500 shrink-0 mt-0.5 group-hover:text-slate-400" />
                )}
                <span
                  className={cn(
                    'text-sm leading-snug',
                    item.done ? 'text-slate-500 line-through' : 'text-slate-300',
                  )}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Formulario de gasto */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl">
          <div className="px-5 py-4 border-b border-slate-700">
            <h3 className="text-slate-200 font-semibold text-sm">Registrar Gasto</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-brand">
                  Marca
                </label>
                {brandSlug ? (
                  <div className="w-full bg-slate-900 border border-slate-600 text-slate-300 rounded-lg px-3 py-2 text-sm">
                    {getBrandName(brandSlug)}
                  </div>
                ) : (
                  <select
                    id="f-brand"
                    value={form.brand_slug}
                    onChange={(e) => handleFormChange('brand_slug', e.target.value)}
                    className="w-full appearance-none bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {activeBrands.map((b) => (
                      <option key={b.slug} value={b.slug}>{b.name}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-platform">
                  Plataforma
                </label>
                <select
                  id="f-platform"
                  value={form.platform}
                  onChange={(e) => handleFormChange('platform', e.target.value)}
                  className="w-full appearance-none bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  {platformOptions.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-date">
                Fecha
              </label>
              <input
                id="f-date"
                type="date"
                value={form.date}
                onChange={(e) => handleFormChange('date', e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-spend">
                  Gasto USD
                </label>
                <input
                  id="f-spend"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.spend_usd}
                  onChange={(e) => handleFormChange('spend_usd', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-600"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-clicks">
                  Clics
                </label>
                <input
                  id="f-clicks"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.clicks}
                  onChange={(e) => handleFormChange('clicks', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5" htmlFor="f-conv">
                  Conversiones
                </label>
                <input
                  id="f-conv"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.conversions}
                  onChange={(e) => handleFormChange('conversions', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>
            </div>

            {previewLocal && (
              <p className="text-xs text-slate-500">
                Equivalente:{' '}
                <span className="text-slate-300 font-medium">{previewLocal.formatted}</span>{' '}
                ({previewLocal.currency} · TRM {formatNumber(previewLocal.trm)})
              </p>
            )}

            {formError && (
              <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <Plus size={14} />
              Registrar Entrada
            </button>
          </form>
        </div>
      </div>

      {/* Tabla de entradas */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-slate-200 font-semibold text-sm">
            Entradas Recientes — {getBrandName(activeSlug)} / {platformLabel[selectedPlatform] ?? selectedPlatform}
          </h3>
          <span className="text-xs text-slate-500">{filteredEntries.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Entradas de gasto recientes">
            <thead>
              <tr className="border-b border-slate-700">
                {['Fecha', 'Gasto USD', localCurrencyLabel, 'Clics', 'Conversiones'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Sin entradas para este filtro.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{entry.date}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums font-medium">{formatUSD(entry.spend_usd)}</td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">
                      {formatLocal(entry.spend_usd, entry.brand_slug)}
                    </td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{formatNumber(entry.clicks)}</td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{entry.conversions}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
