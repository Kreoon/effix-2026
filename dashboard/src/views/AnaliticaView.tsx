import { useState, useMemo } from 'react'
import { GitCompare, Ticket, TrendingUp, Target, ArrowDownUp } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { SmartFiltersPanel } from '@/components/analytics/SmartFilters'
import { TimelineChart } from '@/components/analytics/TimelineChart'
import { MonthlyComparison } from '@/components/analytics/MonthlyComparison'
import { RoasComparison } from '@/components/analytics/RoasComparison'
import { PatternTable } from '@/components/analytics/PatternTable'
import { ProjectionPanel } from '@/components/analytics/ProjectionPanel'
import {
  getFeria2025Monthly,
  getFeria2026Monthly,
  calculateProjection,
  detectPatterns,
  applySmartFilters,
  type SmartFilters,
} from '@/data/analytics-helpers'
import { salesData2025, salesData2026, calculateTotals } from '@/data/sales-data'

const DEFAULT_FILTERS: SmartFilters = {
  minRoas: 0,
  minQuantity: 0,
  minSpend: 0,
  ticketTypes: ['vip', 'tres_dias', 'un_dia'],
  onlyWithSales: false,
}

// Slugs que tienen datos en esta vista (ferias con datos de boleteria comparativa)
const SUPPORTED_SLUGS = ['feria-effix', 'efficaex']

// Feria selector
type FeriaKey = '2025' | '2026' | 'ambas'

function formatCOP(value: number): string {
  if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(1) + 'M'
  return '$' + Math.round(value).toLocaleString('es-CO')
}

interface AnaliticaViewProps {
  brandSlug?: string
}

export function AnaliticaView({ brandSlug }: AnaliticaViewProps) {
  // Si hay una marca que no tiene datos de analitica comparativa de ferias, mostrar aviso
  if (brandSlug && !SUPPORTED_SLUGS.includes(brandSlug)) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center max-w-md">
          <p className="text-slate-400 text-sm">
            Sin datos de analitica para esta marca.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Esta vista muestra analitica comparativa de boleteria Feria Effix 2025 vs 2026.
          </p>
        </div>
      </div>
    )
  }

  return <AnaliticaContent />
}

function AnaliticaContent() {
  const [filters, setFilters] = useState<SmartFilters>(DEFAULT_FILTERS)
  const [activeFerias, setActiveFerias] = useState<Set<FeriaKey>>(new Set(['2025', '2026']))

  // Datos mensuales sin filtrar (para proyeccion y graficas comparativas)
  const monthly2025All = useMemo(() => getFeria2025Monthly(), [])
  const monthly2026All = useMemo(() => getFeria2026Monthly(), [])

  // Datos filtrados para tabla y patrones
  const filtered2025 = useMemo(
    () =>
      activeFerias.has('2025') ? applySmartFilters(salesData2025, filters) : [],
    [filters, activeFerias],
  )
  const filtered2026 = useMemo(
    () =>
      activeFerias.has('2026') ? applySmartFilters(salesData2026, filters) : [],
    [filters, activeFerias],
  )

  const totals2025 = useMemo(() => calculateTotals(salesData2025), [])
  const totals2026 = useMemo(() => calculateTotals(salesData2026), [])
  const projection = useMemo(
    () => calculateProjection(monthly2025All, monthly2026All),
    [monthly2025All, monthly2026All],
  )

  const combinedFiltered = useMemo(
    () => [...filtered2025, ...filtered2026],
    [filtered2025, filtered2026],
  )
  const patterns = useMemo(() => detectPatterns(combinedFiltered), [combinedFiltered])

  // Gap: diferencia entre proyectado y 2025
  const gap = projection.projected_quantity - totals2025.totalQuantity

  const toggleFeria = (key: FeriaKey) => {
    setActiveFerias((prev) => {
      const next = new Set(prev)
      if (next.has(key) && next.size === 1) return prev // Al menos una activa
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <GitCompare size={18} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Analitica Comparativa</h1>
            <p className="text-xs text-slate-500 mt-0.5">Feria 2025 vs Feria 2026 — datos reales</p>
          </div>
        </div>

        {/* Feria selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Mostrar:</span>
          {(
            [
              { key: '2025' as FeriaKey, label: 'Feria 2025', color: 'blue' },
              { key: '2026' as FeriaKey, label: 'Feria 2026', color: 'orange' },
            ] as { key: FeriaKey; label: string; color: string }[]
          ).map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => toggleFeria(key)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                activeFerias.has(key)
                  ? color === 'blue'
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
              aria-pressed={activeFerias.has(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label="Feria 2025"
          value={totals2025.totalQuantity.toLocaleString('es-CO')}
          subValue={`Revenue: ${formatCOP(totals2025.totalRevenue)}`}
          icon={Ticket}
          accent="blue"
          trend="neutral"
          trendLabel={`ROAS ${totals2025.roas.toFixed(2)}x`}
        />
        <MetricCard
          label="Feria 2026"
          value={totals2026.totalQuantity.toLocaleString('es-CO')}
          subValue={`Revenue: ${formatCOP(totals2026.totalRevenue)}`}
          icon={Ticket}
          accent="default"
          trend="neutral"
          trendLabel={`ROAS ${totals2026.roas.toFixed(2)}x`}
        />
        <MetricCard
          label="Proyeccion 2026"
          value={projection.projected_quantity.toLocaleString('es-CO')}
          subValue={`Confianza: ${projection.confidence}`}
          icon={TrendingUp}
          accent={
            projection.pct_of_2025 >= 1
              ? 'green'
              : projection.pct_of_2025 >= 0.7
              ? 'yellow'
              : 'red'
          }
          trend={
            projection.pct_of_2025 >= 1 ? 'up' : projection.pct_of_2025 >= 0.7 ? 'neutral' : 'down'
          }
          trendLabel={`${(projection.pct_of_2025 * 100).toFixed(1)}% del 2025`}
        />
        <MetricCard
          label="Gap vs 2025"
          value={`${gap >= 0 ? '+' : ''}${gap.toLocaleString('es-CO')}`}
          subValue={`Proyectado vs real 2025`}
          icon={gap >= 0 ? Target : ArrowDownUp}
          accent={gap >= 0 ? 'green' : 'red'}
          trend={gap >= 0 ? 'up' : 'down'}
          trendLabel={gap >= 0 ? 'Por encima del 2025' : 'Por debajo del 2025'}
        />
      </div>

      {/* Smart Filters */}
      <SmartFiltersPanel filters={filters} onChange={setFilters} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TimelineChart data2025={monthly2025All} data2026={monthly2026All} />
        <MonthlyComparison data2025={monthly2025All} data2026={monthly2026All} />
      </div>

      {/* ROAS full width */}
      <RoasComparison data2025={monthly2025All} data2026={monthly2026All} />

      {/* Patrones y proyeccion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PatternTable patterns={patterns} />
        <ProjectionPanel
          projection={projection}
          monthly2025={monthly2025All}
          total2025={totals2025.totalQuantity}
        />
      </div>

      {/* Tabla detallada */}
      <DetailTable data2025={filtered2025} data2026={filtered2026} />
    </div>
  )
}

// Tabla detallada
interface DetailTableProps {
  data2025: ReturnType<typeof applySmartFilters>
  data2026: ReturnType<typeof applySmartFilters>
}

function DetailTable({ data2025, data2026 }: DetailTableProps) {
  type RowEntry = {
    date: string
    feria: '2025' | '2026'
    quantity: number
    revenue_cop: number
    ad_spend_cop: number
    vip: number
    tres_dias: number
    un_dia: number
    roas: number
  }

  const rows: RowEntry[] = [
    ...data2025.map((e) => ({ ...e, feria: '2025' as const })),
    ...data2026.map((e) => ({ ...e, feria: '2026' as const })),
  ]
    .filter((r) => r.quantity > 0 || r.ad_spend_cop > 0)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 100)

  if (rows.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <p className="text-sm text-slate-500">Sin registros con los filtros actuales</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Datos detallados</h3>
        <span className="text-xs text-slate-500">
          {rows.length} registros (max 100, ordenados por fecha)
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900/50">
              <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Fecha</th>
              <th className="text-left px-3 py-2.5 text-slate-500 font-medium">Feria</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Boletas</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">VIP</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">3 Dias</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">1 Dia</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Revenue</th>
              <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Inversion</th>
              <th className="text-right px-4 py-2.5 text-slate-500 font-medium">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const roasColor =
                row.roas >= 3
                  ? 'text-green-400'
                  : row.roas >= 1
                  ? 'text-yellow-400'
                  : row.roas > 0
                  ? 'text-red-400'
                  : 'text-slate-600'
              return (
                <tr
                  key={`${row.feria}-${row.date}-${i}`}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-4 py-2 text-slate-400 tabular-nums">{row.date}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.feria === '2025'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-orange-500/15 text-orange-400'
                      }`}
                    >
                      {row.feria}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right text-slate-200 font-semibold tabular-nums">
                    {row.quantity > 0 ? row.quantity.toLocaleString('es-CO') : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-400 tabular-nums">
                    {row.vip > 0 ? row.vip : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-400 tabular-nums">
                    {row.tres_dias > 0 ? row.tres_dias : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-400 tabular-nums">
                    {row.un_dia > 0 ? row.un_dia : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-300 tabular-nums">
                    {row.revenue_cop > 0 ? formatCOP(row.revenue_cop) : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-400 tabular-nums">
                    {row.ad_spend_cop > 0 ? formatCOP(row.ad_spend_cop) : '—'}
                  </td>
                  <td className={`px-4 py-2 text-right font-semibold tabular-nums ${roasColor}`}>
                    {row.roas > 0 ? `${row.roas.toFixed(2)}x` : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
