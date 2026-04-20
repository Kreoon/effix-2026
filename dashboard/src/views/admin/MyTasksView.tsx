import { useState } from 'react'
import { useRequirements } from '@/hooks/useRequirements'
import { useAuth } from '@/components/AuthProvider'
import { StatusPill } from '@/components/cms/StatusPill'
import { RequirementDetail } from '@/components/cms/RequirementDetail'
import {
  AREA_META,
  REQUIREMENT_STATUS_META,
  PRIORITY_META,
  formatDate,
  daysUntil,
} from '@/lib/cms'

export function MyTasksView() {
  const { profile } = useAuth()
  const { data: requirements = [], isLoading } = useRequirements({ assigneeId: profile?.id })
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-[#0E2A47]">Mis tareas</h1>
        <p className="text-sm text-slate-600">
          Requerimientos asignados a tu usuario · {requirements.length} abiertos
        </p>
      </header>

      {isLoading && <p className="text-sm text-slate-500">Cargando...</p>}

      {!isLoading && requirements.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Sin tareas asignadas. Buen momento para un café ☕</p>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-4 py-2.5">Título</th>
              <th className="text-left px-4 py-2.5">Área</th>
              <th className="text-left px-4 py-2.5">Prioridad</th>
              <th className="text-left px-4 py-2.5">Status</th>
              <th className="text-left px-4 py-2.5">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requirements.map((r) => {
              const area = AREA_META[r.area]
              const status = REQUIREMENT_STATUS_META[r.status]
              const priority = PRIORITY_META[r.priority]
              const days = daysUntil(r.deadline)
              const overdue = days !== null && days < 0
              return (
                <tr
                  key={r.id}
                  onClick={() => setActiveId(r.id)}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-[#0E2A47]">{r.title}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={area.label} color={area.color} bg={area.bg} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill label={priority.label} color={priority.color} bg={priority.bg} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill label={status.label} color={status.color} bg={status.bg} />
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {r.deadline ? (
                      <span className={overdue ? 'text-red-600 font-medium' : 'text-slate-600'}>
                        {formatDate(r.deadline)}
                        {overdue && ' · vencido'}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {activeId && <RequirementDetail requirementId={activeId} onClose={() => setActiveId(null)} />}
    </div>
  )
}
