import { useStrategies } from '@/hooks/useStrategies'
import { useRequirements } from '@/hooks/useRequirements'
import { useLandingsByBrand } from '@/hooks/useLandings'
import { StatusPill } from '@/components/cms/StatusPill'
import { STRATEGY_STATUS_META, LANDING_STATUS_META, formatDate, formatUsd } from '@/lib/cms'
import type { CmsBrand } from '@/types/cms'
import type { NavigationState } from '@/data/brand-modules'

interface Props {
  brand: CmsBrand
  onNavigate: (nav: NavigationState) => void
}

export function BrandOverviewTab({ brand, onNavigate }: Props) {
  const { data: strategies = [] } = useStrategies({ brandSlug: brand.slug })
  const strategyIds = strategies.map((s) => s.id)
  const { data: requirements = [] } = useRequirements()
  const brandRequirements = requirements.filter((r) => strategyIds.includes(r.strategy_id))
  const { data: landings = [] } = useLandingsByBrand(brand.slug)

  const activeStrategies = strategies.filter((s) => s.estado === 'active')
  const liveLandings = landings.filter((l) => l.status === 'live')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat label="Estrategias" value={strategies.length} hint={`${activeStrategies.length} activas`} />
        <MiniStat label="Requerimientos" value={brandRequirements.length} />
        <MiniStat label="Landings" value={landings.length} hint={`${liveLandings.length} en vivo`} />
        <MiniStat
          label="Presupuesto total"
          value={formatUsd(strategies.reduce((acc, s) => acc + Number(s.budget_total_usd || 0), 0))}
        />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">Estrategias activas</h2>
          <button
            onClick={() =>
              onNavigate({
                module: 'cms:brand',
                submodule: 'strategies',
                currentBrand: brand.slug,
                activeTab: 'strategies',
              })
            }
            className="text-xs text-slate-500 hover:text-[#0E2A47]"
          >
            Ver todas →
          </button>
        </header>
        <div className="divide-y divide-slate-100">
          {activeStrategies.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-500">
              No hay estrategias activas todavía. Creá la primera desde la pestaña "Estrategias".
            </p>
          )}
          {activeStrategies.map((s) => {
            const meta = STRATEGY_STATUS_META[s.estado]
            return (
              <div key={s.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#0E2A47] truncate">{s.nombre}</p>
                  <p className="text-xs text-slate-500">
                    {s.pais} · {formatDate(s.periodo_start)} → {formatDate(s.periodo_end)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm tabular-nums text-slate-700">
                    {formatUsd(s.budget_total_usd)}
                  </span>
                  <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 py-3 border-b border-slate-100">
          <h2 className="font-semibold text-[#0E2A47]">Landings</h2>
        </header>
        <div className="divide-y divide-slate-100">
          {landings.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-500">
              Sin landings registradas. Agregá desde la pestaña "Landings".
            </p>
          )}
          {landings.map((l) => {
            const meta = LANDING_STATUS_META[l.status]
            return (
              <div key={l.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#0E2A47] truncate">{l.slug ?? '(sin slug)'}</p>
                  {l.url_vercel && (
                    <a
                      href={l.url_vercel}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-sky-600 hover:underline truncate inline-block"
                    >
                      {l.url_vercel}
                    </a>
                  )}
                </div>
                <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function MiniStat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-[#0E2A47] tabular-nums">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  )
}
