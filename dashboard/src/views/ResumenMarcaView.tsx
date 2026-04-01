import { DollarSign, MousePointerClick, Target, TrendingUp, Globe } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { StatusBadge } from '@/components/StatusBadge'
import { brands, campaigns } from '@/data/mock-data'
import { formatUSD, formatPercent, formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ResumenMarcaViewProps {
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

const countryLabel: Record<string, string> = {
  COL: 'Colombia',
  ECU: 'Ecuador',
  RD: 'Rep. Dominicana',
  GUA: 'Guatemala',
  CRI: 'Costa Rica',
}

export function ResumenMarcaView({ brandSlug }: ResumenMarcaViewProps) {
  if (!brandSlug) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
        Selecciona una marca para ver el resumen.
      </div>
    )
  }

  const brand = brands.find((b) => b.slug === brandSlug)

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
        Marca no encontrada.
      </div>
    )
  }

  const brandCampaigns = campaigns.filter((c) => c.brand_slug === brandSlug)
  const budgetPercent = brand.budget_usd > 0 ? (brand.spent_usd / brand.budget_usd) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header de la marca */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-slate-100">{brand.name}</h2>
            <p className="text-sm text-slate-400">{brand.vertical}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {brand.countries.map((code) => (
                <span
                  key={code}
                  className="inline-flex items-center gap-1 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
                  aria-label={countryLabel[code] ?? code}
                >
                  <Globe size={11} aria-hidden="true" />
                  {countryLabel[code] ?? code}
                </span>
              ))}
            </div>
          </div>
          <StatusBadge status={brand.status} className="self-start" />
        </div>
      </div>

      {/* 4 MetricCards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
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
          subValue={brand.conversions === 0 ? 'Sin conversiones' : 'Total del periodo'}
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
          label={brand.roas > 0 ? 'ROAS' : 'Score Auditoria'}
          value={
            brand.roas > 0
              ? `${brand.roas.toFixed(2)}x`
              : brand.audit_score > 0
                ? `${brand.audit_score}/100`
                : '—'
          }
          subValue={
            brand.roas > 0
              ? 'Retorno sobre inversion'
              : brand.audit_score < 40 && brand.audit_score > 0
                ? 'Critico — requiere atencion'
                : brand.audit_score < 67
                  ? 'Regular'
                  : 'Buen estado'
          }
          icon={TrendingUp}
          accent={
            brand.roas > 0
              ? 'green'
              : brand.audit_score === 0
                ? 'default'
                : brand.audit_score < 40
                  ? 'red'
                  : brand.audit_score < 67
                    ? 'yellow'
                    : 'green'
          }
        />
      </div>

      {/* Barra de presupuesto */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-200 font-semibold text-sm">Presupuesto</h3>
          <span className="text-xs text-slate-400 tabular-nums">
            {formatUSD(brand.spent_usd)} / {formatUSD(brand.budget_usd)}
          </span>
        </div>
        {brand.budget_usd > 0 ? (
          <>
            <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  budgetPercent < 30
                    ? 'bg-blue-500'
                    : budgetPercent < 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500',
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
          </>
        ) : (
          <p className="text-xs text-slate-500">Sin presupuesto asignado</p>
        )}
      </div>

      {/* Tabla de campanas */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700">
          <h3 className="text-slate-200 font-semibold text-sm">
            Campanas ({brandCampaigns.length})
          </h3>
        </div>
        {brandCampaigns.length === 0 ? (
          <div className="px-5 py-8 text-center text-slate-500 text-sm">
            Sin campanas configuradas para esta marca.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label={`Campanas de ${brand.name}`}>
              <thead>
                <tr className="border-b border-slate-700">
                  {['', 'Campana', 'Plataforma', 'Gasto', 'CTR', 'CPC', 'Conv.', 'Estado'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {brandCampaigns.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
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
                        {c.spent_usd > 0 ? formatUSD(c.spent_usd) : '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-300 tabular-nums text-xs">
                        {c.ctr > 0 ? formatPercent(c.ctr) : '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-300 tabular-nums text-xs">
                        {c.cpc > 0 ? formatUSD(c.cpc) : '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-300 tabular-nums text-xs">{c.conversions}</p>
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

      {/* Plataformas activas */}
      {brand.platforms.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h3 className="text-slate-200 font-semibold text-sm mb-3">Plataformas Activas</h3>
          <div className="flex flex-wrap gap-2">
            {brand.platforms.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-1.5 text-xs bg-blue-500/15 text-blue-300 border border-blue-500/25 px-3 py-1.5 rounded-lg font-medium"
                aria-label={platformLabel[p.name] ?? p.name}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  aria-hidden="true"
                />
                {platformLabel[p.name] ?? p.name}
                <span className="text-blue-400/70 ml-1">{formatUSD(p.spent_usd)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
