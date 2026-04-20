import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'
import { LoginView } from '@/components/LoginView'
import { NoAccessView } from '@/components/NoAccessView'
import { useAuth } from '@/components/AuthProvider'
import {
  type NavigationState,
  type AdminSubmoduleKey,
  type BrandTab,
} from '@/data/brand-modules'
import { GrupoView } from '@/views/GrupoView'
import { MarcaView } from '@/views/MarcaView'
import { FinancieroView } from '@/views/FinancieroView'
import { CreativosView } from '@/views/CreativosView'
import { OperativoView } from '@/views/OperativoView'
import { SeguimientoView } from '@/views/SeguimientoView'
import { LeadsView } from '@/views/LeadsView'
import { EstrategicoView } from '@/views/EstrategicoView'
import { AnaliticaView } from '@/views/AnaliticaView'
// CMS
import { HomeView } from '@/views/admin/HomeView'
import { MyTasksView } from '@/views/admin/MyTasksView'
import { ApprovalsView } from '@/views/admin/ApprovalsView'
import { BrandView } from '@/views/admin/BrandView'
// Admin legacy
import { AdminDashboardView } from '@/views/admin/AdminDashboardView'
import { AdminLeadsView } from '@/views/admin/AdminLeadsView'
import { AdminCampaignsView } from '@/views/admin/AdminCampaignsView'
import { AdminBrandsView } from '@/views/admin/AdminBrandsView'
import { AdminUsersView } from '@/views/admin/AdminUsersView'
import { AdminAuditView } from '@/views/admin/AdminAuditView'
import { AdminSettingsView } from '@/views/admin/AdminSettingsView'
import { FxRatesView } from '@/views/admin/FxRatesView'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function AppContent() {
  const { loading, isAuthenticated, hasAdminAccess } = useAuth()
  const [nav, setNav] = useState<NavigationState>({
    module: 'cms:home',
    submodule: 'overview',
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-sm text-slate-500">Cargando sesión...</div>
      </div>
    )
  }

  if (!isAuthenticated) return <LoginView />
  if (!hasAdminAccess) return <NoAccessView />

  // CMS — shell con AdminLayout
  if (isCmsModule(nav.module) || nav.module === 'admin') {
    return (
      <AdminLayout nav={nav} onNavigate={setNav}>
        {renderAdminContent(nav, setNav)}
      </AdminLayout>
    )
  }

  // Legacy dashboard de marcas
  const brandSlug = nav.module !== 'dashboard' ? nav.module : undefined

  function renderBrandView() {
    if (nav.module === 'dashboard') return <GrupoView onNavigate={setNav} />

    switch (nav.submodule) {
      case 'resumen':
        return <MarcaView brandSlug={nav.module} />
      case 'pauta':
        return <LeadsView brandSlug={brandSlug} />
      case 'estrategia':
        return <EstrategicoView brandSlug={brandSlug} />
      case 'analitica':
        return <AnaliticaView brandSlug={brandSlug} />
      case 'seguimiento':
        return <SeguimientoView brandSlug={brandSlug} />
      case 'financiero':
        return <FinancieroView brandSlug={brandSlug} />
      case 'creativos':
        return <CreativosView brandSlug={brandSlug} />
      case 'operativo':
        return <OperativoView brandSlug={brandSlug} />
      default:
        return <MarcaView brandSlug={nav.module} />
    }
  }

  return (
    <Layout currentNav={nav} onNavigate={setNav}>
      {renderBrandView()}
    </Layout>
  )
}

function isCmsModule(module: string): boolean {
  return module.startsWith('cms:')
}

function renderAdminContent(
  nav: NavigationState,
  setNav: (n: NavigationState) => void,
): JSX.Element {
  // CMS
  if (nav.module === 'cms:home') return <HomeView onNavigate={setNav} />
  if (nav.module === 'cms:my-tasks') return <MyTasksView />
  if (nav.module === 'cms:approvals') return <ApprovalsView />
  if (nav.module === 'cms:brand') {
    if (!nav.currentBrand) {
      return (
        <div className="text-sm text-slate-500">
          Seleccioná una marca con el switcher de arriba (Ctrl + K).
        </div>
      )
    }
    return (
      <BrandView
        brandSlug={nav.currentBrand}
        activeTab={(nav.activeTab ?? 'overview') as BrandTab}
        onNavigate={setNav}
      />
    )
  }

  // Admin legacy (super_admin only)
  if (nav.module === 'admin') {
    const sub = nav.submodule as AdminSubmoduleKey
    switch (sub) {
      case 'overview':
        return <AdminDashboardView />
      case 'leads':
        return <AdminLeadsView />
      case 'campaigns':
        return <AdminCampaignsView />
      case 'brands':
        return <AdminBrandsView />
      case 'users':
        return <AdminUsersView />
      case 'audit':
        return <AdminAuditView />
      case 'settings':
        return <AdminSettingsView />
      case 'fx_rates':
        return <FxRatesView />
      default:
        return <AdminDashboardView />
    }
  }

  return <div>Vista no encontrada: {nav.module}</div>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
