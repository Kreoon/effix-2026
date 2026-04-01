import { TrendingUp, Calendar, Target, Zap, DollarSign, BarChart2 } from 'lucide-react'
import type { Pattern } from '@/data/analytics-helpers'

interface PatternTableProps {
  patterns: Pattern[]
}

const ICONS = [TrendingUp, Calendar, BarChart2, DollarSign, Zap, Target]

export function PatternTable({ patterns }: PatternTableProps) {
  if (patterns.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex items-center justify-center">
        <p className="text-sm text-slate-500">Sin datos suficientes para detectar patrones</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-1">Patrones detectados</h3>
      <p className="text-xs text-slate-500 mb-4">Basado en el historial de datos filtrados</p>
      <div className="grid grid-cols-1 gap-3">
        {patterns.map((pattern, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <div
              key={pattern.label}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/40 border border-slate-700"
            >
              <div className="p-2 rounded-lg bg-slate-700 text-slate-400 flex-shrink-0 mt-0.5">
                <Icon size={13} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                  {pattern.label}
                </p>
                <p className="text-sm font-bold text-slate-100 mt-0.5 truncate">{pattern.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{pattern.insight}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
