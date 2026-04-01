import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/Layout'
import { type NavigationState } from '@/data/brand-modules'
import { GrupoView } from '@/views/GrupoView'
import { MarcaView } from '@/views/MarcaView'
import { FinancieroView } from '@/views/FinancieroView'
import { CreativosView } from '@/views/CreativosView'
import { OperativoView } from '@/views/OperativoView'
import { SeguimientoView } from '@/views/SeguimientoView'
import { LeadsView } from '@/views/LeadsView'
import { EstrategicoView } from '@/views/EstrategicoView'
import { AnaliticaView } from '@/views/AnaliticaView'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
})

function AppContent() {
  const [nav, setNav] = useState<NavigationState>({ module: 'dashboard', submodule: 'resumen' })

  // brandSlug solo existe cuando el usuario está dentro de una marca específica
  const brandSlug = nav.module !== 'dashboard' ? nav.module : undefined

  function renderView() {
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
      {renderView()}
    </Layout>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
