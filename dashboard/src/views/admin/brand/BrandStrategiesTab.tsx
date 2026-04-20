import { useState } from 'react'
import { Plus, Pencil } from 'lucide-react'
import { useStrategies } from '@/hooks/useStrategies'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { StatusPill } from '@/components/cms/StatusPill'
import { StrategyForm } from '@/components/cms/StrategyForm'
import { STRATEGY_STATUS_META, formatDate, formatUsd } from '@/lib/cms'
import type { CmsBrand, CmsStrategy } from '@/types/cms'

export function BrandStrategiesTab({ brand }: { brand: CmsBrand }) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [], isLoading } = useStrategies({ brandSlug: brand.slug })
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<CmsStrategy | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Estrategias</h2>
          <p className="text-sm text-slate-600">
            Cada estrategia contiene sus propios requerimientos, presupuesto y reportes.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35]"
          >
            <Plus size={14} /> Nueva estrategia
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-2.5">Nombre</th>
              <th className="text-left px-4 py-2.5">País</th>
              <th className="text-left px-4 py-2.5">Período</th>
              <th className="text-right px-4 py-2.5">Budget</th>
              <th className="text-left px-4 py-2.5">Estado</th>
              <th className="text-right px-4 py-2.5"></th>
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
            {!isLoading && strategies.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Sin estrategias. Creá la primera con el botón de arriba.
                </td>
              </tr>
            )}
            {strategies.map((s) => {
              const meta = STRATEGY_STATUS_META[s.estado]
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-[#0E2A47]">{s.nombre}</td>
                  <td className="px-4 py-3 text-xs">{s.pais}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {formatDate(s.periodo_start)} → {formatDate(s.periodo_end)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUsd(s.budget_total_usd)}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && (
                      <button
                        onClick={() => setEditing(s)}
                        className="text-slate-400 hover:text-[#0E2A47]"
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {creating && (
        <StrategyForm
          brandSlug={brand.slug}
          brandCountries={brand.countries}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <StrategyForm
          strategy={editing}
          brandSlug={brand.slug}
          brandCountries={brand.countries}
          onSaved={() => setEditing(null)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
