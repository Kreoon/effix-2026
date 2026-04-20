import { useMemo, type ReactNode } from 'react'
import {
  LayoutDashboard,
  ClipboardCheck,
  CheckSquare,
  LogOut,
  ChevronLeft,
  Users,
  ScrollText,
  Settings,
  Briefcase,
  Archive,
  Coins,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { signOut } from '@/lib/auth'
import { BrandSwitcher } from '@/components/cms/BrandSwitcher'
import { useBrand } from '@/hooks/useBrands'
import {
  BRAND_TABS,
  BRAND_TAB_LABELS,
  type BrandTab,
  type NavigationState,
} from '@/data/brand-modules'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  nav: NavigationState
  onNavigate: (nav: NavigationState) => void
  children: ReactNode
}

export function AdminLayout({ nav, onNavigate, children }: AdminLayoutProps) {
  const { profile } = useAuth()
  const { isSuperAdmin } = useAdminProfile()
  const { data: activeBrand } = useBrand(nav.currentBrand)

  async function handleSignOut() {
    await signOut()
  }

  const primaryItems = useMemo(
    () => [
      { key: 'cms:home', label: 'Dashboard', icon: LayoutDashboard as LucideIcon },
      { key: 'cms:my-tasks', label: 'Mis tareas', icon: CheckSquare as LucideIcon },
      { key: 'cms:approvals', label: 'Aprobaciones', icon: ClipboardCheck as LucideIcon },
    ],
    [],
  )

  const legacyItems = isSuperAdmin
    ? [
        { key: 'admin:leads', label: 'Legacy · Leads', icon: Archive as LucideIcon },
        { key: 'admin:campaigns', label: 'Legacy · Campañas', icon: Archive as LucideIcon },
      ]
    : []

  const adminItems = isSuperAdmin
    ? [
        { key: 'admin:users', label: 'Usuarios', icon: Users as LucideIcon },
        { key: 'admin:brands', label: 'Marcas', icon: Briefcase as LucideIcon },
        { key: 'admin:fx_rates', label: 'FX rates', icon: Coins as LucideIcon },
        { key: 'admin:audit', label: 'Auditoría', icon: ScrollText as LucideIcon },
        { key: 'admin:settings', label: 'Configuración', icon: Settings as LucideIcon },
      ]
    : []

  function navKey(): string {
    if (nav.module === 'admin') return `admin:${nav.submodule}`
    return nav.module
  }
  const currentKey = navKey()

  function go(key: string) {
    if (key.startsWith('cms:')) {
      onNavigate({ module: key as NavigationState['module'], submodule: 'overview' })
      return
    }
    if (key.startsWith('admin:')) {
      const sub = key.replace('admin:', '') as NavigationState['submodule']
      onNavigate({ module: 'admin', submodule: sub })
    }
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E2A47] text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <button
            onClick={() =>
              onNavigate({ module: 'dashboard', submodule: 'resumen' })
            }
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors mb-3"
          >
            <ChevronLeft size={14} />
            Dashboard marcas (legacy)
          </button>
          <h1 className="font-semibold tracking-tight text-lg mb-3">
            Grupo Effi · Admin
          </h1>
          <BrandSwitcher currentBrand={nav.currentBrand} onSelect={onNavigate} />
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {/* Items principales */}
          <div className="space-y-0.5">
            {primaryItems.map(({ key, label, icon: Icon }) => {
              const active = currentKey === key
              return (
                <button
                  key={key}
                  onClick={() => go(key)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-[#1BC49C] text-[#0E2A47] font-medium'
                      : 'text-white/80 hover:bg-white/10',
                  )}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

          {/* Marca activa con tabs */}
          {nav.currentBrand && activeBrand && (
            <div className="mt-4">
              <div className="px-3 mb-1.5 flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-wider">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: activeBrand.color_primary ?? '#94a3b8' }}
                />
                {activeBrand.name}
              </div>
              <div className="space-y-0.5">
                {BRAND_TABS.map((t) => {
                  const active = nav.module === 'cms:brand' && nav.activeTab === t
                  return (
                    <button
                      key={t}
                      onClick={() =>
                        onNavigate({
                          module: 'cms:brand',
                          submodule: t,
                          currentBrand: nav.currentBrand,
                          activeTab: t,
                        })
                      }
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors',
                        active
                          ? 'bg-white/15 text-white font-medium'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/90',
                      )}
                    >
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{BRAND_TAB_LABELS[t as BrandTab]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Admin (solo super_admin) */}
          {adminItems.length > 0 && (
            <div className="mt-6">
              <div className="px-3 mb-1.5 text-[11px] text-white/40 uppercase tracking-wider">
                Admin
              </div>
              <div className="space-y-0.5">
                {adminItems.map(({ key, label, icon: Icon }) => {
                  const active = currentKey === key
                  return (
                    <button
                      key={key}
                      onClick={() => go(key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                        active
                          ? 'bg-white/15 text-white font-medium'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/90',
                      )}
                    >
                      <Icon size={14} />
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Legacy (solo super_admin, oculto por default) */}
          {legacyItems.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer px-3 text-[11px] text-white/30 uppercase tracking-wider hover:text-white/60">
                Legacy admin
              </summary>
              <div className="space-y-0.5 mt-1">
                {legacyItems.map(({ key, label, icon: Icon }) => {
                  const active = currentKey === key
                  return (
                    <button
                      key={key}
                      onClick={() => go(key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-colors',
                        active
                          ? 'bg-white/10 text-white/90'
                          : 'text-white/40 hover:bg-white/5 hover:text-white/70',
                      )}
                    >
                      <Icon size={12} />
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
            </details>
          )}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs">
          <div className="mb-2">
            <p className="font-medium text-white truncate">
              {profile?.full_name ?? profile?.email}
            </p>
            <p className="text-white/50 capitalize">
              {profile?.role?.replace('_', ' ')}
            </p>
          </div>
          <button
            onClick={() => void handleSignOut()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}
