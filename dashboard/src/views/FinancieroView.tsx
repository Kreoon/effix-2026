import { useState } from 'react'
import { Download } from 'lucide-react'
import { spendEntries, brands, countryCurrencies, type SpendEntry } from '@/data/mock-data'
import { formatUSD, formatNumber } from '@/lib/utils'

const platformLabel: Record<string, string> = {
  'google-ads': 'Google Ads',
  'meta-ads': 'Meta Ads',
  'tiktok-ads': 'TikTok Ads',
}

const months = [
  { value: '2026-03', label: 'Marzo 2026' },
]

function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug)
}

function getBrandName(slug: string): string {
  return getBrand(slug)?.name ?? slug
}

function getPrimaryCountry(slug: string): string {
  return getBrand(slug)?.countries[0] ?? 'COL'
}

function getLocalAmount(usd: number, country: string): { amount: number; symbol: string; currency: string; trm: number } {
  const info = countryCurrencies[country] ?? countryCurrencies['COL']
  return {
    amount: Math.round(usd * info.trm),
    symbol: info.symbol,
    currency: info.currency,
    trm: info.trm,
  }
}

function formatLocal(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString('es-CO')}`
}

function generateReference(entry: SpendEntry): string {
  const d = entry.date.replace(/-/g, '')
  const brand = entry.brand_slug.slice(0, 3).toUpperCase()
  const plat = entry.platform.slice(0, 2).toUpperCase()
  return `${brand}-${plat}-${d}`
}

function downloadCSV(entries: SpendEntry[]) {
  const headers = ['Fecha', 'Marca', 'Pais', 'Plataforma', 'USD', 'TRM', 'Moneda Local', 'Monto Local', 'Clics', 'Conversiones', 'Referencia']
  const rows = entries.map((e) => {
    const country = getPrimaryCountry(e.brand_slug)
    const local = getLocalAmount(e.spend_usd, country)
    return [
      e.date,
      getBrandName(e.brand_slug),
      country,
      platformLabel[e.platform] ?? e.platform,
      e.spend_usd.toFixed(2),
      local.trm,
      local.currency,
      local.amount,
      e.clicks,
      e.conversions,
      generateReference(e),
    ]
  })
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reporte-financiero-grupo-effi.csv'
  a.click()
  URL.revokeObjectURL(url)
}

interface FinancieroViewProps {
  brandSlug?: string
}

export function FinancieroView({ brandSlug }: FinancieroViewProps) {
  const [selectedBrand, setSelectedBrand] = useState('todos')
  const [selectedMonth, setSelectedMonth] = useState('2026-03')

  // Si brandSlug viene del sidebar, usarlo como filtro fijo; si no, usar el selector interno
  const activeBrandFilter = brandSlug ?? (selectedBrand === 'todos' ? undefined : selectedBrand)

  // Moneda principal de la marca seleccionada (para mostrar en leyenda)
  const brandCountry = brandSlug ? getPrimaryCountry(brandSlug) : undefined
  const brandCurrency = brandCountry ? (countryCurrencies[brandCountry] ?? countryCurrencies['COL']) : null

  const filtered = spendEntries.filter((e) => {
    const matchBrand = activeBrandFilter ? e.brand_slug === activeBrandFilter : true
    const matchMonth = e.date.startsWith(selectedMonth)
    return matchBrand && matchMonth
  })

  const totalUSD = filtered.reduce((s, e) => s + e.spend_usd, 0)
  const totalClicks = filtered.reduce((s, e) => s + e.clicks, 0)
  const totalConversions = filtered.reduce((s, e) => s + e.conversions, 0)

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Selector de marca: solo visible cuando no hay brandSlug del sidebar */}
        {!brandSlug && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium" htmlFor="filter-brand">Marca</label>
            <select
              id="filter-brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="todos">Todas las marcas</option>
              {brands
                .filter((b) => b.spent_usd > 0)
                .map((b) => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
            </select>
          </div>
        )}

        {/* Badge de marca activa cuando viene del sidebar */}
        {brandSlug && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Marca</span>
            <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg px-3 py-2 text-sm font-medium">
              {getBrandName(brandSlug)}
            </span>
            {brandCurrency && (
              <span className="text-xs text-slate-500">
                {brandCurrency.currency} ({brandCurrency.symbol})
                {brandCurrency.trm !== 1 && ` · TRM ${formatNumber(brandCurrency.trm)}`}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium" htmlFor="filter-month">Periodo</label>
          <select
            id="filter-month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => downloadCSV(filtered)}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          aria-label="Exportar reporte a CSV"
        >
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Tabla financiera">
            <thead>
              <tr className="border-b border-slate-700">
                {['Fecha', 'Marca', 'Pais', 'Plataforma', 'USD', 'TRM', 'Moneda Local', 'Clics', 'Conv.', 'Ref.'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
                    Sin registros para el filtro seleccionado.
                  </td>
                </tr>
              ) : (
                filtered.map((entry, i) => {
                  const country = getPrimaryCountry(entry.brand_slug)
                  const local = getLocalAmount(entry.spend_usd, country)
                  return (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 text-slate-300 tabular-nums whitespace-nowrap">{entry.date}</td>
                      <td className="px-4 py-3 text-slate-200 whitespace-nowrap">{getBrandName(entry.brand_slug)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{country}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                          {platformLabel[entry.platform] ?? entry.platform}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-200 tabular-nums">{formatUSD(entry.spend_usd)}</td>
                      <td className="px-4 py-3 text-slate-400 tabular-nums">{formatNumber(local.trm)}</td>
                      <td className="px-4 py-3 text-slate-200 tabular-nums">
                        {formatLocal(local.amount, local.symbol)}
                        <span className="text-slate-500 text-xs ml-1">{local.currency}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 tabular-nums">{formatNumber(entry.clicks)}</td>
                      <td className="px-4 py-3 text-slate-300 tabular-nums">{entry.conversions}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{generateReference(entry)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>

            {filtered.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-slate-600 bg-slate-700/50">
                  <td colSpan={4} className="px-4 py-3 text-slate-300 font-semibold text-xs uppercase">
                    Total ({filtered.length} registros)
                  </td>
                  <td className="px-4 py-3 text-slate-100 font-bold tabular-nums">{formatUSD(totalUSD)}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">—</td>
                  <td className="px-4 py-3 text-slate-400 text-xs italic">Ver por marca</td>
                  <td className="px-4 py-3 text-slate-200 font-semibold tabular-nums">{formatNumber(totalClicks)}</td>
                  <td className="px-4 py-3 text-slate-200 font-semibold tabular-nums">{totalConversions}</td>
                  <td className="px-4 py-3" />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Leyenda monedas — solo cuando no hay brandSlug fijo */}
      {!brandSlug && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Monedas por pais</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(countryCurrencies).map(([code, info]) => (
              <div key={code} className="text-xs text-slate-400">
                <span className="font-medium text-slate-300">{code}</span>
                {' — '}
                {info.currency} ({info.symbol})
                {info.trm !== 1 && <span className="text-slate-500"> TRM: {formatNumber(info.trm)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
