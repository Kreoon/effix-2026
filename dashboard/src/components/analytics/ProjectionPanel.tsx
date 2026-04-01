import { useState } from 'react'
import { TrendingUp, Calculator } from 'lucide-react'
import type { Projection, MonthlyData } from '@/data/analytics-helpers'
import { estimateBudget } from '@/data/analytics-helpers'

interface ProjectionPanelProps {
  projection: Projection
  monthly2025: MonthlyData[]
  total2025: number
}

const CONFIDENCE_COLOR: Record<string, string> = {
  baja: 'text-red-400 bg-red-500/10 border-red-500/30',
  media: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  alta: 'text-green-400 bg-green-500/10 border-green-500/30',
}

function formatCOP(value: number): string {
  if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(1) + 'M'
  return '$' + Math.round(value).toLocaleString('es-CO')
}

export function ProjectionPanel({ projection, monthly2025, total2025 }: ProjectionPanelProps) {
  const [targetQty, setTargetQty] = useState<number>(5000)

  const budget = estimateBudget(targetQty, monthly2025)
  const topMonths = budget.monthlyDistribution
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 5)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-6">
      {/* Proyeccion automatica */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-orange-400" />
          <h3 className="text-sm font-semibold text-slate-200">Proyeccion 2026</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CONFIDENCE_COLOR[projection.confidence]}`}
          >
            Confianza {projection.confidence}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Real 2025</p>
            <p className="text-lg font-bold text-blue-400 tabular-nums">
              {total2025.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-slate-500">boletas</p>
          </div>
          <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Proyectado 2026</p>
            <p className="text-lg font-bold text-orange-400 tabular-nums">
              {projection.projected_quantity.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-slate-500">boletas</p>
          </div>
          <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Revenue proyectado</p>
            <p className="text-base font-bold text-slate-100 tabular-nums">
              {formatCOP(projection.projected_revenue)}
            </p>
          </div>
          <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">vs Feria 2025</p>
            <p
              className={`text-base font-bold tabular-nums ${
                projection.pct_of_2025 >= 1
                  ? 'text-green-400'
                  : projection.pct_of_2025 >= 0.7
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {(projection.pct_of_2025 * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-slate-500">del total 2025</p>
          </div>
        </div>
      </div>

      {/* Estimador de presupuesto */}
      <div className="border-t border-slate-700 pt-5">
        <div className="flex items-center gap-2 mb-3">
          <Calculator size={14} className="text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-200">Estimador de presupuesto</h3>
        </div>

        <div className="mb-4">
          <label
            htmlFor="target-qty"
            className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block"
          >
            Meta de boletas
          </label>
          <div className="flex items-center gap-2">
            <input
              id="target-qty"
              type="number"
              min={1}
              max={50000}
              step={100}
              value={targetQty}
              onChange={(e) => setTargetQty(Math.max(1, Number(e.target.value)))}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 w-32 tabular-nums focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Meta de boletas a vender"
            />
            <span className="text-xs text-slate-500">boletas objetivo</span>
          </div>
        </div>

        {budget.totalBudget > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 text-center">
                <p className="text-xs text-blue-400 mb-1">Presupuesto total</p>
                <p className="text-sm font-bold text-blue-300 tabular-nums">
                  {formatCOP(budget.totalBudget)}
                </p>
              </div>
              <div className="bg-slate-700/40 border border-slate-700 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500 mb-1">CPA esperado</p>
                <p className="text-sm font-bold text-slate-100 tabular-nums">
                  {formatCOP(budget.totalBudget / targetQty)}
                </p>
              </div>
              <div className="bg-slate-700/40 border border-slate-700 rounded-lg p-2.5 text-center">
                <p className="text-xs text-slate-500 mb-1">ROAS esperado</p>
                <p className="text-sm font-bold text-slate-100 tabular-nums">
                  {budget.expectedRoas.toFixed(2)}x
                </p>
              </div>
            </div>

            {topMonths.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-medium">
                  Top distribucion mensual
                </p>
                <div className="space-y-1.5">
                  {topMonths.map((m) => (
                    <div key={m.monthOffset} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 w-24 truncate">{m.monthLabel}</span>
                      <div className="flex-1 mx-2 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (m.budget / budget.totalBudget) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-slate-200 font-medium tabular-nums w-16 text-right">
                        {formatCOP(m.budget)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-xs text-slate-500">
            Sin datos historicos suficientes para estimar el presupuesto.
          </p>
        )}
      </div>
    </div>
  )
}
