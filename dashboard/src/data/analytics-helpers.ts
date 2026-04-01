import { salesData2025, salesData2026, type SalesEntry } from './sales-data'

// Evento de referencia para cada feria
const EVENT_DATE_2025 = new Date(2025, 9, 1) // Oct 2025
const EVENT_DATE_2026 = new Date(2026, 9, 1) // Oct 2026

// Normalizar fecha a "meses antes del evento" (-14 a 0)
export function monthsBeforeEvent(dateStr: string, eventDate: Date): number {
  const d = new Date(dateStr)
  return (d.getFullYear() - eventDate.getFullYear()) * 12 + (d.getMonth() - eventDate.getMonth())
}

// Label legible de mes a partir de offset y fecha del evento
function monthLabelFromOffset(offset: number, eventDate: Date): string {
  const d = new Date(eventDate)
  d.setMonth(d.getMonth() + offset)
  return d.toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })
}

// Agrupar por mes normalizado
export interface MonthlyData {
  monthOffset: number
  monthLabel: string
  quantity: number
  revenue_cop: number
  ad_spend_cop: number
  vip: number
  tres_dias: number
  un_dia: number
  roas: number
  days_with_sales: number
  cumulative_quantity: number
}

export function aggregateByMonth(data: SalesEntry[], eventDate: Date): MonthlyData[] {
  const map = new Map<number, Omit<MonthlyData, 'cumulative_quantity'>>()

  for (const entry of data) {
    const offset = monthsBeforeEvent(entry.date, eventDate)
    if (!map.has(offset)) {
      map.set(offset, {
        monthOffset: offset,
        monthLabel: monthLabelFromOffset(offset, eventDate),
        quantity: 0,
        revenue_cop: 0,
        ad_spend_cop: 0,
        vip: 0,
        tres_dias: 0,
        un_dia: 0,
        roas: 0,
        days_with_sales: 0,
      })
    }
    const m = map.get(offset)!
    m.quantity += entry.quantity
    m.revenue_cop += entry.revenue_cop
    m.ad_spend_cop += entry.ad_spend_cop
    m.vip += entry.vip
    m.tres_dias += entry.tres_dias
    m.un_dia += entry.un_dia
    if (entry.quantity > 0) m.days_with_sales += 1
  }

  // Calcular ROAS por mes
  for (const m of map.values()) {
    m.roas = m.ad_spend_cop > 0 ? m.revenue_cop / m.ad_spend_cop : 0
  }

  // Ordenar por offset y calcular acumulado
  const sorted = Array.from(map.values()).sort((a, b) => a.monthOffset - b.monthOffset)
  let cumulative = 0
  const result: MonthlyData[] = sorted.map((m) => {
    cumulative += m.quantity
    return { ...m, cumulative_quantity: cumulative }
  })

  return result
}

export function getFeria2025Monthly(): MonthlyData[] {
  return aggregateByMonth(salesData2025, EVENT_DATE_2025)
}

export function getFeria2026Monthly(): MonthlyData[] {
  return aggregateByMonth(salesData2026, EVENT_DATE_2026)
}

// Smart filter function
export interface SmartFilters {
  minRoas: number
  minQuantity: number
  minSpend: number
  ticketTypes: ('vip' | 'tres_dias' | 'un_dia')[]
  onlyWithSales: boolean
}

export function applySmartFilters(data: SalesEntry[], filters: SmartFilters): SalesEntry[] {
  return data.filter((e) => {
    if (filters.minRoas > 0 && e.roas < filters.minRoas) return false
    if (filters.minQuantity > 0 && e.quantity < filters.minQuantity) return false
    if (filters.minSpend > 0 && e.ad_spend_cop < filters.minSpend) return false
    if (filters.onlyWithSales && e.quantity === 0) return false
    // Ticket type filter: solo mostrar entradas que tengan al menos uno de los tipos seleccionados
    if (filters.ticketTypes.length < 3) {
      const hasVip = filters.ticketTypes.includes('vip') && e.vip > 0
      const hasTres = filters.ticketTypes.includes('tres_dias') && e.tres_dias > 0
      const hasUno = filters.ticketTypes.includes('un_dia') && e.un_dia > 0
      if (!hasVip && !hasTres && !hasUno) return false
    }
    return true
  })
}

// Pattern detection
export interface Pattern {
  label: string
  value: string
  insight: string
}

export function detectPatterns(data: SalesEntry[]): Pattern[] {
  if (data.length === 0) return []

  const patterns: Pattern[] = []

  // Agrupar por mes para patrones mensuales
  const byMonth = new Map<string, { quantity: number; revenue_cop: number; ad_spend_cop: number }>()
  for (const e of data) {
    const m = e.date.slice(0, 7)
    if (!byMonth.has(m)) byMonth.set(m, { quantity: 0, revenue_cop: 0, ad_spend_cop: 0 })
    const mo = byMonth.get(m)!
    mo.quantity += e.quantity
    mo.revenue_cop += e.revenue_cop
    mo.ad_spend_cop += e.ad_spend_cop
  }

  // Mes con mas ventas
  let bestMonthQ = ''
  let bestMonthQVal = 0
  for (const [m, v] of byMonth.entries()) {
    if (v.quantity > bestMonthQVal) {
      bestMonthQVal = v.quantity
      bestMonthQ = m
    }
  }
  if (bestMonthQ) {
    const [yr, mo] = bestMonthQ.split('-')
    const label = new Date(Number(yr), Number(mo) - 1, 1).toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric',
    })
    patterns.push({
      label: 'Mes con mas ventas',
      value: label,
      insight: `${bestMonthQVal.toLocaleString('es-CO')} boletas vendidas en ese mes`,
    })
  }

  // Mes con mejor ROAS (solo meses con gasto > 0)
  let bestMonthRoas = ''
  let bestRoasVal = 0
  for (const [m, v] of byMonth.entries()) {
    if (v.ad_spend_cop > 0) {
      const roas = v.revenue_cop / v.ad_spend_cop
      if (roas > bestRoasVal) {
        bestRoasVal = roas
        bestMonthRoas = m
      }
    }
  }
  if (bestMonthRoas) {
    const [yr, mo] = bestMonthRoas.split('-')
    const label = new Date(Number(yr), Number(mo) - 1, 1).toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric',
    })
    patterns.push({
      label: 'Mes con mejor ROAS',
      value: label,
      insight: `ROAS de ${bestRoasVal.toFixed(2)}x en ese periodo`,
    })
  }

  // Dia de semana con mas ventas
  const byDow = [0, 0, 0, 0, 0, 0, 0]
  for (const e of data) {
    if (e.quantity > 0) {
      const dow = new Date(e.date).getDay()
      byDow[dow] += e.quantity
    }
  }
  const maxDow = byDow.indexOf(Math.max(...byDow))
  const dowNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  if (byDow[maxDow] > 0) {
    patterns.push({
      label: 'Mejor dia de la semana',
      value: dowNames[maxDow],
      insight: `${byDow[maxDow].toLocaleString('es-CO')} boletas históricamente los ${dowNames[maxDow]}`,
    })
  }

  // CPA promedio
  const totalSpend = data.reduce((s, e) => s + e.ad_spend_cop, 0)
  const totalQty = data.reduce((s, e) => s + e.quantity, 0)
  if (totalQty > 0 && totalSpend > 0) {
    const cpa = totalSpend / totalQty
    patterns.push({
      label: 'CPA promedio',
      value: '$' + Math.round(cpa).toLocaleString('es-CO'),
      insight: `Costo por boleta vendida con pauta activa`,
    })
  }

  // Velocidad de venta (boletas/dia promedio en dias con ventas)
  const diasConVentas = data.filter((e) => e.quantity > 0).length
  if (diasConVentas > 0) {
    const velocidad = totalQty / diasConVentas
    patterns.push({
      label: 'Velocidad de venta',
      value: velocidad.toFixed(1) + ' boletas/dia',
      insight: `Promedio en los ${diasConVentas} dias con al menos una venta`,
    })
  }

  // Correlacion gasto vs ventas (Pearson simplificado)
  const withBoth = data.filter((e) => e.ad_spend_cop > 0 && e.quantity > 0)
  if (withBoth.length > 2) {
    const n = withBoth.length
    const sumX = withBoth.reduce((s, e) => s + e.ad_spend_cop, 0)
    const sumY = withBoth.reduce((s, e) => s + e.quantity, 0)
    const sumXY = withBoth.reduce((s, e) => s + e.ad_spend_cop * e.quantity, 0)
    const sumX2 = withBoth.reduce((s, e) => s + e.ad_spend_cop ** 2, 0)
    const sumY2 = withBoth.reduce((s, e) => s + e.quantity ** 2, 0)
    const num = n * sumXY - sumX * sumY
    const den = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2))
    if (den > 0) {
      const r = num / den
      const level = Math.abs(r) > 0.7 ? 'alta' : Math.abs(r) > 0.4 ? 'media' : 'baja'
      patterns.push({
        label: 'Correlacion gasto-ventas',
        value: `r = ${r.toFixed(2)} (${level})`,
        insight:
          r > 0
            ? `A mayor inversion, mas ventas (correlacion ${level})`
            : `Relacion inversa detectada — revisar distribucion de gasto`,
      })
    }
  }

  return patterns
}

// Projection
export interface Projection {
  projected_quantity: number
  projected_revenue: number
  projected_spend: number
  projected_roas: number
  pct_of_2025: number
  confidence: 'baja' | 'media' | 'alta'
}

export function calculateProjection(
  monthly2025: MonthlyData[],
  monthly2026: MonthlyData[],
): Projection {
  // Total real de 2025
  const total2025 = monthly2025.reduce((s, m) => s + m.quantity, 0)
  const totalRevenue2025 = monthly2025.reduce((s, m) => s + m.revenue_cop, 0)
  const totalSpend2025 = monthly2025.reduce((s, m) => s + m.ad_spend_cop, 0)

  if (total2025 === 0 || monthly2026.length === 0) {
    return {
      projected_quantity: 0,
      projected_revenue: 0,
      projected_spend: 0,
      projected_roas: 0,
      pct_of_2025: 0,
      confidence: 'baja',
    }
  }

  // Offset mas reciente en 2026
  const latestOffset2026 = Math.max(...monthly2026.map((m) => m.monthOffset))

  // Cuanto habia vendido 2025 hasta ese mismo offset
  const sold2025AtSamePoint = monthly2025
    .filter((m) => m.monthOffset <= latestOffset2026)
    .reduce((s, m) => s + m.quantity, 0)

  // Cuanto lleva vendido 2026
  const sold2026Current = monthly2026.reduce((s, m) => s + m.quantity, 0)

  // Porcentaje del total 2025 que representaba ese punto
  const pctAt2025 = sold2025AtSamePoint > 0 ? sold2025AtSamePoint / total2025 : 0

  // Proyeccion: si 2026 lleva X cuando 2025 llevaba pct%, entonces proyectado = X / pct%
  const projected_quantity =
    pctAt2025 > 0 ? Math.round(sold2026Current / pctAt2025) : sold2026Current

  // Proyectar revenue y spend con la misma proporcion
  const avgRevPerUnit2025 = totalRevenue2025 / total2025
  const cpa2025 = totalSpend2025 / total2025
  const projected_revenue = projected_quantity * avgRevPerUnit2025
  const projected_spend = projected_quantity * cpa2025
  const projected_roas = projected_spend > 0 ? projected_revenue / projected_spend : 0
  const pct_of_2025 = projected_quantity / total2025

  // Confianza basada en cuantos meses hay de datos 2026
  const confidence: 'baja' | 'media' | 'alta' =
    monthly2026.length >= 6 ? 'alta' : monthly2026.length >= 3 ? 'media' : 'baja'

  return {
    projected_quantity,
    projected_revenue,
    projected_spend,
    projected_roas,
    pct_of_2025,
    confidence,
  }
}

// Budget estimator
export function estimateBudget(
  targetQuantity: number,
  monthly2025: MonthlyData[],
): {
  totalBudget: number
  monthlyDistribution: { monthOffset: number; monthLabel: string; budget: number; expectedSales: number }[]
  expectedRoas: number
} {
  const total2025Qty = monthly2025.reduce((s, m) => s + m.quantity, 0)
  const total2025Spend = monthly2025.reduce((s, m) => s + m.ad_spend_cop, 0)
  const total2025Revenue = monthly2025.reduce((s, m) => s + m.revenue_cop, 0)

  if (total2025Qty === 0) {
    return { totalBudget: 0, monthlyDistribution: [], expectedRoas: 0 }
  }

  const cpa2025 = total2025Spend / total2025Qty
  const totalBudget = targetQuantity * cpa2025

  const avgRevPerUnit = total2025Revenue / total2025Qty
  const expectedRevenue = targetQuantity * avgRevPerUnit
  const expectedRoas = totalBudget > 0 ? expectedRevenue / totalBudget : 0

  // Distribucion proporcional al gasto mensual 2025
  const monthlyDistribution = monthly2025
    .filter((m) => m.ad_spend_cop > 0)
    .map((m) => {
      const pct = m.ad_spend_cop / total2025Spend
      const budget = totalBudget * pct
      const expectedSales = Math.round(targetQuantity * (m.quantity / total2025Qty))
      return {
        monthOffset: m.monthOffset,
        monthLabel: m.monthLabel,
        budget,
        expectedSales,
      }
    })

  return { totalBudget, monthlyDistribution, expectedRoas }
}
