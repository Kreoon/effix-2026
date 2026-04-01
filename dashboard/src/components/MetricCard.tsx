import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  subValue?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  className?: string
  accent?: 'default' | 'green' | 'yellow' | 'red' | 'blue'
}

const accentBorder: Record<string, string> = {
  default: 'border-slate-700',
  green: 'border-green-500/40',
  yellow: 'border-yellow-500/40',
  red: 'border-red-500/40',
  blue: 'border-blue-500/40',
}

const accentIcon: Record<string, string> = {
  default: 'bg-slate-700 text-slate-400',
  green: 'bg-green-500/20 text-green-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  red: 'bg-red-500/20 text-red-400',
  blue: 'bg-blue-500/20 text-blue-400',
}

const trendPrefix: Record<'up' | 'down' | 'neutral', string> = {
  up: '↑ ',
  down: '↓ ',
  neutral: '→ ',
}

export function MetricCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  trendLabel,
  className,
  accent = 'default',
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-slate-800 rounded-xl border p-4 flex flex-col gap-3',
        accentBorder[accent],
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
        <div className={cn('p-2 rounded-lg shrink-0', accentIcon[accent])}>
          <Icon size={14} aria-hidden="true" />
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-100 tabular-nums leading-tight truncate">
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-slate-500 mt-0.5 truncate">{subValue}</p>
        )}
      </div>

      {trendLabel && trend && (
        <p
          className={cn('text-xs font-medium', {
            'text-green-400': trend === 'up',
            'text-red-400': trend === 'down',
            'text-slate-400': trend === 'neutral',
          })}
          aria-label={`Tendencia: ${trendLabel}`}
        >
          {trendPrefix[trend]}{trendLabel}
        </p>
      )}
    </div>
  )
}
