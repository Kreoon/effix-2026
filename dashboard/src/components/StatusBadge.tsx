import { cn } from '@/lib/utils'
import type { BrandStatus, CampaignHealth, CampaignStatus } from '@/data/mock-data'

interface StatusBadgeProps {
  status: BrandStatus | CampaignStatus | CampaignHealth
  className?: string
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  activo: { label: 'Activo', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  pausado: { label: 'Pausado', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  'sin-campanas': { label: 'Sin campanas', classes: 'bg-slate-600/40 text-slate-400 border-slate-600/40' },
  learning: { label: 'Aprendiendo', classes: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  verde: { label: 'Saludable', classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  amarillo: { label: 'Atencion', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  rojo: { label: 'Critico', classes: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, classes: 'bg-slate-600/40 text-slate-400' }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.classes,
        className,
      )}
    >
      {config.label}
    </span>
  )
}

interface AuditScoreBadgeProps {
  score: number
  className?: string
}

export function AuditScoreBadge({ score, className }: AuditScoreBadgeProps) {
  const color =
    score === 0
      ? 'text-slate-500'
      : score < 40
        ? 'text-red-400'
        : score < 67
          ? 'text-yellow-400'
          : 'text-green-400'

  return (
    <span className={cn('text-sm font-semibold tabular-nums', color, className)}>
      {score === 0 ? '—' : `${score}/100`}
    </span>
  )
}
