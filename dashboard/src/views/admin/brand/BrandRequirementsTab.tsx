import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useStrategies } from '@/hooks/useStrategies'
import { useRequirements } from '@/hooks/useRequirements'
import { StatusPill } from '@/components/cms/StatusPill'
import { RequirementForm } from '@/components/cms/RequirementForm'
import { RequirementDetail } from '@/components/cms/RequirementDetail'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import {
  AREA_META,
  AREA_ORDER,
  REQUIREMENT_STATUS_META,
  PRIORITY_META,
  formatDate,
  daysUntil,
} from '@/lib/cms'
import type { CmsArea, CmsBrand, CmsRequirement } from '@/types/cms'

interface Props {
  brand: CmsBrand
}

export function BrandRequirementsTab({ brand }: Props) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({ brandSlug: brand.slug })
  const strategyIds = useMemo(() => strategies.map((s) => s.id), [strategies])
  const { data: requirements = [], isLoading } = useRequirements()
  const [creating, setCreating] = useState(false)
  const [activeRequirementId, setActiveRequirementId] = useState<string | null>(null)

  const brandReqs = useMemo(
    () => requirements.filter((r) => strategyIds.includes(r.strategy_id)),
    [requirements, strategyIds],
  )

  const byArea = useMemo(() => {
    const map: Record<CmsArea, CmsRequirement[]> = {
      estratega: [],
      design: [],
      audiovisual: [],
      trafficker: [],
      dev_web: [],
      finanzas: [],
    }
    brandReqs.forEach((r) => {
      if (map[r.area]) map[r.area].push(r)
    })
    return map
  }, [brandReqs])

  const hasStrategies = strategies.length > 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Requerimientos por área</h2>
          <p className="text-sm text-slate-600">
            Clic en una card para ver detalle. Los estados avanzan desde el modal de detalle.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreating(true)}
            disabled={!hasStrategies}
            title={!hasStrategies ? 'Creá una estrategia primero' : ''}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={14} /> Nuevo requerimiento
          </button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate-500">Cargando...</p>}

      {!hasStrategies && !isLoading && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Creá una estrategia en la pestaña "Estrategias" antes de agregar requerimientos.
          </p>
        </div>
      )}

      {hasStrategies && !isLoading && brandReqs.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Sin requerimientos. Creá el primero.</p>
        </div>
      )}

      {hasStrategies && brandReqs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AREA_ORDER.map((area) => {
            const list = byArea[area]
            const meta = AREA_META[area]
            return (
              <div key={area} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <header
                  className={`px-4 py-2.5 border-b border-slate-100 flex items-center justify-between ${meta.bg}`}
                >
                  <h3 className={`font-semibold text-sm ${meta.color}`}>{meta.label}</h3>
                  <span className="text-xs text-slate-600">{list.length}</span>
                </header>
                <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
                  {list.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">Sin requerimientos</p>
                  )}
                  {list.map((r) => (
                    <RequirementCard
                      key={r.id}
                      req={r}
                      onOpen={() => setActiveRequirementId(r.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {creating && (
        <RequirementForm
          strategyId={strategies[0]?.id}
          brandSlug={brand.slug}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {activeRequirementId && (
        <RequirementDetail
          requirementId={activeRequirementId}
          onClose={() => setActiveRequirementId(null)}
        />
      )}
    </div>
  )
}

function RequirementCard({ req, onOpen }: { req: CmsRequirement; onOpen: () => void }) {
  const status = REQUIREMENT_STATUS_META[req.status]
  const priority = PRIORITY_META[req.priority]
  const days = daysUntil(req.deadline)
  const overdue = days !== null && days < 0

  return (
    <button
      onClick={onOpen}
      className="w-full text-left rounded-lg border border-slate-200 bg-white p-3 hover:shadow-sm hover:border-[#1BC49C] transition-all"
    >
      <div className="flex items-start gap-2 mb-2">
        <p className="flex-1 text-sm font-medium text-[#0E2A47] line-clamp-2">{req.title}</p>
        {req.priority !== 'normal' && (
          <StatusPill label={priority.label} color={priority.color} bg={priority.bg} />
        )}
      </div>
      <div className="flex items-center justify-between text-xs">
        <StatusPill label={status.label} color={status.color} bg={status.bg} />
        {req.deadline && (
          <span className={overdue ? 'text-red-600' : 'text-slate-500'}>
            {overdue ? 'Vencido' : formatDate(req.deadline)}
          </span>
        )}
      </div>
    </button>
  )
}
