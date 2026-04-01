import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { TrendingUp, Ticket, DollarSign, BarChart2 } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import {
  salesData2025,
  salesData2026,
  getAvailableMonths,
  filterByMonth,
  calculateTotals,
  getMonthLabel,
  type SalesEntry,
} from '@/data/sales-data'

// Slugs que tienen datos en esta vista
const SUPPORTED_SLUGS = ['feria-effix', 'efficaex']

// ---- Helpers ----------------------------------------------------------------

function formatCOP(value: number): string {
  return '$' + Math.round(value).toLocaleString('es-CO')
}

function formatRoas(value: number): string {
  return value > 0 ? value.toFixed(2) + 'x' : '—'
}

function roasColor(roas: number): string {
  if (roas <= 0) return 'text-slate-500'
  if (roas >= 3) return 'text-green-400'
  if (roas >= 1) return 'text-yellow-400'
  return 'text-red-400'
}

function rowBgClass(entry: SalesEntry): string {
  if (entry.revenue_cop > 0 && entry.ad_spend_cop > 0) return 'bg-green-950/20'
  if (entry.revenue_cop > 0) return 'bg-green-950/20'
  if (entry.ad_spend_cop > 0) return 'bg-red-950/20'
  return ''
}

function variationClass(pct: number): string {
  if (pct > 0) return 'text-green-400'
  if (pct < 0) return 'text-red-400'
  return 'text-slate-400'
}

function variationLabel(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

function calcVariation(prev: number, curr: number): number {
  if (prev === 0) return curr > 0 ? 100 : 0
  return ((curr - prev) / prev) * 100
}

// ---- Dataset options --------------------------------------------------------

type DatasetKey = '2025' | '2026'

const DATASET_OPTIONS: { key: DatasetKey; label: string }[] = [
  { key: '2025', label: 'Boleteria 2025' },
  { key: '2026', label: 'Boleteria 2026' },
]

// ---- Tooltip personalizado --------------------------------------------------

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

function CustomAreaTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">Dia {label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="tabular-nums">
          {p.name}: {formatCOP(p.value)}
        </p>
      ))}
    </div>
  )
}

// ---- Pie tooltip ------------------------------------------------------------

interface PieTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: { percent: number } }>
}

function CustomPieTooltip({ active, payload }: PieTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const item = payload[0]
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-slate-200 font-medium">{item.name}</p>
      <p className="text-slate-400 tabular-nums">{item.value} boletas</p>
      <p className="text-slate-500">{(item.payload.percent * 100).toFixed(1)}%</p>
    </div>
  )
}

// ---- Props ------------------------------------------------------------------

interface SeguimientoViewProps {
  brandSlug?: string
}

// ---- Componente principal ---------------------------------------------------

export function SeguimientoView({ brandSlug }: SeguimientoViewProps) {
  // Si hay una marca seleccionada que no tiene datos de seguimiento, mostrar aviso
  if (brandSlug && !SUPPORTED_SLUGS.includes(brandSlug)) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center max-w-md">
          <p className="text-slate-400 text-sm">
            Sin datos de seguimiento para esta marca.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Esta vista muestra datos de boleteria de Feria Effix.
          </p>
        </div>
      </div>
    )
  }

  return <SeguimientoContent />
}

function SeguimientoContent() {
  const [dataset, setDataset] = useState<DatasetKey>('2026')

  const activeData: SalesEntry[] = dataset === '2025' ? salesData2025 : salesData2026

  const availableMonths = useMemo(() => getAvailableMonths(activeData), [activeData])

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const months2026 = getAvailableMonths(salesData2026)
    return months2026[months2026.length - 1] ?? ''
  })

  // Cuando cambia dataset, ajustar mes seleccionado si no existe en el nuevo set
  const resolvedMonth = availableMonths.includes(selectedMonth)
    ? selectedMonth
    : availableMonths[availableMonths.length - 1] ?? ''

  const monthEntries = useMemo(
    () => filterByMonth(activeData, resolvedMonth),
    [activeData, resolvedMonth],
  )

  const totals = useMemo(() => calculateTotals(monthEntries), [monthEntries])

  // Mes anterior para tabla comparativa
  const prevMonthIndex = availableMonths.indexOf(resolvedMonth) - 1
  const prevMonth = prevMonthIndex >= 0 ? availableMonths[prevMonthIndex] : null
  const prevEntries = useMemo(
    () => (prevMonth ? filterByMonth(activeData, prevMonth) : []),
    [activeData, prevMonth],
  )
  const prevTotals = useMemo(() => calculateTotals(prevEntries), [prevEntries])

  // Datos para grafica de area — agrupar por dia del mes
  const areaData = useMemo(() => {
    return monthEntries.map((e) => ({
      dia: Number(e.date.slice(8, 10)),
      Vendido: e.revenue_cop,
      'Gasto Ads': e.ad_spend_cop,
    }))
  }, [monthEntries])

  // Datos para pie chart
  const pieData = useMemo(() => {
    const { totalVip, totalTresDias, totalUnDia } = totals
    const entries = [
      { name: 'VIP', value: totalVip },
      { name: '3 Dias', value: totalTresDias },
      { name: '1 Dia', value: totalUnDia },
    ]
    return entries.filter((e) => e.value > 0)
  }, [totals])

  const PIE_COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b']

  const hasPieData = pieData.length > 0

  return (
    <div className="space-y-6">
      {/* Selectores */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium" htmlFor="sel-dataset">
            Dataset
          </label>
          <select
            id="sel-dataset"
            value={dataset}
            onChange={(e) => setDataset(e.target.value as DatasetKey)}
            className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {DATASET_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium" htmlFor="sel-month">
            Mes
          </label>
          <select
            id="sel-month"
            value={resolvedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {getMonthLabel(m)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* MetricCards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Vendido"
          value={formatCOP(totals.totalRevenue)}
          subValue="COP"
          icon={DollarSign}
          accent="green"
        />
        <MetricCard
          label="Total Boletas"
          value={totals.totalQuantity.toLocaleString('es-CO')}
          subValue={`VIP: ${totals.totalVip} | 3d: ${totals.totalTresDias} | 1d: ${totals.totalUnDia}`}
          icon={Ticket}
          accent="blue"
        />
        <MetricCard
          label="Gasto Ads"
          value={formatCOP(totals.totalSpend)}
          subValue="COP"
          icon={BarChart2}
          accent="red"
        />
        <MetricCard
          label="ROAS"
          value={formatRoas(totals.roas)}
          subValue={totals.roas >= 3 ? 'Excelente' : totals.roas >= 1 ? 'Aceptable' : totals.totalSpend > 0 ? 'Bajo' : 'Sin datos'}
          icon={TrendingUp}
          accent={totals.roas >= 3 ? 'green' : totals.roas >= 1 ? 'yellow' : totals.totalSpend > 0 ? 'red' : 'default'}
        />
      </div>

      {/* Grafica de area + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart — ocupa 2/3 */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">
            Vendido vs Gasto — {getMonthLabel(resolvedMonth)}
          </h3>
          {areaData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={areaData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradVendido" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradGasto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="dia"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(0)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                  }
                  width={52}
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="Vendido"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="url(#gradVendido)"
                />
                <Area
                  type="monotone"
                  dataKey="Gasto Ads"
                  stroke="#dc2626"
                  strokeWidth={2}
                  fill="url(#gradGasto)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-slate-500 text-sm">
              Sin datos para el mes seleccionado
            </div>
          )}
        </div>

        {/* Pie chart — ocupa 1/3 */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Desglose de boletas</h3>
          {hasPieData ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => (
                    <span style={{ color: '#94a3b8', fontSize: 11 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-slate-500 text-sm">
              Sin boletas en este periodo
            </div>
          )}
        </div>
      </div>

      {/* Tabla diaria */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300">
            Detalle diario — {getMonthLabel(resolvedMonth)}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Tabla diaria de ventas">
            <thead>
              <tr className="border-b border-slate-700">
                {['Dia', 'Vendido COP', 'Cantidad', 'VIP', '3 Dias', '1 Dia', 'Gasto Ads COP', 'ROAS'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {monthEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    Sin registros para el periodo seleccionado.
                  </td>
                </tr>
              ) : (
                monthEntries.map((entry, i) => {
                  const entryRoas = entry.ad_spend_cop > 0 ? entry.revenue_cop / entry.ad_spend_cop : 0
                  return (
                    <tr
                      key={i}
                      className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${rowBgClass(entry)}`}
                    >
                      <td className="px-4 py-3 text-slate-300 tabular-nums whitespace-nowrap font-medium">
                        {entry.date}
                      </td>
                      <td className="px-4 py-3 text-slate-200 tabular-nums whitespace-nowrap">
                        {entry.revenue_cop > 0 ? formatCOP(entry.revenue_cop) : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300 tabular-nums">
                        {entry.quantity > 0 ? entry.quantity : '—'}
                      </td>
                      <td className="px-4 py-3 text-violet-400 tabular-nums">
                        {entry.vip > 0 ? entry.vip : '—'}
                      </td>
                      <td className="px-4 py-3 text-blue-400 tabular-nums">
                        {entry.tres_dias > 0 ? entry.tres_dias : '—'}
                      </td>
                      <td className="px-4 py-3 text-yellow-400 tabular-nums">
                        {entry.un_dia > 0 ? entry.un_dia : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300 tabular-nums whitespace-nowrap">
                        {entry.ad_spend_cop > 0 ? formatCOP(entry.ad_spend_cop) : '—'}
                      </td>
                      <td className={`px-4 py-3 tabular-nums font-medium ${roasColor(entryRoas)}`}>
                        {entry.ad_spend_cop > 0 ? formatRoas(entryRoas) : '—'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>

            {monthEntries.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-slate-600 bg-slate-700/50">
                  <td className="px-4 py-3 text-slate-300 font-semibold text-xs uppercase whitespace-nowrap">
                    Total ({monthEntries.length} dias)
                  </td>
                  <td className="px-4 py-3 text-slate-100 font-bold tabular-nums whitespace-nowrap">
                    {formatCOP(totals.totalRevenue)}
                  </td>
                  <td className="px-4 py-3 text-slate-100 font-bold tabular-nums">
                    {totals.totalQuantity}
                  </td>
                  <td className="px-4 py-3 text-violet-300 font-bold tabular-nums">{totals.totalVip}</td>
                  <td className="px-4 py-3 text-blue-300 font-bold tabular-nums">{totals.totalTresDias}</td>
                  <td className="px-4 py-3 text-yellow-300 font-bold tabular-nums">{totals.totalUnDia}</td>
                  <td className="px-4 py-3 text-slate-100 font-bold tabular-nums whitespace-nowrap">
                    {formatCOP(totals.totalSpend)}
                  </td>
                  <td className={`px-4 py-3 font-bold tabular-nums ${roasColor(totals.roas)}`}>
                    {formatRoas(totals.roas)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Tabla comparativa con mes anterior */}
      {prevMonth && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300">
              Comparativa — {getMonthLabel(prevMonth)} vs {getMonthLabel(resolvedMonth)}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Tabla comparativa de meses">
              <thead>
                <tr className="border-b border-slate-700">
                  {['Metrica', getMonthLabel(prevMonth), getMonthLabel(resolvedMonth), 'Variacion'].map((h) => (
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
                {[
                  {
                    label: 'Vendido COP',
                    prev: formatCOP(prevTotals.totalRevenue),
                    curr: formatCOP(totals.totalRevenue),
                    pct: calcVariation(prevTotals.totalRevenue, totals.totalRevenue),
                  },
                  {
                    label: 'Boletas',
                    prev: prevTotals.totalQuantity.toString(),
                    curr: totals.totalQuantity.toString(),
                    pct: calcVariation(prevTotals.totalQuantity, totals.totalQuantity),
                  },
                  {
                    label: 'Gasto Ads COP',
                    prev: formatCOP(prevTotals.totalSpend),
                    curr: formatCOP(totals.totalSpend),
                    pct: calcVariation(prevTotals.totalSpend, totals.totalSpend),
                  },
                  {
                    label: 'ROAS',
                    prev: formatRoas(prevTotals.roas),
                    curr: formatRoas(totals.roas),
                    pct: calcVariation(prevTotals.roas, totals.roas),
                  },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 text-slate-300 font-medium">{row.label}</td>
                    <td className="px-4 py-3 text-slate-400 tabular-nums">{row.prev}</td>
                    <td className="px-4 py-3 text-slate-200 tabular-nums">{row.curr}</td>
                    <td className={`px-4 py-3 tabular-nums font-medium ${variationClass(row.pct)}`}>
                      {variationLabel(row.pct)}
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
