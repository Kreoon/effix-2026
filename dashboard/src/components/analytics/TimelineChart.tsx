import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import type { MonthlyData } from '@/data/analytics-helpers'

interface TimelineChartProps {
  data2025: MonthlyData[]
  data2026: MonthlyData[]
}

interface ChartRow {
  offsetLabel: string
  monthOffset: number
  label2025: string
  label2026: string
  cum2025: number | null
  cum2026: number | null
}

function buildChartData(data2025: MonthlyData[], data2026: MonthlyData[]): ChartRow[] {
  // Obtener todos los offsets presentes en cualquiera de los dos datasets
  const allOffsets = Array.from(
    new Set([...data2025.map((m) => m.monthOffset), ...data2026.map((m) => m.monthOffset)]),
  ).sort((a, b) => a - b)

  const map2025 = new Map(data2025.map((m) => [m.monthOffset, m]))
  const map2026 = new Map(data2026.map((m) => [m.monthOffset, m]))

  return allOffsets.map((offset) => {
    const m25 = map2025.get(offset)
    const m26 = map2026.get(offset)
    const label = offset === 0 ? 'Evento' : `${offset}m`
    return {
      offsetLabel: label,
      monthOffset: offset,
      label2025: m25?.monthLabel ?? '',
      label2026: m26?.monthLabel ?? '',
      cum2025: m25?.cumulative_quantity ?? null,
      cum2026: m26?.cumulative_quantity ?? null,
    }
  })
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { name: string; value: number; payload: ChartRow }[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const row = payload[0].payload

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs shadow-xl min-w-[180px]">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => {
        const is2025 = p.name === 'Feria 2025'
        const monthLabel = is2025 ? row.label2025 : row.label2026
        return (
          <div key={p.name} className="flex flex-col gap-0.5 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: is2025 ? '#3b82f6' : '#f97316' }}
              />
              <span className="text-slate-300 font-medium">{p.name}</span>
            </div>
            {monthLabel && <p className="text-slate-500 pl-4">{monthLabel}</p>}
            <p className="text-slate-100 pl-4 font-semibold tabular-nums">
              {p.value != null ? p.value.toLocaleString('es-CO') + ' boletas' : 'Sin datos'}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function TimelineChart({ data2025, data2026 }: TimelineChartProps) {
  const chartData = buildChartData(data2025, data2026)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">Curva acumulada de ventas</h3>
      <p className="text-xs text-slate-500 mb-4">Boletas acumuladas por mes relativo al evento</p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="fill2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fill2026" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
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
          <Area
            type="monotone"
            dataKey="cum2025"
            name="Feria 2025"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#fill2025)"
            connectNulls
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="cum2026"
            name="Feria 2026"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#fill2026)"
            connectNulls
            dot={false}
            activeDot={{ r: 4, fill: '#f97316', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded" />
          <span className="text-xs text-slate-400">Feria 2025</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-500 rounded" />
          <span className="text-xs text-slate-400">Feria 2026</span>
        </div>
      </div>
    </div>
  )
}
