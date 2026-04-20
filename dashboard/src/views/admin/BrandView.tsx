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
  onNavigate: (nav: NavigationState) => void
}

export function BrandView({ brandSlug, activeTab, onNavigate }: BrandViewProps) {
  const { data: brand, isLoading } = useBrand(brandSlug)

  if (isLoading) {
    return <div className="text-sm text-slate-500">Cargando marca...</div>
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
    onNavigate({ module: 'cms:brand', submodule: tab, currentBrand: brandSlug, activeTab: tab })
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: brand.color_primary ?? '#94a3b8' }}
          />
          <div>
            <h1 className="text-2xl font-semibold text-[#0E2A47]">{brand.name}</h1>
            <p className="text-sm text-slate-600">
              {brand.countries.map((c) => COUNTRY_LABELS[c] ?? c).join(' · ')}
            </p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-slate-200 -mx-1 flex flex-wrap gap-1 px-1 overflow-x-auto">
        {BRAND_TABS.map((t) => {
          const active = t === activeTab
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-md -mb-px border-b-2 ${
                active
                  ? 'border-[#1BC49C] text-[#0E2A47]'
                  : 'border-transparent text-slate-500 hover:text-[#0E2A47]'
              }`}
            >
              {BRAND_TAB_LABELS[t]}
            </button>
          )
        })}
      </nav>

      <div>
        {activeTab === 'overview' && <BrandOverviewTab brand={brand} onNavigate={onNavigate} />}
        {activeTab === 'strategies' && <BrandStrategiesTab brand={brand} />}
        {activeTab === 'requirements' && <BrandRequirementsTab brand={brand} />}
        {activeTab === 'landings' && <BrandLandingsTab brand={brand} />}
        {activeTab === 'budget' && <BrandBudgetTab brand={brand} />}
        {activeTab === 'spend' && <BrandSpendTab brand={brand} />}
        {activeTab === 'reports' && <BrandReportsTab brand={brand} />}
      </div>
    </div>
  )
}
