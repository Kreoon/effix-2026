import rawData from './excel-raw.json'

export interface SalesEntry {
  date: string
  revenue_cop: number
  revenue_usd: number
  quantity: number
  ad_spend_cop: number
  ad_spend_usd: number
  vip: number
  tres_dias: number
  un_dia: number
  roas: number
}

export interface GoogleAdsEntry {
  date: string
  platform: string
  revenue_cop: number
  quantity: number
  ad_spend_cop: number
  ad_spend_usd: number
}

export const salesData2025: SalesEntry[] = rawData.boleteria_2025 as SalesEntry[]
export const salesData2026: SalesEntry[] = rawData.boleteria_2026 as SalesEntry[]
export const googleAdsData: GoogleAdsEntry[] = rawData.google_ads as GoogleAdsEntry[]

export function getAvailableMonths(data: SalesEntry[]): string[] {
  const months = new Set(data.map((e) => e.date.slice(0, 7)))
  return Array.from(months).sort()
}

export function filterByMonth(data: SalesEntry[], month: string): SalesEntry[] {
  return data.filter((e) => e.date.startsWith(month))
}

export interface Totals {
  totalRevenue: number
  totalQuantity: number
  totalSpend: number
  totalVip: number
  totalTresDias: number
  totalUnDia: number
  roas: number
}

export function calculateTotals(entries: SalesEntry[]): Totals {
  const totalRevenue = entries.reduce((s, e) => s + e.revenue_cop, 0)
  const totalQuantity = entries.reduce((s, e) => s + e.quantity, 0)
  const totalSpend = entries.reduce((s, e) => s + e.ad_spend_cop, 0)
  const totalVip = entries.reduce((s, e) => s + e.vip, 0)
  const totalTresDias = entries.reduce((s, e) => s + e.tres_dias, 0)
  const totalUnDia = entries.reduce((s, e) => s + e.un_dia, 0)
  const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0
  return { totalRevenue, totalQuantity, totalSpend, totalVip, totalTresDias, totalUnDia, roas }
}

export function getMonthLabel(month: string): string {
  const [year, m] = month.split('-')
  const date = new Date(Number(year), Number(m) - 1, 1)
  return date.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
}
