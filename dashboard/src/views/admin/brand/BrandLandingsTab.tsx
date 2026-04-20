import { useState } from 'react'
import { ExternalLink, Plus, Pencil } from 'lucide-react'
import { useLandingsByBrand } from '@/hooks/useLandings'
import { useStrategies } from '@/hooks/useStrategies'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { StatusPill } from '@/components/cms/StatusPill'
import { LandingForm } from '@/components/cms/LandingForm'
import { LANDING_STATUS_META, formatDate } from '@/lib/cms'
import type { CmsBrand, CmsLanding } from '@/types/cms'

export function BrandLandingsTab({ brand, currentCountry }: { brand: CmsBrand; currentCountry?: string }) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({
    brandSlug: brand.slug,
    pais: currentCountry,
  })
  const strategyIds = strategies.map((s) => s.id)
  const { data: allLandings = [], isLoading: loadingLandings } = useLandingsByBrand(brand.slug)

  const landings = allLandings.filter((l) => strategyIds.includes(l.strategy_id))
  const isLoading = loadingLandings

  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<CmsLanding | null>(null)
  const hasStrategies = strategies.length > 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Landings</h2>
          <p className="text-sm text-slate-600">URLs Vercel, mockups y status por landing.</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreating(true)}
            disabled={!hasStrategies}
            title={!hasStrategies ? 'Creá una estrategia primero' : ''}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-50"
          >
            <Plus size={14} /> Nueva landing
          </button>
        )}
      </div>

      {isLoading && <p className="text-sm text-slate-500">Cargando...</p>}

      {!isLoading && landings.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Sin landings. Agregá la primera.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landings.map((l) => {
          const meta = LANDING_STATUS_META[l.status]
          return (
            <div key={l.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden group">
              <div className="aspect-[16/10] bg-slate-100 relative">
                {l.screenshot_url ? (
                  <img
                    src={l.screenshot_url}
                    alt={l.slug ?? ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    Sin screenshot
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
                </div>
                {isAdmin && (
                  <button
                    onClick={() => setEditing(l)}
                    className="absolute top-2 left-2 bg-white/90 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil size={12} className="text-slate-600" />
                  </button>
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-[#0E2A47] truncate">{l.slug ?? '(sin slug)'}</p>
                <p className="text-xs text-slate-500 mb-2">
                  {l.tipo} · {l.funnel ?? '—'} · {formatDate(l.updated_at)}
                </p>
                {l.url_vercel && (
                  <a
                    href={l.url_vercel}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-sky-600 hover:underline truncate"
                  >
                    <ExternalLink size={12} /> {l.url_vercel.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {creating && hasStrategies && (
        <LandingForm
          strategyId={strategies[0].id}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <LandingForm
          landing={editing}
          strategyId={editing.strategy_id}
          onSaved={() => setEditing(null)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
