import type { ReactNode } from 'react'
import { useState } from 'react'
import { Sidebar } from './Sidebar'
import {
  brandModules,
  submoduleLabels,
  type NavigationState,
  type SubmoduleKey,
} from '@/data/brand-modules'

interface LayoutProps {
  currentNav: NavigationState
  onNavigate: (nav: NavigationState) => void
  children: ReactNode
}

function getPageTitle(nav: NavigationState): { title: string; subtitle: string } {
  if (nav.module === 'dashboard') {
    return {
      title: 'Vision Consolidada del Grupo',
      subtitle: 'Grupo Effi — Dashboard de Marketing',
    }
  }
  const brand = brandModules.find((b) => b.slug === nav.module)
  if (!brand) return { title: 'Dashboard', subtitle: '' }
  // Layout solo se monta para módulos de marca; el submodule aquí es SubmoduleKey
  const label = submoduleLabels[nav.submodule as SubmoduleKey] ?? nav.submodule
  return {
    title: `${brand.name} — ${label}`,
    subtitle: brand.countries.join(', '),
  }
}

export function Layout({ currentNav, onNavigate, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { title, subtitle } = getPageTitle(currentNav)

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar
        currentNav={currentNav}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />

      {/* Main content — min-w-0 evita overflow en flex */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header
            - z-10 no conflictua con sidebar (z-30 en mobile, static en desktop)
            - pl-14 en mobile deja espacio para el botón hamburguesa (left-4 + p-2 + icon = ~56px)
            - pl-6 en desktop porque el sidebar es static y ya ocupa su espacio
        */}
        <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="pl-10 lg:pl-0 min-w-0">
            <h2 className="text-slate-100 font-semibold text-base truncate">{title}</h2>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <div
              className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs text-slate-500 whitespace-nowrap">En vivo</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}
