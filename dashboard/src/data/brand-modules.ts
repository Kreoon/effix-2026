export type SubmoduleKey =
  | 'resumen'
  | 'pauta'
  | 'estrategia'
  | 'analitica'
  | 'seguimiento'
  | 'financiero'
  | 'creativos'
  | 'operativo'

export interface BrandModule {
  slug: string
  name: string
  countries: string[]
  icon: string // lucide icon name
  submodules: SubmoduleKey[]
}

export const brandModules: BrandModule[] = [
  {
    slug: 'feria-effix',
    name: 'Feria Effix 2026',
    countries: ['COL'],
    icon: 'Calendar',
    submodules: ['resumen', 'pauta', 'estrategia', 'analitica', 'seguimiento', 'financiero', 'creativos', 'operativo'],
  },
  {
    slug: 'efficommerce',
    name: 'EffiCommerce',
    countries: ['COL', 'ECU', 'RD', 'CRI'],
    icon: 'ShoppingCart',
    submodules: ['resumen', 'pauta', 'estrategia', 'financiero', 'creativos', 'operativo'],
  },
  {
    slug: 'effi-system',
    name: 'Effi System',
    countries: ['COL', 'ECU', 'RD', 'GUA', 'CRI'],
    icon: 'Server',
    submodules: ['resumen', 'pauta', 'estrategia', 'financiero', 'operativo'],
  },
  {
    slug: 'effiwoman',
    name: 'EffiWoman',
    countries: ['COL'],
    icon: 'Heart',
    submodules: ['resumen', 'pauta', 'estrategia', 'financiero', 'creativos', 'operativo'],
  },
  {
    slug: 'effi-living',
    name: 'Effi Living',
    countries: ['COL'],
    icon: 'Home',
    submodules: ['resumen', 'financiero'],
  },
  {
    slug: 'efficaex',
    name: 'Efficaex',
    countries: ['GUA'],
    icon: 'Globe',
    submodules: ['resumen', 'pauta', 'estrategia', 'analitica', 'financiero', 'creativos', 'operativo'],
  },
  {
    slug: 'sara-montoya',
    name: 'Sara Montoya',
    countries: ['COL'],
    icon: 'User',
    submodules: ['resumen', 'pauta', 'financiero', 'creativos'],
  },
  {
    slug: 'juan-carmona',
    name: 'Juan Carmona',
    countries: ['COL'],
    icon: 'User',
    submodules: ['resumen', 'pauta', 'financiero', 'creativos'],
  },
  {
    slug: 'oswaldo-alarcon',
    name: 'Oswaldo Alarcon',
    countries: ['COL'],
    icon: 'User',
    submodules: ['resumen', 'financiero'],
  },
  {
    slug: 'grupo-effi-eventos',
    name: 'Grupo Effi Eventos',
    countries: ['COL'],
    icon: 'Users',
    submodules: ['resumen', 'estrategia', 'financiero'],
  },
]

export const submoduleLabels: Record<SubmoduleKey, string> = {
  resumen: 'Resumen',
  pauta: 'Pauta & Anuncios',
  estrategia: 'Estrategia',
  analitica: 'Analitica',
  seguimiento: 'Seguimiento',
  financiero: 'Financiero',
  creativos: 'Creativos',
  operativo: 'Operativo',
}

/**
 * Navigation state global de la app.
 *
 * - module === 'dashboard' → vista agregada del grupo (legacy)
 * - module === 'admin' → panel de administración (submodule = AdminSubmoduleKey)
 * - module === 'cms:home' → home operativo del CMS (widgets director)
 * - module === 'cms:my-tasks' → requerimientos asignados al user actual
 * - module === 'cms:approvals' → aprobaciones pendientes con el user
 * - module === 'cms:brand' → vista de marca del CMS (requiere currentBrand + activeTab)
 * - module === brandSlug → vista de marca LEGACY (submodule = SubmoduleKey)
 */
export type AdminSubmoduleKey =
  | 'overview'
  | 'leads'
  | 'campaigns'
  | 'users'
  | 'brands'
  | 'audit'
  | 'settings'
  | 'fx_rates'

/** Tabs dentro de la vista de marca del CMS */
export type BrandTab =
  | 'overview'
  | 'strategies'
  | 'requirements'
  | 'landings'
  | 'budget'
  | 'spend'
  | 'reports'

export const BRAND_TABS: readonly BrandTab[] = [
  'overview',
  'strategies',
  'requirements',
  'landings',
  'budget',
  'spend',
  'reports',
] as const

export const BRAND_TAB_LABELS: Record<BrandTab, string> = {
  overview: 'Resumen',
  strategies: 'Estrategias',
  requirements: 'Requerimientos',
  landings: 'Landings',
  budget: 'Presupuesto',
  spend: 'Libro diario',
  reports: 'Reportes',
}

export interface NavigationState {
  module: 'dashboard' | 'admin' | 'cms:home' | 'cms:my-tasks' | 'cms:approvals' | 'cms:brand' | string
  submodule: SubmoduleKey | AdminSubmoduleKey | BrandTab
  /** Activo solo cuando module === 'cms:brand' */
  currentBrand?: string
  /** Activo solo cuando module === 'cms:brand' */
  currentCountry?: string
  /** Activo solo cuando module === 'cms:brand' */
  activeTab?: BrandTab
}
