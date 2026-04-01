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
    countries: ['COL', 'ECU', 'RD'],
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
    countries: ['GUA', 'CRI'],
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

export interface NavigationState {
  module: 'dashboard' | string // 'dashboard' or brand slug
  submodule: SubmoduleKey
}
