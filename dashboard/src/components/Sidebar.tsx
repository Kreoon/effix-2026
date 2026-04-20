import { useState } from 'react'
import {
  Calendar,
  ShoppingCart,
  Server,
  Heart,
  Home,
  Globe,
  User,
  Users,
  LayoutDashboard,
  ChevronRight,
  X,
  Menu,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  brandModules,
  submoduleLabels,
  type BrandModule,
  type NavigationState,
  type SubmoduleKey,
} from '@/data/brand-modules'
import { useAdminProfile } from '@/hooks/useAdminProfile'

export type { NavigationState }

// Mapa de nombre de icono (string) a componente lucide-react
const iconMap: Record<string, typeof Calendar> = {
  Calendar,
  ShoppingCart,
  Server,
  Heart,
  Home,
  Globe,
  User,
  Users,
}

interface SidebarProps {
  currentNav: NavigationState
  onNavigate: (nav: NavigationState) => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ currentNav, onNavigate, isOpen, onToggle }: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const { isAuthenticated: hasAdminAccess } = useAdminProfile()

  function toggleModule(slug: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  function handleNavigate(nav: NavigationState) {
    onNavigate(nav)
    // Cerrar sidebar en mobile al navegar
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  function handleBrandClick(brand: BrandModule) {
    toggleModule(brand.slug)
    // Al expandir sin haber seleccionado submodulo, navegar al resumen
    if (!expandedModules.has(brand.slug) && currentNav.module !== brand.slug) {
      onNavigate({ module: brand.slug, submodule: 'resumen' })
    }
  }

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — w-64 fijo para evitar que nombres largos rompan el layout */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-800 z-30',
          'flex flex-col transition-transform duration-200',
          'lg:translate-x-0 lg:static lg:z-auto lg:shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Navegacion principal"
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800 shrink-0">
          <div className="min-w-0">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Grupo Effi</p>
            <h1 className="text-slate-100 font-bold text-sm leading-tight mt-0.5 truncate">
              Marketing Ops
            </h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0 ml-2"
            aria-label="Cerrar menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navegacion */}
        <nav
          className="flex-1 px-3 py-4 overflow-y-auto"
          role="navigation"
          aria-label="Menu de navegacion"
        >
          {/* Dashboard General */}
          <button
            onClick={() => handleNavigate({ module: 'dashboard', submodule: 'resumen' })}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
              currentNav.module === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
            )}
            aria-current={currentNav.module === 'dashboard' ? 'page' : undefined}
          >
            <LayoutDashboard size={16} className="shrink-0" />
            <span className="truncate">Dashboard General</span>
          </button>

          {hasAdminAccess && (
            <button
              onClick={() => handleNavigate({ module: 'admin', submodule: 'overview' })}
              className={cn(
                'mt-1 w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
                currentNav.module === 'admin'
                  ? 'bg-[#1BC49C] text-[#0E2A47] shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
              )}
              aria-current={currentNav.module === 'admin' ? 'page' : undefined}
            >
              <Shield size={16} className="shrink-0" />
              <span className="truncate">Admin</span>
            </button>
          )}

          {/* Separador EMPRESAS */}
          <div className="mt-5 mb-2 px-1 flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-800" aria-hidden="true" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest shrink-0">
              Empresas
            </p>
            <div className="flex-1 h-px bg-slate-800" aria-hidden="true" />
          </div>

          {/* Lista de marcas */}
          <div className="space-y-0.5">
            {brandModules.map((brand) => {
              const Icon = iconMap[brand.icon] ?? User
              const isExpanded = expandedModules.has(brand.slug)
              const isBrandActive = currentNav.module === brand.slug

              return (
                <div key={brand.slug}>
                  {/* Modulo empresa (header colapsable) */}
                  <button
                    onClick={() => handleBrandClick(brand)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
                      isBrandActive
                        ? 'bg-slate-700 text-slate-100 ring-1 ring-slate-600'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`submodules-${brand.slug}`}
                  >
                    <Icon
                      size={15}
                      className={cn(
                        'shrink-0 transition-colors',
                        isBrandActive ? 'text-blue-400' : 'text-slate-500',
                      )}
                    />
                    <span className="flex-1 truncate min-w-0">{brand.name}</span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        'shrink-0 transition-transform duration-200',
                        isBrandActive ? 'text-slate-400' : 'text-slate-600',
                        isExpanded && 'rotate-90',
                      )}
                    />
                  </button>

                  {/* Submodulos desplegables */}
                  {isExpanded && (
                    <div
                      id={`submodules-${brand.slug}`}
                      role="group"
                      aria-label={`Submodulos de ${brand.name}`}
                      className="mt-0.5 mb-1"
                    >
                      {brand.submodules.map((subKey: SubmoduleKey) => {
                        const isSubActive =
                          currentNav.module === brand.slug && currentNav.submodule === subKey

                        return (
                          <button
                            key={subKey}
                            onClick={() =>
                              handleNavigate({ module: brand.slug, submodule: subKey })
                            }
                            className={cn(
                              'w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-xs rounded-md transition-colors text-left',
                              isSubActive
                                ? 'text-blue-300 bg-blue-600/15 font-medium'
                                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60',
                            )}
                            aria-current={isSubActive ? 'page' : undefined}
                          >
                            {/* Indicador visual de submodulo activo */}
                            <span
                              className={cn(
                                'w-1 h-1 rounded-full shrink-0 transition-colors',
                                isSubActive ? 'bg-blue-400' : 'bg-slate-700',
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{submoduleLabels[subKey]}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 shrink-0">
          <p className="text-xs text-slate-600">v1.1.0 — Mar 2026</p>
        </div>
      </aside>

      {/* Toggle button mobile — visible solo cuando sidebar cerrado */}
      <button
        onClick={onToggle}
        className={cn(
          'fixed top-4 left-4 z-10 p-2 rounded-lg bg-slate-800 border border-slate-700',
          'text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors',
          'lg:hidden',
          isOpen && 'hidden',
        )}
        aria-label="Abrir menu"
      >
        <Menu size={16} />
      </button>
    </>
  )
}
