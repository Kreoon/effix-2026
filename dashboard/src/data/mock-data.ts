export type BrandStatus = 'activo' | 'pausado' | 'sin-campanas'
export type CampaignStatus = 'activo' | 'pausado' | 'learning'
export type CampaignHealth = 'verde' | 'amarillo' | 'rojo'
export type CreativeType = 'copy' | 'guion' | 'video' | 'banner' | 'landing' | 'vsl'
export type CreativeStatus = 'borrador' | 'pendiente' | 'aprobado' | 'produccion' | 'publicado'

// Monedas y TRM por pais
export const countryCurrencies: Record<string, { currency: string; symbol: string; trm: number }> = {
  COL: { currency: 'COP', symbol: '$', trm: 4180 },
  ECU: { currency: 'USD', symbol: '$', trm: 1 },    // Ecuador usa USD
  RD:  { currency: 'DOP', symbol: 'RD$', trm: 60.5 },
  GUA: { currency: 'GTQ', symbol: 'Q', trm: 7.75 },
  CRI: { currency: 'CRC', symbol: '₡', trm: 510 },
}

export interface Platform {
  name: string
  spent_usd: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
}

export interface Brand {
  id: string
  name: string
  slug: string
  countries: string[]
  vertical: string
  status: BrandStatus
  budget_usd: number
  spent_usd: number
  impressions: number
  clicks: number
  conversions: number
  revenue_usd: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
  audit_score: number
  platforms: Platform[]
}

export interface Campaign {
  brand_slug: string
  platform: string
  name: string
  status: CampaignStatus
  budget_daily_usd: number
  spent_usd: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  cpa: number
  health: CampaignHealth
}

export interface SpendEntry {
  date: string
  brand_slug: string
  platform: string
  spend_usd: number
  spend_cop: number
  clicks: number
  conversions: number
}

export interface Creative {
  id: string
  brand_slug: string
  code: string
  type: CreativeType
  status: CreativeStatus
  owner: string
  due_date: string
}

// ─── MARCAS ───────────────────────────────────────────────────────────────────

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Feria Effix 2026',
    slug: 'feria-effix',
    countries: ['COL'],
    vertical: 'Evento ecommerce',
    status: 'activo',
    budget_usd: 40000,
    spent_usd: 296,
    impressions: 1702,
    clicks: 300,
    conversions: 0,
    revenue_usd: 0,
    ctr: 17.6,
    cpc: 0.99,
    cpa: 0,
    roas: 0,
    audit_score: 33,
    platforms: [
      {
        name: 'google-ads',
        spent_usd: 296,
        clicks: 300,
        conversions: 0,
        ctr: 12.45,
        cpc: 0.99,
        cpa: 0,
        roas: 0,
      },
    ],
  },
  {
    id: '2',
    name: 'EffiCommerce',
    slug: 'efficommerce',
    countries: ['COL', 'ECU', 'RD'],
    vertical: 'Software ecommerce',
    status: 'activo',
    budget_usd: 5000,
    spent_usd: 3200,
    impressions: 145000,
    clicks: 4800,
    conversions: 12,
    revenue_usd: 18400,
    ctr: 3.31,
    cpc: 0.67,
    cpa: 266.67,
    roas: 5.75,
    audit_score: 62,
    platforms: [
      {
        name: 'meta-ads',
        spent_usd: 2100,
        clicks: 3200,
        conversions: 8,
        ctr: 3.8,
        cpc: 0.66,
        cpa: 262.5,
        roas: 6.1,
      },
      {
        name: 'google-ads',
        spent_usd: 1100,
        clicks: 1600,
        conversions: 4,
        ctr: 2.4,
        cpc: 0.69,
        cpa: 275,
        roas: 5.09,
      },
    ],
  },
  {
    id: '3',
    name: 'Effi System',
    slug: 'effi-system',
    countries: ['COL', 'ECU', 'RD', 'GUA', 'CRI'],
    vertical: 'Sistemas y tecnologia',
    status: 'activo',
    budget_usd: 3000,
    spent_usd: 1800,
    impressions: 88000,
    clicks: 2640,
    conversions: 8,
    revenue_usd: 9600,
    ctr: 3.0,
    cpc: 0.68,
    cpa: 225,
    roas: 5.33,
    audit_score: 55,
    platforms: [
      {
        name: 'meta-ads',
        spent_usd: 1200,
        clicks: 1800,
        conversions: 5,
        ctr: 3.2,
        cpc: 0.67,
        cpa: 240,
        roas: 5.0,
      },
      {
        name: 'google-ads',
        spent_usd: 600,
        clicks: 840,
        conversions: 3,
        ctr: 2.6,
        cpc: 0.71,
        cpa: 200,
        roas: 5.83,
      },
    ],
  },
  {
    id: '4',
    name: 'EffiWoman',
    slug: 'effiwoman',
    countries: ['COL'],
    vertical: 'Empoderamiento femenino',
    status: 'activo',
    budget_usd: 2000,
    spent_usd: 1500,
    impressions: 62000,
    clicks: 1860,
    conversions: 5,
    revenue_usd: 5250,
    ctr: 3.0,
    cpc: 0.81,
    cpa: 300,
    roas: 3.5,
    audit_score: 48,
    platforms: [
      {
        name: 'meta-ads',
        spent_usd: 1000,
        clicks: 1200,
        conversions: 3,
        ctr: 3.4,
        cpc: 0.83,
        cpa: 333.33,
        roas: 3.15,
      },
      {
        name: 'tiktok-ads',
        spent_usd: 500,
        clicks: 660,
        conversions: 2,
        ctr: 2.6,
        cpc: 0.76,
        cpa: 250,
        roas: 4.2,
      },
    ],
  },
  {
    id: '5',
    name: 'Sara Montoya',
    slug: 'sara-montoya',
    countries: ['COL'],
    vertical: 'Marca Personal',
    status: 'activo',
    budget_usd: 1000,
    spent_usd: 800,
    impressions: 41000,
    clicks: 1230,
    conversions: 200,
    revenue_usd: 0,
    ctr: 3.0,
    cpc: 0.65,
    cpa: 4,
    roas: 0,
    audit_score: 71,
    platforms: [
      {
        name: 'meta-ads',
        spent_usd: 800,
        clicks: 1230,
        conversions: 200,
        ctr: 3.0,
        cpc: 0.65,
        cpa: 4,
        roas: 0,
      },
    ],
  },
  {
    id: '6',
    name: 'Juan Carmona',
    slug: 'juan-carmona',
    countries: ['COL'],
    vertical: 'Marca Personal',
    status: 'activo',
    budget_usd: 1000,
    spent_usd: 900,
    impressions: 38000,
    clicks: 1140,
    conversions: 95,
    revenue_usd: 0,
    ctr: 3.0,
    cpc: 0.79,
    cpa: 9.47,
    roas: 0,
    audit_score: 68,
    platforms: [
      {
        name: 'meta-ads',
        spent_usd: 900,
        clicks: 1140,
        conversions: 95,
        ctr: 3.0,
        cpc: 0.79,
        cpa: 9.47,
        roas: 0,
      },
    ],
  },
  {
    id: '7',
    name: 'Effi Living',
    slug: 'effi-living',
    countries: ['COL'],
    vertical: 'Lifestyle y hogar',
    status: 'sin-campanas',
    budget_usd: 0,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue_usd: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    audit_score: 0,
    platforms: [],
  },
  {
    id: '8',
    name: 'Efficaex',
    slug: 'efficaex',
    countries: ['GUA', 'CRI'],
    vertical: 'Evento ecommerce Centroamerica',
    status: 'sin-campanas',
    budget_usd: 0,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue_usd: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    audit_score: 0,
    platforms: [],
  },
  {
    id: '9',
    name: 'Oswaldo Alarcon',
    slug: 'oswaldo-alarcon',
    countries: ['COL'],
    vertical: 'Lider marca personal',
    status: 'sin-campanas',
    budget_usd: 0,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue_usd: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    audit_score: 0,
    platforms: [],
  },
  {
    id: '10',
    name: 'Grupo Effi Eventos',
    slug: 'grupo-effi-eventos',
    countries: ['COL'],
    vertical: 'Eventos generales',
    status: 'sin-campanas',
    budget_usd: 0,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue_usd: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
    audit_score: 0,
    platforms: [],
  },
]

// ─── CAMPANAS ─────────────────────────────────────────────────────────────────

export const campaigns: Campaign[] = [
  // Feria Effix
  {
    brand_slug: 'feria-effix',
    platform: 'google-ads',
    name: '[Search] Marca Effix',
    status: 'activo',
    budget_daily_usd: 10,
    spent_usd: 52,
    impressions: 700,
    clicks: 217,
    conversions: 0,
    ctr: 31.0,
    cpc: 0.24,
    cpa: 0,
    health: 'verde',
  },
  {
    brand_slug: 'feria-effix',
    platform: 'google-ads',
    name: '[Search] Categoria F1',
    status: 'activo',
    budget_daily_usd: 19,
    spent_usd: 244,
    impressions: 1002,
    clicks: 83,
    conversions: 0,
    ctr: 11.51,
    cpc: 2.40,
    cpa: 0,
    health: 'rojo',
  },
  {
    brand_slug: 'feria-effix',
    platform: 'google-ads',
    name: '[Search] Boletas General',
    status: 'pausado',
    budget_daily_usd: 20,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    health: 'amarillo',
  },
  {
    brand_slug: 'feria-effix',
    platform: 'google-ads',
    name: '[Search] Experiencia Black',
    status: 'pausado',
    budget_daily_usd: 25,
    spent_usd: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0,
    health: 'amarillo',
  },
  // EffiCommerce
  {
    brand_slug: 'efficommerce',
    platform: 'meta-ads',
    name: '[Meta] Trafico COL — TOFU',
    status: 'activo',
    budget_daily_usd: 25,
    spent_usd: 1200,
    impressions: 78000,
    clicks: 1950,
    conversions: 5,
    ctr: 2.5,
    cpc: 0.62,
    cpa: 240,
    health: 'verde',
  },
  {
    brand_slug: 'efficommerce',
    platform: 'meta-ads',
    name: '[Meta] Conversion ECU — BOFU',
    status: 'activo',
    budget_daily_usd: 20,
    spent_usd: 900,
    impressions: 42000,
    clicks: 1260,
    conversions: 3,
    ctr: 3.0,
    cpc: 0.71,
    cpa: 300,
    health: 'amarillo',
  },
  {
    brand_slug: 'efficommerce',
    platform: 'google-ads',
    name: '[Search] Ecommerce Tools',
    status: 'activo',
    budget_daily_usd: 15,
    spent_usd: 1100,
    impressions: 25000,
    clicks: 1590,
    conversions: 4,
    ctr: 6.36,
    cpc: 0.69,
    cpa: 275,
    health: 'verde',
  },
  // Effi System
  {
    brand_slug: 'effi-system',
    platform: 'meta-ads',
    name: '[Meta] SaaS LATAM — TOFU',
    status: 'activo',
    budget_daily_usd: 20,
    spent_usd: 1200,
    impressions: 56000,
    clicks: 1680,
    conversions: 5,
    ctr: 3.0,
    cpc: 0.71,
    cpa: 240,
    health: 'verde',
  },
  {
    brand_slug: 'effi-system',
    platform: 'google-ads',
    name: '[Search] Gestion Inventario',
    status: 'activo',
    budget_daily_usd: 10,
    spent_usd: 600,
    impressions: 18000,
    clicks: 960,
    conversions: 3,
    ctr: 5.33,
    cpc: 0.63,
    cpa: 200,
    health: 'verde',
  },
  // EffiWoman
  {
    brand_slug: 'effiwoman',
    platform: 'meta-ads',
    name: '[Meta] Moda COL — TOFU',
    status: 'activo',
    budget_daily_usd: 18,
    spent_usd: 1000,
    impressions: 40000,
    clicks: 1200,
    conversions: 3,
    ctr: 3.0,
    cpc: 0.83,
    cpa: 333,
    health: 'amarillo',
  },
  {
    brand_slug: 'effiwoman',
    platform: 'tiktok-ads',
    name: '[TikTok] Moda Gen-Z',
    status: 'learning',
    budget_daily_usd: 12,
    spent_usd: 500,
    impressions: 22000,
    clicks: 660,
    conversions: 2,
    ctr: 3.0,
    cpc: 0.76,
    cpa: 250,
    health: 'amarillo',
  },
  // Sara Montoya
  {
    brand_slug: 'sara-montoya',
    platform: 'meta-ads',
    name: '[Meta] Perfil — Awareness',
    status: 'activo',
    budget_daily_usd: 15,
    spent_usd: 800,
    impressions: 41000,
    clicks: 1230,
    conversions: 200,
    ctr: 3.0,
    cpc: 0.65,
    cpa: 4,
    health: 'verde',
  },
  // Juan Carmona
  {
    brand_slug: 'juan-carmona',
    platform: 'meta-ads',
    name: '[Meta] Perfil — Engagement',
    status: 'activo',
    budget_daily_usd: 15,
    spent_usd: 900,
    impressions: 38000,
    clicks: 1140,
    conversions: 95,
    ctr: 3.0,
    cpc: 0.79,
    cpa: 9.47,
    health: 'verde',
  },
]

// ─── SPEND ENTRIES (ultimas 4 semanas) ────────────────────────────────────────

const TRM = 4180

function makeSpend(
  date: string,
  brand_slug: string,
  platform: string,
  spend_usd: number,
  clicks: number,
  conversions: number,
): SpendEntry {
  return {
    date,
    brand_slug,
    platform,
    spend_usd,
    spend_cop: Math.round(spend_usd * TRM),
    clicks,
    conversions,
  }
}

export const spendEntries: SpendEntry[] = [
  // Semana 1 — 03 Mar
  makeSpend('2026-03-03', 'feria-effix', 'google-ads', 42, 48, 0),
  makeSpend('2026-03-03', 'efficommerce', 'meta-ads', 520, 780, 2),
  makeSpend('2026-03-03', 'efficommerce', 'google-ads', 240, 350, 1),
  makeSpend('2026-03-03', 'effi-system', 'meta-ads', 380, 560, 2),
  makeSpend('2026-03-03', 'effiwoman', 'meta-ads', 280, 360, 1),
  makeSpend('2026-03-03', 'sara-montoya', 'meta-ads', 175, 280, 48),
  makeSpend('2026-03-03', 'juan-carmona', 'meta-ads', 195, 250, 22),
  // Semana 2 — 10 Mar
  makeSpend('2026-03-10', 'feria-effix', 'google-ads', 68, 85, 0),
  makeSpend('2026-03-10', 'efficommerce', 'meta-ads', 560, 840, 2),
  makeSpend('2026-03-10', 'efficommerce', 'google-ads', 260, 380, 1),
  makeSpend('2026-03-10', 'effi-system', 'meta-ads', 410, 600, 1),
  makeSpend('2026-03-10', 'effi-system', 'google-ads', 145, 210, 1),
  makeSpend('2026-03-10', 'effiwoman', 'meta-ads', 310, 400, 1),
  makeSpend('2026-03-10', 'effiwoman', 'tiktok-ads', 120, 160, 0),
  makeSpend('2026-03-10', 'sara-montoya', 'meta-ads', 195, 300, 52),
  makeSpend('2026-03-10', 'juan-carmona', 'meta-ads', 210, 270, 24),
  // Semana 3 — 17 Mar
  makeSpend('2026-03-17', 'feria-effix', 'google-ads', 94, 112, 0),
  makeSpend('2026-03-17', 'efficommerce', 'meta-ads', 590, 880, 2),
  makeSpend('2026-03-17', 'efficommerce', 'google-ads', 290, 420, 1),
  makeSpend('2026-03-17', 'effi-system', 'meta-ads', 440, 640, 2),
  makeSpend('2026-03-17', 'effi-system', 'google-ads', 155, 230, 1),
  makeSpend('2026-03-17', 'effiwoman', 'meta-ads', 220, 280, 1),
  makeSpend('2026-03-17', 'effiwoman', 'tiktok-ads', 180, 240, 1),
  makeSpend('2026-03-17', 'sara-montoya', 'meta-ads', 210, 330, 55),
  makeSpend('2026-03-17', 'juan-carmona', 'meta-ads', 240, 295, 26),
  // Semana 4 — 24 Mar
  makeSpend('2026-03-24', 'feria-effix', 'google-ads', 92, 55, 0),
  makeSpend('2026-03-24', 'efficommerce', 'meta-ads', 430, 700, 2),
  makeSpend('2026-03-24', 'efficommerce', 'google-ads', 310, 450, 1),
  makeSpend('2026-03-24', 'effi-system', 'meta-ads', 370, 540, 0),
  makeSpend('2026-03-24', 'effi-system', 'google-ads', 300, 390, 1),
  makeSpend('2026-03-24', 'effiwoman', 'meta-ads', 190, 240, 0),
  makeSpend('2026-03-24', 'effiwoman', 'tiktok-ads', 200, 260, 1),
  makeSpend('2026-03-24', 'sara-montoya', 'meta-ads', 220, 320, 45),
  makeSpend('2026-03-24', 'juan-carmona', 'meta-ads', 255, 325, 23),
]

// ─── CREATIVOS ────────────────────────────────────────────────────────────────

export const creatives: Creative[] = [
  {
    id: 'c001',
    brand_slug: 'feria-effix',
    code: 'EFF-CP-001',
    type: 'copy',
    status: 'publicado',
    owner: 'Alexander',
    due_date: '2026-03-01',
  },
  {
    id: 'c002',
    brand_slug: 'feria-effix',
    code: 'EFF-VID-002',
    type: 'video',
    status: 'produccion',
    owner: 'Diana',
    due_date: '2026-04-05',
  },
  {
    id: 'c003',
    brand_slug: 'feria-effix',
    code: 'EFF-LND-003',
    type: 'landing',
    status: 'aprobado',
    owner: 'Alexander',
    due_date: '2026-04-10',
  },
  {
    id: 'c004',
    brand_slug: 'feria-effix',
    code: 'EFF-BAN-004',
    type: 'banner',
    status: 'pendiente',
    owner: 'Diana',
    due_date: '2026-04-12',
  },
  {
    id: 'c005',
    brand_slug: 'feria-effix',
    code: 'EFF-GUI-005',
    type: 'guion',
    status: 'borrador',
    owner: 'Alexander',
    due_date: '2026-04-20',
  },
  {
    id: 'c006',
    brand_slug: 'efficommerce',
    code: 'EC-VID-001',
    type: 'video',
    status: 'publicado',
    owner: 'Diana',
    due_date: '2026-03-10',
  },
  {
    id: 'c007',
    brand_slug: 'efficommerce',
    code: 'EC-CP-002',
    type: 'copy',
    status: 'publicado',
    owner: 'Alexander',
    due_date: '2026-03-08',
  },
  {
    id: 'c008',
    brand_slug: 'efficommerce',
    code: 'EC-VSL-003',
    type: 'vsl',
    status: 'produccion',
    owner: 'Alexander',
    due_date: '2026-04-08',
  },
  {
    id: 'c009',
    brand_slug: 'effi-system',
    code: 'ES-CP-001',
    type: 'copy',
    status: 'aprobado',
    owner: 'Alexander',
    due_date: '2026-04-03',
  },
  {
    id: 'c010',
    brand_slug: 'effi-system',
    code: 'ES-BAN-002',
    type: 'banner',
    status: 'borrador',
    owner: 'Diana',
    due_date: '2026-04-18',
  },
  {
    id: 'c011',
    brand_slug: 'effiwoman',
    code: 'EW-VID-001',
    type: 'video',
    status: 'publicado',
    owner: 'Diana',
    due_date: '2026-03-15',
  },
  {
    id: 'c012',
    brand_slug: 'effiwoman',
    code: 'EW-CP-002',
    type: 'copy',
    status: 'pendiente',
    owner: 'Alexander',
    due_date: '2026-04-07',
  },
  {
    id: 'c013',
    brand_slug: 'sara-montoya',
    code: 'SM-GUI-001',
    type: 'guion',
    status: 'aprobado',
    owner: 'Alexander',
    due_date: '2026-04-02',
  },
  {
    id: 'c014',
    brand_slug: 'juan-carmona',
    code: 'JC-VID-001',
    type: 'video',
    status: 'pendiente',
    owner: 'Diana',
    due_date: '2026-04-09',
  },
  {
    id: 'c015',
    brand_slug: 'juan-carmona',
    code: 'JC-LND-002',
    type: 'landing',
    status: 'borrador',
    owner: 'Alexander',
    due_date: '2026-04-22',
  },
]
