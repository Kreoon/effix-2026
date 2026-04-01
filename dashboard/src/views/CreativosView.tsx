import { creatives, brands, type Creative, type CreativeStatus, type CreativeType } from '@/data/mock-data'
import { cn } from '@/lib/utils'
import { FileText, Video, Image, Globe, Mic, Film } from 'lucide-react'

const columns: { key: CreativeStatus; label: string }[] = [
  { key: 'borrador', label: 'Borrador' },
  { key: 'pendiente', label: 'Pendiente' },
  { key: 'aprobado', label: 'Aprobado' },
  { key: 'produccion', label: 'Produccion' },
  { key: 'publicado', label: 'Publicado' },
]

const columnHeader: Record<CreativeStatus, string> = {
  borrador: 'bg-slate-700 text-slate-300',
  pendiente: 'bg-yellow-500/20 text-yellow-400',
  aprobado: 'bg-blue-500/20 text-blue-400',
  produccion: 'bg-purple-500/20 text-purple-400',
  publicado: 'bg-green-500/20 text-green-400',
}

const typeConfig: Record<CreativeType, { label: string; classes: string; Icon: typeof FileText }> = {
  copy: { label: 'Copy', classes: 'bg-blue-500/20 text-blue-400', Icon: FileText },
  guion: { label: 'Guion', classes: 'bg-cyan-500/20 text-cyan-400', Icon: Mic },
  video: { label: 'Video', classes: 'bg-purple-500/20 text-purple-400', Icon: Video },
  banner: { label: 'Banner', classes: 'bg-green-500/20 text-green-400', Icon: Image },
  landing: { label: 'Landing', classes: 'bg-orange-500/20 text-orange-400', Icon: Globe },
  vsl: { label: 'VSL', classes: 'bg-red-500/20 text-red-400', Icon: Film },
}

function getBrandName(slug: string): string {
  return brands.find((b) => b.slug === slug)?.name ?? slug
}

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date('2026-03-31')
}

interface CreativeCardProps {
  creative: Creative
}

function CreativeCard({ creative }: CreativeCardProps) {
  const type = typeConfig[creative.type]
  const Icon = type.Icon
  const overdue = creative.status !== 'publicado' && isOverdue(creative.due_date)

  return (
    <article className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-2.5 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-slate-500">{creative.code}</span>
        <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium', type.classes)}>
          <Icon size={10} />
          {type.label}
        </span>
      </div>

      <p className="text-xs text-slate-300 font-medium leading-snug">
        {getBrandName(creative.brand_slug)}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Por: <span className="text-slate-400">{creative.owner}</span>
        </span>
        <span className={cn('text-xs tabular-nums', overdue ? 'text-red-400' : 'text-slate-500')}>
          {creative.due_date}
        </span>
      </div>
    </article>
  )
}

interface CreativosViewProps {
  brandSlug?: string
}

export function CreativosView({ brandSlug }: CreativosViewProps) {
  // Si brandSlug está definido, filtrar solo los creativos de esa marca
  const visibleCreatives = brandSlug
    ? creatives.filter((c) => c.brand_slug === brandSlug)
    : creatives

  const brandName = brandSlug ? getBrandName(brandSlug) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {brandName ? (
            <>
              <span className="text-slate-300 font-medium">{brandName}</span>
              {' — '}
              {visibleCreatives.length} creativos en el pipeline
            </>
          ) : (
            `${visibleCreatives.length} creativos en el pipeline`
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeConfig).map(([key, cfg]) => {
            const TIcon = cfg.Icon
            return (
              <span key={key} className={cn('inline-flex items-center gap-1 text-xs px-2 py-1 rounded', cfg.classes)}>
                <TIcon size={10} />
                {cfg.label}
              </span>
            )
          })}
        </div>
      </div>

      {visibleCreatives.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
          <p className="text-sm text-slate-500">
            Sin creativos para {brandName ?? 'esta marca'}.
          </p>
        </div>
      ) : (
        /* Kanban */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {columns.map((col) => {
            const cards = visibleCreatives.filter((c) => c.status === col.key)
            return (
              <div key={col.key} className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col">
                <div className={cn('px-3 py-2.5 rounded-t-xl border-b border-slate-700 flex items-center justify-between', columnHeader[col.key])}>
                  <span className="text-xs font-semibold uppercase tracking-wide">{col.label}</span>
                  <span className="text-xs font-bold tabular-nums">{cards.length}</span>
                </div>
                <div className="p-2 space-y-2 min-h-24">
                  {cards.length === 0 ? (
                    <p className="text-center text-slate-600 text-xs py-6">Sin items</p>
                  ) : (
                    cards.map((c) => <CreativeCard key={c.id} creative={c} />)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
