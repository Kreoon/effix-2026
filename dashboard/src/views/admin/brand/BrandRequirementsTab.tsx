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

export function BrandRequirementsTab({ brand, currentCountry }: Props) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({
    brandSlug: brand.slug,
    pais: currentCountry,
  })
  const strategyIds = useMemo(() => strategies.map((s) => s.id), [strategies])
  const { data: requirements = [], isLoading } = useRequirements()
  const [creating, setCreating] = useState(false)
  const [activeRequirementId, setActiveRequirementId] = useState<string | null>(null)

  const brandReqs = useMemo(
    () => requirements.filter((r) => strategyIds.includes(r.strategy_id)),
    [requirements, strategyIds],
  )

  // Definición de columnas Kanban
  const KANBAN_COLUMNS: { label: string; statuses: RequirementStatus[] }[] = [
    { label: 'Borrador', statuses: ['draft'] },
    { label: 'En Revisión', statuses: ['in_review', 'changes_requested'] },
    { label: 'Aprobado', statuses: ['approved'] },
    { label: 'En Producción', statuses: ['in_production', 'blocked'] },
    { label: 'QA / Finalizado', statuses: ['qa', 'published'] },
  ]

  const byStatus = useMemo(() => {
    const map = new Map<RequirementStatus, CmsRequirement[]>()
    brandReqs.forEach((r) => {
      const list = map.get(r.status) || []
      list.push(r)
      map.set(r.status, list)
    })
    return map
  }, [brandReqs])

  const hasStrategies = strategies.length > 0

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold text-[#0E2A47] flex items-center gap-2">
            Tablero Kanban
            <span className="text-[10px] bg-[#1BC49C]/10 text-[#1BC49C] px-2 py-0.5 rounded-full uppercase tracking-widest">
              Trello Style
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Visualizá y gestioná el flujo operativo de {brand.name} ({currentCountry}).
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreating(true)}
            disabled={!hasStrategies}
            title={!hasStrategies ? 'Creá una estrategia primero' : ''}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm font-semibold hover:bg-[#0A1F35] disabled:opacity-50 transition-all shadow-sm active:scale-95"
          >
            <Plus size={16} /> Nuevo
          </button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate-500 text-center py-10">Cargando tablero...</p>}

      {!hasStrategies && !isLoading && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
          <p className="text-sm text-slate-500">
            No hay estrategias activas para <span className="font-bold">{currentCountry}</span>.
            <br />
            Configurá una en la pestaña de "Estrategias" para empezar.
          </p>
        </div>
      )}

      {hasStrategies && !isLoading && (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent min-h-[500px]">
          {KANBAN_COLUMNS.map((col) => {
            const columnReqs = col.statuses.flatMap((s) => byStatus.get(s) || [])
            return (
              <div
                key={col.label}
                className="flex-shrink-0 w-72 lg:w-80 flex flex-col bg-slate-50/50 rounded-2xl border border-slate-200/60 p-3"
              >
                <header className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-bold text-sm text-[#0E2A47] flex items-center gap-2">
                    {col.label}
                    <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">
                      {columnReqs.length}
                    </span>
                  </h3>
                </header>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  {columnReqs.length === 0 && (
                    <div className="h-24 rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Vacío</p>
                    </div>
                  )}
                  {columnReqs.map((r) => (
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
  const area = AREA_META[req.area]
  const days = daysUntil(req.deadline)
  const overdue = days !== null && days < 0

  return (
    <button
      onClick={onOpen}
      className="w-full text-left rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-[#1BC49C] transition-all group active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`p-1.5 rounded-lg ${area.bg} ${area.color}`}>
          {/* Icono de Lucide según el área */}
          <AreaIcon name={area.icon} size={14} />
        </div>
        {req.priority !== 'normal' && (
          <StatusPill label={priority.label} color={priority.color} bg={priority.bg} />
        )}
      </div>

      <p className="text-sm font-semibold text-[#0E2A47] mb-3 leading-tight group-hover:text-[#1BC49C] transition-colors">
        {req.title}
      </p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase">
            {req.area.substring(0, 1)}
          </div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
            {area.label}
          </span>
        </div>
        
        {req.deadline && (
          <div className={`flex items-center gap-1 text-[10px] font-medium ${overdue ? 'text-red-600' : 'text-slate-500'}`}>
            <span className="opacity-70">Vence:</span>
            {formatDate(req.deadline)}
          </div>
        )}
      </div>
    </button>
  )
}

/** Componente auxiliar para renderizar iconos dinámicos de Lucide */
import * as LucideIcons from 'lucide-react'

function AreaIcon({ name, size }: { name: string; size: number }) {
  const Icon = (LucideIcons as any)[name]
  return Icon ? <Icon size={size} /> : null
}
