import { useQuery } from '@tanstack/react-query'
import {
  LayoutDashboard,
  AlertTriangle,
  ClipboardCheck,
  Clock,
  TrendingUp,
  History,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/AuthProvider'
import { useBrands } from '@/hooks/useBrands'
import { useRequirements } from '@/hooks/useRequirements'
import { useApprovals } from '@/hooks/useApprovals'
import { StatusPill } from '@/components/cms/StatusPill'
import {
  REQUIREMENT_STATUS_META,
  APPROVAL_STATUS_META,
  AREA_META,
  formatUsd,
  formatDate,
  daysUntil,
} from '@/lib/cms'
import type { CmsBrand, CmsRequirement } from '@/types/cms'
import type { NavigationState } from '@/data/brand-modules'

interface HomeViewProps {
  onNavigate: (nav: NavigationState) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const { profile } = useAuth()
  const { data: brands = [] } = useBrands()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-[#0E2A47]">
          Hola, {profile?.full_name ?? profile?.email?.split('@')[0]} 👋
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Panel operativo del equipo de comunicaciones · {brands.length} marcas activas
        </p>
      </header>

      {/* Row 1: métricas rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickStats />
      </section>

      {/* Row 2: Pace cross-marca + Mis aprobaciones */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BrandPaceWidget brands={brands} onNavigate={onNavigate} />
        </div>
        <MyApprovalsWidget onNavigate={onNavigate} />
      </section>

      {/* Row 3: Requerimientos vencen + Últimos eventos */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <UpcomingRequirementsWidget brands={brands} onNavigate={onNavigate} />
        </div>
        <RecentActivityWidget />
      </section>
    </div>
  )
}

// ============================================================================
// Widget helpers
// ============================================================================

function WidgetCard({
  icon: Icon,
  title,
  hint,
  children,
  className,
}: {
  icon: LucideIcon
  title: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white ${className ?? ''}`}>
      <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#0E2A47]" />
          <h2 className="font-semibold text-[#0E2A47]">{title}</h2>
        </div>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </header>
      <div className="p-5">{children}</div>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = 'navy',
}: {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  accent?: 'navy' | 'mint' | 'sun' | 'danger'
}) {
  const colors = {
    navy: 'bg-[#0E2A47] text-white',
    mint: 'bg-[#1BC49C] text-[#0E2A47]',
    sun: 'bg-[#F5B700] text-[#0E2A47]',
    danger: 'bg-red-500 text-white',
  } as const

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-semibold text-[#0E2A47] tabular-nums">{value}</p>
          {hint && <p className="text-xs text-slate-500 mt-1 truncate">{hint}</p>}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors[accent]}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Widgets
// ============================================================================

function QuickStats() {
  const { data: stats } = useQuery({
    queryKey: ['cms-home-stats'],
    queryFn: async () => {
      const [strategies, requirements, approvals, spend] = await Promise.all([
        supabase.from('admin_effix_strategies').select('id', { count: 'exact', head: true }).eq('estado', 'active'),
        supabase
          .from('admin_effix_requirements')
          .select('id', { count: 'exact', head: true })
          .in('status', ['draft', 'in_review', 'changes_requested', 'in_production', 'qa']),
        supabase
          .from('admin_effix_approvals')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending'),
        supabase.from('admin_effix_spend_entries').select('amount_usd').gte('fecha', thirtyDaysAgo()),
      ])
      const totalSpend = (spend.data ?? []).reduce((acc, r) => acc + Number(r.amount_usd || 0), 0)
      return {
        activeStrategies: strategies.count ?? 0,
        openRequirements: requirements.count ?? 0,
        pendingApprovals: approvals.count ?? 0,
        spend30d: totalSpend,
      }
    },
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  })

  return (
    <>
      <StatCard
        label="Estrategias activas"
        value={stats?.activeStrategies ?? '—'}
        icon={LayoutDashboard}
        accent="navy"
      />
      <StatCard
        label="Requerimientos abiertos"
        value={stats?.openRequirements ?? '—'}
        hint="todas las áreas"
        icon={Clock}
        accent="mint"
      />
      <StatCard
        label="Aprobaciones pendientes"
        value={stats?.pendingApprovals ?? '—'}
        icon={ClipboardCheck}
        accent="sun"
      />
      <StatCard
        label="Inversión 30d"
        value={formatUsd(stats?.spend30d ?? 0)}
        hint="cross-marca"
        icon={TrendingUp}
        accent="navy"
      />
    </>
  )
}

function BrandPaceWidget({
  brands,
  onNavigate,
}: {
  brands: CmsBrand[]
  onNavigate: (nav: NavigationState) => void
}) {
  const { data: paceData } = useQuery({
    queryKey: ['cms-home-pace'],
    queryFn: async () => {
      const { data: budgets } = await supabase
        .from('admin_effix_budgets')
        .select('amount_usd, strategy_id, admin_effix_strategies!inner(brand_slug)')
        .gte('period_end', new Date().toISOString().slice(0, 10))
      const { data: spend } = await supabase
        .from('admin_effix_spend_entries')
        .select('amount_usd, strategy_id, admin_effix_strategies!inner(brand_slug)')
        .gte('fecha', thirtyDaysAgo())

      const byBrand = new Map<string, { budget: number; spend: number }>()
      ;(budgets ?? []).forEach((b: Record<string, unknown>) => {
        const slug = extractSlug(b.admin_effix_strategies)
        if (!slug) return
        const entry = byBrand.get(slug) ?? { budget: 0, spend: 0 }
        entry.budget += Number(b.amount_usd || 0)
        byBrand.set(slug, entry)
      })
      ;(spend ?? []).forEach((s: Record<string, unknown>) => {
        const slug = extractSlug(s.admin_effix_strategies)
        if (!slug) return
        const entry = byBrand.get(slug) ?? { budget: 0, spend: 0 }
        entry.spend += Number(s.amount_usd || 0)
        byBrand.set(slug, entry)
      })
      return byBrand
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 120,
  })

  return (
    <WidgetCard icon={TrendingUp} title="Pace cross-marca" hint="Spend 30d vs plan">
      <div className="overflow-x-auto -mx-5 -my-5">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500 bg-slate-50/50">
            <tr>
              <th className="text-left px-5 py-2.5">Marca</th>
              <th className="text-right px-3 py-2.5">Plan</th>
              <th className="text-right px-3 py-2.5">Spend 30d</th>
              <th className="text-right px-3 py-2.5">Pace</th>
              <th className="px-5 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.map((b) => {
              const data = paceData?.get(b.slug) ?? { budget: 0, spend: 0 }
              const pct = data.budget > 0 ? (data.spend / data.budget) * 100 : 0
              const semaforo =
                data.budget === 0
                  ? 'bg-slate-200'
                  : pct > 100
                    ? 'bg-red-400'
                    : pct > 85
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
              return (
                <tr
                  key={b.slug}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() =>
                    onNavigate({
                      module: 'cms:brand',
                      submodule: 'overview',
                      currentBrand: b.slug,
                      activeTab: 'overview',
                    })
                  }
                >
                  <td className="px-5 py-2.5 font-medium text-[#0E2A47] whitespace-nowrap">
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                      style={{ background: b.color_primary ?? '#94a3b8' }}
                    />
                    {b.name}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                    {data.budget > 0 ? formatUsd(data.budget) : '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatUsd(data.spend)}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${semaforo}`} />
                      <span className="tabular-nums text-xs">{data.budget > 0 ? `${pct.toFixed(0)}%` : '—'}</span>
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <ArrowRight size={14} className="text-slate-300 inline" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  )
}

function MyApprovalsWidget({ onNavigate }: { onNavigate: (nav: NavigationState) => void }) {
  const { profile } = useAuth()
  const { data: approvals } = useApprovals({
    approverId: profile?.id,
    status: 'pending',
  })
  const list = (approvals ?? []).slice(0, 5)

  return (
    <WidgetCard icon={ClipboardCheck} title="Mis aprobaciones" hint={`${list.length} pendientes`}>
      {list.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">
          Sin aprobaciones pendientes 👏
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 -my-2">
          {list.map((a) => {
            const meta = APPROVAL_STATUS_META[a.status]
            return (
              <li key={a.id} className="py-3 flex items-start gap-3">
                <StatusPill label={a.ap_code} color="text-slate-700" bg="bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0E2A47] font-medium">
                    {a.entity_type} · {formatDate(a.requested_at, { includeTime: false })}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {a.request_md?.slice(0, 80) ?? '—'}
                  </p>
                </div>
                <StatusPill label={meta.label} color={meta.color} bg={meta.bg} />
              </li>
            )
          })}
        </ul>
      )}
      <button
        onClick={() => onNavigate({ module: 'cms:approvals', submodule: 'overview' })}
        className="mt-3 w-full text-xs text-slate-500 hover:text-[#0E2A47] text-center"
      >
        Ver todas →
      </button>
    </WidgetCard>
  )
}

function UpcomingRequirementsWidget({
  brands,
  onNavigate,
}: {
  brands: CmsBrand[]
  onNavigate: (nav: NavigationState) => void
}) {
  const { data: requirements } = useRequirements()
  const upcoming = (requirements ?? [])
    .filter((r) => {
      if (!r.deadline) return false
      const days = daysUntil(r.deadline)
      return days !== null && days <= 2
    })
    .slice(0, 8)

  return (
    <WidgetCard
      icon={AlertTriangle}
      title="Requerimientos que vencen"
      hint="≤ 48 horas"
    >
      {upcoming.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">
          Nada vence en las próximas 48h 👌
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 -my-2">
          {upcoming.map((r) => {
            const area = AREA_META[r.area]
            const statusMeta = REQUIREMENT_STATUS_META[r.status]
            const days = daysUntil(r.deadline)
            const urgent = (days ?? 99) <= 0
            return (
              <li
                key={r.id}
                className="py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded"
                onClick={() => navigateToRequirementBrand(r, brands, onNavigate)}
              >
                <StatusPill label={area.label} color={area.color} bg={area.bg} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0E2A47] font-medium truncate">{r.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(r.deadline)}</p>
                </div>
                <StatusPill
                  label={urgent ? (days === 0 ? 'Hoy' : 'Vencido') : `${days}d`}
                  color={urgent ? 'text-white' : 'text-amber-800'}
                  bg={urgent ? 'bg-red-500' : 'bg-amber-100'}
                />
                <StatusPill label={statusMeta.label} color={statusMeta.color} bg={statusMeta.bg} />
              </li>
            )
          })}
        </ul>
      )}
    </WidgetCard>
  )
}

function RecentActivityWidget() {
  const { data: events } = useQuery({
    queryKey: ['cms-home-recent-audit'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_effix_audit_log')
        .select('*')
        .in('action', ['approval_requested', 'approval_approved', 'reconcile_month', 'sign_in'])
        .order('created_at', { ascending: false })
        .limit(10)
      if (error) throw error
      return data ?? []
    },
    staleTime: 1000 * 60,
  })

  return (
    <WidgetCard icon={History} title="Actividad reciente">
      {(events?.length ?? 0) === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">Sin actividad aún</p>
      ) : (
        <ul className="space-y-2 -my-1 text-sm">
          {(events ?? []).map((e) => (
            <li key={e.id} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              <div className="min-w-0">
                <p className="text-[#0E2A47] truncate">
                  <span className="text-slate-500">{e.user_email ?? 'sistema'}</span>{' '}
                  <span className="font-medium">{labelAction(e.action)}</span>
                  {e.entity_type && <span className="text-slate-500"> · {e.entity_type}</span>}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDate(e.created_at, { includeTime: true })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </WidgetCard>
  )
}

// ============================================================================
// Utils locales
// ============================================================================

function thirtyDaysAgo(): string {
  const d = new Date()
  d.setDate(d.getDate() - 30)
  return d.toISOString().slice(0, 10)
}

function labelAction(action: string): string {
  const map: Record<string, string> = {
    approval_requested: 'pidió aprobación',
    approval_approved: 'aprobó',
    approval_changes_requested: 'pidió cambios en',
    approval_rejected: 'rechazó',
    reconcile_month: 'cerró mes',
    sign_in: 'inició sesión',
  }
  return map[action] ?? action
}

function navigateToRequirementBrand(
  _r: CmsRequirement,
  _brands: CmsBrand[],
  onNavigate: (nav: NavigationState) => void,
) {
  // Se resolverá brand_slug desde strategy_id en Fase 3 (link a requirement detail).
  // Por ahora, navegar al módulo my-tasks.
  onNavigate({ module: 'cms:my-tasks', submodule: 'overview' })
}

/** Supabase devuelve la relación como objeto o array según cardinalidad del filtro. */
function extractSlug(rel: unknown): string | null {
  if (!rel) return null
  if (Array.isArray(rel)) {
    const first = rel[0] as { brand_slug?: string } | undefined
    return first?.brand_slug ?? null
  }
  const obj = rel as { brand_slug?: string }
  return obj?.brand_slug ?? null
}
