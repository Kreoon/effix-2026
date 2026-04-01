import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts'
import type { MonthlyData } from '@/data/analytics-helpers'

interface MonthlyComparisonProps {
  data2025: MonthlyData[]
  data2026: MonthlyData[]
}

interface ChartRow {
  offsetLabel: string
  monthOffset: number
  qty2025: number
  qty2026: number
}

function buildChartData(data2025: MonthlyData[], data2026: MonthlyData[]): ChartRow[] {
  const allOffsets = Array.from(
    new Set([...data2025.map((m) => m.monthOffset), ...data2026.map((m) => m.monthOffset)]),
  ).sort((a, b) => a - b)

  const map2025 = new Map(data2025.map((m) => [m.monthOffset, m]))
  const map2026 = new Map(data2026.map((m) => [m.monthOffset, m]))

  return allOffsets.map((offset) => ({
    offsetLabel: offset === 0 ? 'Evento' : `${offset}m`,
    monthOffset: offset,
    qty2025: map2025.get(offset)?.quantity ?? 0,
    qty2026: map2026.get(offset)?.quantity ?? 0,
  }))
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { name: string; value: number }[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs shadow-xl">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.name === 'Feria 2025' ? '#3b82f6' : '#f97316' }}
            />
            <span className="text-slate-400">{p.name}</span>
          </div>
          <span className="text-slate-100 font-semibold tabular-nums">
            {p.value.toLocaleString('es-CO')}
          </span>
        </div>
      ))}
    </div>
  )
}

export function MonthlyComparison({ data2025, data2026 }: MonthlyComparisonProps) {
  const chartData = buildChartData(data2025, data2026)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">Ventas mensuales comparadas</h3>
      <p className="text-xs text-slate-500 mb-4">Boletas vendidas por mes relativo al evento</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 16, right: 10, left: 0, bottom: 5 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} vertical={false} />
          <XAxis
            dataKey="offsetLabel"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="qty2025" name="Feria 2025" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={32}>
            <LabelList
              dataKey="qty2025"
              position="top"
              style={{ fill: '#3b82f6', fontSize: 10 }}
              formatter={(v: number) => (v > 0 ? v.toLocaleString('es-CO') : '')}
            />
          </Bar>
          <Bar dataKey="qty2026" name="Feria 2026" fill="#f97316" radius={[3, 3, 0, 0]} maxBarSize={32}>
            <LabelList
              dataKey="qty2026"
              position="top"
              style={{ fill: '#f97316', fontSize: 10 }}
              formatter={(v: number) => (v > 0 ? v.toLocaleString('es-CO') : '')}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-xs text-slate-400">Feria 2025</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-xs text-slate-400">Feria 2026</span>
        </div>
      </div>
    </div>
  )
}
