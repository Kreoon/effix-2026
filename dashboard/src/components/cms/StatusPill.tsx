import { cn } from '@/lib/utils'

interface StatusPillProps {
  label: string
  color?: string
  bg?: string
  className?: string
  size?: 'sm' | 'md'
}

export function StatusPill({ label, color, bg, className, size = 'sm' }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        bg ?? 'bg-slate-100',
        color ?? 'text-slate-700',
        className,
      )}
    >
      {label}
    </span>
  )
}
