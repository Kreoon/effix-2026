import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useStrategies } from '@/hooks/useStrategies'
import { useBudgets, useDeleteBudget } from '@/hooks/useBudgets'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { BudgetForm } from '@/components/cms/BudgetForm'
import { formatUsd, formatDate, PLATFORM_LABEL } from '@/lib/cms'
import type { AdPlatform, CmsBrand, CmsBudget } from '@/types/cms'

export function BrandBudgetTab({ brand, currentCountry }: { brand: CmsBrand; currentCountry?: string }) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({
    brandSlug: brand.slug,
    pais: currentCountry,
  })
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const effectiveStrategy = selectedStrategy || strategies[0]?.id || null
  const { data: budgets = [], isLoading } = useBudgets(effectiveStrategy)
  const deleteMut = useDeleteBudget()

  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<CmsBudget | null>(null)

  async function handleDelete(b: CmsBudget) {
    if (!confirm(`¿Borrar el presupuesto de ${b.platform}?`)) return
    await deleteMut.mutateAsync({ id: b.id, strategyId: b.strategy_id })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Presupuesto</h2>
          <p className="text-sm text-slate-600">Distribución por plataforma y período.</p>
        </div>
        <div className="flex items-center gap-2">
          {strategies.length > 0 && (
            <select
              value={effectiveStrategy ?? ''}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              {strategies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          )}
          {isAdmin && effectiveStrategy && (
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35]"
            >
              <Plus size={14} /> Nuevo presupuesto
            </button>
          )}
        </div>
      </div>

      {strategies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Creá una estrategia primero para asignarle presupuesto.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="text-left px-4 py-2.5">Plataforma</th>
                <th className="text-left px-4 py-2.5">Período</th>
                <th className="text-right px-4 py-2.5">USD</th>
                <th className="text-right px-4 py-2.5">Local</th>
                <th className="text-left px-4 py-2.5">Moneda</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    Cargando...
                  </td>
                </tr>
              )}
              {!isLoading && budgets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    Sin presupuestos asignados. Creá el primero.
                  </td>
                </tr>
              )}
              {budgets.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-[#0E2A47]">
                    {PLATFORM_LABEL[b.platform as AdPlatform] ?? b.platform}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {formatDate(b.period_start)} → {formatDate(b.period_end)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-[#0E2A47]">
                    {formatUsd(b.amount_usd)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#1A1A1A]">
                    {b.amount_local ? b.amount_local.toLocaleString('es-CR') : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 font-medium">{b.currency}</td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditing(b)}
                          className="text-slate-400 hover:text-[#0E2A47]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => void handleDelete(b)}
                          className="text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {budgets.length > 0 && (
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="px-4 py-2.5 font-medium text-[#0E2A47]">
                    Total
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums">
                    {formatUsd(budgets.reduce((acc, b) => acc + Number(b.amount_usd || 0), 0))}
                  </td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {creating && effectiveStrategy && (
        <BudgetForm
          strategyId={effectiveStrategy}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <BudgetForm
          budget={editing}
          strategyId={editing.strategy_id}
          onSaved={() => setEditing(null)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
