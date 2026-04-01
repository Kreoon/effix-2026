import { useState } from 'react'
import { DollarSign, MousePointerClick, Target, TrendingUp, ShieldCheck } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { BrandSelector } from '@/components/BrandSelector'
import { MetricCard } from '@/components/MetricCard'
import { StatusBadge } from '@/components/StatusBadge'
import { brands, campaigns, spendEntries } from '@/data/mock-data'
import { formatUSD, formatPercent, formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface MarcaViewProps {
  /** Cuando viene del sidebar, el slug de la marca activa. Si es undefined, muestra el selector. */
  brandSlug?: string
}

const healthDot: Record<string, string> = {
  verde: 'bg-green-500',
  amarillo: 'bg-yellow-500',
  rojo: 'bg-red-500',
}

const platformLabel: Record<string, string> = {
  'google-ads': 'Google Ads',
  'meta-ads': 'Meta Ads',
  'tiktok-ads': 'TikTok Ads',
}

const WEEK_LABELS = ['03 Mar', '10 Mar', '17 Mar', '24 Mar']

export function MarcaView({ brandSlug }: MarcaViewProps) {
  const activeBrands = brands.filter((b) => b.status !== 'sin-campanas')

  // Si viene slug desde el sidebar, no hace falta estado interno
  const [internalSlug, setInternalSlug] = useState(activeBrands[0]?.slug ?? '')

  // El slug efectivo: el del sidebar tiene prioridad
  const effectiveSlug = brandSlug ?? internalSlug
  const showSelector = !brandSlug

  const brand = brands.find((b) => b.slug === effectiveSlug)
  const brandCampaigns = campaigns.filter((c) => c.brand_slug === effectiveSlug)
  const brandEntries = spendEntries.filter((e) => e.brand_slug === effectiveSlug)

  // Gasto semanal agrupado por fecha
  const weeklyData = WEEK_LABELS.map((label, i) => {
    const dateKeys = ['2026-03-03', '2026-03-10', '2026-03-17', '2026-03-24']
    const weekEntries = brandEntries.filter((e) => e.date === dateKeys[i])
    const total = weekEntries.reduce((s, e) => s + e.spend_usd, 0)
    return { semana: label, gasto: total }
  })

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500">
        Selecciona una marca para ver el detalle.
      </div>
    )
  }

  const budgetPercent = brand.budget_usd > 0 ? (brand.spent_usd / brand.budget_usd) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Selector — solo visible cuando no viene slug del sidebar */}
      {showSelector && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 whitespace-nowrap">Marca seleccionada</span>
          <BrandSelector
            value={internalSlug}
            onChange={setInternalSlug}
            className="w-64"
          />
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <MetricCard
          label="Gasto"
          value={formatUSD(brand.spent_usd)}
          subValue={`de ${formatUSD(brand.budget_usd)} presupuesto`}
          icon={DollarSign}
          accent="blue"
        />
        <MetricCard
          label="Conversiones"
          value={brand.conversions > 0 ? formatNumber(brand.conversions) : '0'}
          subValue={brand.conversions === 0 ? 'Sin conversiones registradas' : 'Total del periodo'}
          icon={Target}
          accent={brand.conversions > 0 ? 'green' : 'red'}
        />
        <MetricCard
          label="CPA"
          value={brand.cpa > 0 ? formatUSD(brand.cpa) : '—'}
          subValue="Costo por adquisicion"
          icon={MousePointerClick}
          accent="yellow"
        />
        <MetricCard
          label="ROAS"
          value={brand.roas > 0 ? `${brand.roas.toFixed(2)}x` : '—'}
          subValue="Retorno sobre inversion"
          icon={TrendingUp}
          accent="default"
        />
        <MetricCard
          label="Score Auditoria"
          value={brand.audit_score > 0 ? `${brand.audit_score}/100` : '—'}
          subValue={brand.audit_score < 40 ? 'Critico' : brand.audit_score < 67 ? 'Regular' : 'Bueno'}
          icon={ShieldCheck}
          accent={
            brand.audit_score === 0
              ? 'default'
              : brand.audit_score < 40
                ? 'red'
                : brand.audit_score < 67
                  ? 'yellow'
                  : 'green'
          }
        />
      </div>

      {/* Progreso presupuesto */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-200 font-semibold text-sm">Progreso de Presupuesto</h3>
          <span className="text-xs text-slate-400 tabular-nums">
            {formatUSD(brand.spent_usd)} / {formatUSD(brand.budget_usd)}
          </span>
        </div>
        <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              budgetPercent < 30 ? 'bg-blue-500' : budgetPercent < 75 ? 'bg-yellow-500' : 'bg-red-500',
            )}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
            role="progressbar"
            aria-valuenow={Math.round(budgetPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Presupuesto ejecutado: ${budgetPercent.toFixed(1)}%`}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">{budgetPercent.toFixed(1)}% ejecutado</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Campanas */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700">
            <h3 className="text-slate-200 font-semibold text-sm">
              Campanas ({brandCampaigns.length})
            </h3>
          </div>
          {brandCampaigns.length === 0 ? (
            <div className="px-5 py-8 text-center text-slate-500 text-sm">
              Sin campanas configuradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Campanas activas">
                <thead>
                  <tr className="border-b border-slate-700">
                    {['', 'Campana', 'Plataforma', 'CPC', 'CTR', 'Conv.', 'Estado'].map((h) => (
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
                  {brandCampaigns.map((c, i) => (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div
                          className={cn('h-2 w-2 rounded-full', healthDot[c.health])}
                          aria-label={`Salud: ${c.health}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-200 whitespace-nowrap text-xs">{c.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                          {platformLabel[c.platform] ?? c.platform}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-300 tabular-nums text-xs">
                          {c.cpc > 0 ? formatUSD(c.cpc) : '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-300 tabular-nums text-xs">
                          {c.ctr > 0 ? formatPercent(c.ctr) : '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-300 tabular-nums text-xs">
                          {c.conversions}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Grafica semanal */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h3 className="text-slate-200 font-semibold text-sm mb-4">Gasto Semanal (USD)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData} margin={{ left: 0, right: 16, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="semana" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0', fontSize: 12 }}
                itemStyle={{ color: '#60a5fa', fontSize: 12 }}
                formatter={(v) => [formatUSD(Number(v ?? 0)), 'Gasto']}
              />
              <Line
                type="monotone"
                dataKey="gasto"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plataformas */}
      {brand.platforms.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700">
            <h3 className="text-slate-200 font-semibold text-sm">Desglose por Plataforma</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Plataformas">
              <thead>
                <tr className="border-b border-slate-700">
                  {['Plataforma', 'Gasto', 'Clics', 'Conv.', 'CTR', 'CPC', 'CPA', 'ROAS'].map((h) => (
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
                {brand.platforms.map((p) => (
                  <tr key={p.name} className="border-b border-slate-700/50">
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded font-medium">
                        {platformLabel[p.name] ?? p.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{formatUSD(p.spent_usd)}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{formatNumber(p.clicks)}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{p.conversions}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{formatPercent(p.ctr)}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{formatUSD(p.cpc)}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">
                      {p.cpa > 0 ? formatUSD(p.cpa) : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">
                      {p.roas > 0 ? `${p.roas.toFixed(2)}x` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
