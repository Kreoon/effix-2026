import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ReferenceLine,
} from 'recharts'
import type { MonthlyData } from '@/data/analytics-helpers'

interface RoasComparisonProps {
  data2025: MonthlyData[]
  data2026: MonthlyData[]
}

interface ChartRow {
  offsetLabel: string
  monthOffset: number
  roas2025: number | null
  roas2026: number | null
  label2025: string
  label2026: string
}

function buildChartData(data2025: MonthlyData[], data2026: MonthlyData[]): ChartRow[] {
  const allOffsets = Array.from(
    new Set([...data2025.map((m) => m.monthOffset), ...data2026.map((m) => m.monthOffset)]),
  ).sort((a, b) => a - b)

  const map2025 = new Map(data2025.map((m) => [m.monthOffset, m]))
  const map2026 = new Map(data2026.map((m) => [m.monthOffset, m]))

  return allOffsets.map((offset) => {
    const m25 = map2025.get(offset)
    const m26 = map2026.get(offset)
    return {
      offsetLabel: offset === 0 ? 'Evento' : `${offset}m`,
      monthOffset: offset,
      roas2025: m25 && m25.roas > 0 ? m25.roas : null,
      roas2026: m26 && m26.roas > 0 ? m26.roas : null,
      label2025: m25?.monthLabel ?? '',
      label2026: m26?.monthLabel ?? '',
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
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs shadow-xl min-w-[170px]">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => {
        const is2025 = p.name === 'ROAS 2025'
        const monthLabel = is2025 ? row.label2025 : row.label2026
        const roasColor =
          p.value >= 3 ? 'text-green-400' : p.value >= 1 ? 'text-yellow-400' : 'text-red-400'
        return (
          <div key={p.name} className="flex flex-col gap-0.5 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-0.5 rounded"
                style={{ backgroundColor: is2025 ? '#3b82f6' : '#f97316' }}
              />
              <span className="text-slate-400">{p.name}</span>
            </div>
            {monthLabel && <p className="text-slate-500 pl-4">{monthLabel}</p>}
            <p className={`pl-4 font-semibold tabular-nums ${roasColor}`}>
              {p.value != null ? `${p.value.toFixed(2)}x` : 'Sin datos'}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function RoasComparison({ data2025, data2026 }: RoasComparisonProps) {
  const chartData = buildChartData(data2025, data2026)

  // Calcular el maximo para dimensionar las zonas
  const allRoas = chartData
    .flatMap((d) => [d.roas2025, d.roas2026])
    .filter((v): v is number => v !== null)
  const maxRoas = allRoas.length > 0 ? Math.max(...allRoas, 5) : 5

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">ROAS comparativo</h3>
      <p className="text-xs text-slate-500 mb-4">
        Retorno sobre inversion publicitaria por mes
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          {/* Zonas de color como fondo */}
          <ReferenceArea y1={3} y2={maxRoas + 2} fill="#22c55e" fillOpacity={0.06} />
          <ReferenceArea y1={1} y2={3} fill="#eab308" fillOpacity={0.06} />
          <ReferenceArea y1={0} y2={1} fill="#ef4444" fillOpacity={0.08} />
          <ReferenceLine y={3} stroke="#22c55e" strokeDasharray="4 4" strokeOpacity={0.4} />
          <ReferenceLine y={1} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.4} />
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
            tickFormatter={(v: number) => `${v.toFixed(1)}x`}
            width={44}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="roas2025"
            name="ROAS 2025"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="roas2026"
            name="ROAS 2026"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ fill: '#f97316', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#f97316', strokeWidth: 0 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-3 justify-center flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded" />
          <span className="text-xs text-slate-400">ROAS 2025</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-500 rounded" />
          <span className="text-xs text-slate-400">ROAS 2026</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-green-500/20 border border-green-500/30" />
          <span className="text-xs text-slate-500">ROAS &gt; 3x (bueno)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500/20 border border-yellow-500/30" />
          <span className="text-xs text-slate-500">1x - 3x (aceptable)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-500/20 border border-red-500/30" />
          <span className="text-xs text-slate-500">&lt; 1x (perdida)</span>
        </div>
      </div>
    </div>
  )
}
