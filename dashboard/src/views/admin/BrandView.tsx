import { useBrand } from '@/hooks/useBrands'
import { BrandOverviewTab } from './brand/BrandOverviewTab'
import { BrandStrategiesTab } from './brand/BrandStrategiesTab'
import { BrandRequirementsTab } from './brand/BrandRequirementsTab'
import { BrandLandingsTab } from './brand/BrandLandingsTab'
import { BrandBudgetTab } from './brand/BrandBudgetTab'
import { BrandSpendTab } from './brand/BrandSpendTab'
import { BrandReportsTab } from './brand/BrandReportsTab'
import { BRAND_TABS, BRAND_TAB_LABELS, type BrandTab, type NavigationState } from '@/data/brand-modules'
import { COUNTRY_LABELS } from '@/lib/cms'

interface BrandViewProps {
  brandSlug: string
  activeTab: BrandTab
  currentCountry?: string
  onNavigate: (nav: NavigationState) => void
}

export function BrandView({ brandSlug, activeTab, currentCountry, onNavigate }: BrandViewProps) {
  const { data: brand, isLoading } = useBrand(brandSlug)

  // Inicializar país por defecto si no hay uno seleccionado
  useEffect(() => {
    if (brand && !currentCountry && brand.countries.length > 0) {
      onNavigate({
        module: 'cms:brand',
        submodule: activeTab,
        currentBrand: brandSlug,
        currentCountry: brand.countries[0],
        activeTab: activeTab,
      })
    }
  }, [brand, currentCountry, brandSlug, activeTab, onNavigate])

  if (isLoading) {
    return <div className="text-sm text-slate-500 text-center py-20">Cargando marca...</div>
  }

  if (!brand) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        <h3 className="font-semibold mb-1">Marca no encontrada</h3>
        <p>
          No existe una marca con slug <code className="font-mono">{brandSlug}</code>.
        </p>
      </div>
    )
  }

  function setTab(tab: BrandTab) {
    onNavigate({
      module: 'cms:brand',
      submodule: tab,
      currentBrand: brandSlug,
      currentCountry,
      activeTab: tab,
    })
  }

  function setCountry(country: string) {
    onNavigate({
      module: 'cms:brand',
      submodule: activeTab,
      currentBrand: brandSlug,
      currentCountry: country,
      activeTab,
    })
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {brand.logo_url ? (
            <img src={brand.logo_url} alt={brand.name} className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-100 p-1" />
          ) : (
            <span
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ background: brand.color_primary ?? '#0E2A47' }}
            >
              {brand.name.substring(0, 1)}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-bold text-[#0E2A47] tracking-tight">{brand.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                CMS
              </span>
              <span className="text-slate-300 text-xs text-center">•</span>
              <p className="text-xs text-slate-500">
                Gestión de pauta y requerimientos operativos
              </p>
            </div>
          </div>
        </div>

        {/* Selector de País */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-sm">
          {brand.countries.map((c) => {
            const active = c === currentCountry
            return (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  active
                    ? 'bg-white text-[#0E2A47] shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-[#0E2A47] hover:bg-slate-50'
                }`}
              >
                {COUNTRY_LABELS[c] ?? c}
              </button>
            )
          })}
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-slate-200 -mx-1 flex flex-wrap gap-1 px-1 overflow-x-auto scrollbar-hide">
        {BRAND_TABS.map((t) => {
          const active = t === activeTab
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg -mb-px border-b-2 ${
                active
                  ? 'border-[#1BC49C] text-[#0E2A47] bg-white'
                  : 'border-transparent text-slate-500 hover:text-[#0E2A47] hover:bg-slate-50'
              }`}
            >
              {BRAND_TAB_LABELS[t]}
            </button>
          )
        })}
      </nav>

      <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'overview' && <BrandOverviewTab brand={brand} currentCountry={currentCountry} onNavigate={onNavigate} />}
        {activeTab === 'strategies' && <BrandStrategiesTab brand={brand} currentCountry={currentCountry} />}
        {activeTab === 'requirements' && <BrandRequirementsTab brand={brand} currentCountry={currentCountry} />}
        {activeTab === 'landings' && <BrandLandingsTab brand={brand} currentCountry={currentCountry} />}
        {activeTab === 'budget' && <BrandBudgetTab brand={brand} currentCountry={currentCountry} />}
        {activeTab === 'spend' && <BrandSpendTab brand={brand} currentCountry={currentCountry} />}
        {activeTab === 'reports' && <BrandReportsTab brand={brand} currentCountry={currentCountry} />}
      </div>
    </div>
  )
}
