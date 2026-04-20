import { useMemo, useState } from 'react'
import { Plus, Pencil, Printer } from 'lucide-react'
import { useStrategies } from '@/hooks/useStrategies'
import { useReports } from '@/hooks/useReports'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { StatusPill } from '@/components/cms/StatusPill'
import { ReportForm } from '@/components/cms/ReportForm'
import { MarkdownView } from '@/components/cms/MarkdownView'
import { formatDate } from '@/lib/cms'
import type { CmsBrand, CmsReport } from '@/types/cms'

export function BrandReportsTab({ brand }: { brand: CmsBrand }) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({ brandSlug: brand.slug })
  const { data: reports = [], isLoading } = useReports()
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const effectiveStrategy = selectedStrategy || strategies[0]?.id || null

  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<CmsReport | null>(null)
  const [viewing, setViewing] = useState<CmsReport | null>(null)

  const strategyIds = useMemo(() => new Set(strategies.map((s) => s.id)), [strategies])
  const brandReports = reports.filter((r) => strategyIds.has(r.strategy_id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Reportes</h2>
          <p className="text-sm text-slate-600">Semanales y mensuales con snapshot de KPIs.</p>
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
              <Plus size={14} /> Nuevo reporte
            </button>
          )}
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate-500">Cargando...</p>}

      {!isLoading && brandReports.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Sin reportes. Generá el primero con snapshot automático de KPIs.
          </p>
        </div>
      )}

      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
        {brandReports.map((r) => (
          <div
            key={r.id}
            className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
            onClick={() => setViewing(r)}
          >
            <div className="flex-1">
              <p className="font-medium text-[#0E2A47]">
                {r.type === 'weekly' ? 'Semanal' : r.type === 'monthly' ? 'Mensual' : 'Ad hoc'} ·{' '}
                {formatDate(r.period_start)} → {formatDate(r.period_end)}
              </p>
              <p className="text-xs text-slate-500">
                Creado {formatDate(r.created_at, { includeTime: true })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill label={r.type} color="text-slate-700" bg="bg-slate-100" />
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditing(r)
                  }}
                  className="text-slate-400 hover:text-[#0E2A47]"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {creating && effectiveStrategy && (
        <ReportForm
          strategyId={effectiveStrategy}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <ReportForm
          report={editing}
          strategyId={editing.strategy_id}
          onSaved={() => setEditing(null)}
          onClose={() => setEditing(null)}
        />
      )}

      {viewing && <ReportViewerModal report={viewing} onClose={() => setViewing(null)} />}
    </div>
  )
}

function ReportViewerModal({ report, onClose }: { report: CmsReport; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between print:hidden">
          <h2 className="font-semibold text-[#0E2A47]">
            Reporte {report.type} · {formatDate(report.period_start)} → {formatDate(report.period_end)}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs hover:bg-slate-50"
            >
              <Printer size={12} /> Imprimir / PDF
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
              ✕
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <MarkdownView md={report.body_md} fallback="Este reporte no tiene body escrito." />
          {Object.keys(report.kpis_snapshot ?? {}).length > 0 && (
            <section className="mt-8 border-t border-slate-200 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Snapshot KPIs
              </h3>
              <pre className="text-xs bg-slate-50 rounded p-3 overflow-x-auto">
                {JSON.stringify(report.kpis_snapshot, null, 2)}
              </pre>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
