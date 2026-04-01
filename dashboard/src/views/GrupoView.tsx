import {
  ArrowRight,
  Calendar,
  Globe,
  Heart,
  Home,
  Server,
  Settings,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { brands, countryCurrencies, type Brand } from '@/data/mock-data'
import { brandModules, type NavigationState } from '@/data/brand-modules'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface GrupoViewProps {
  onNavigate?: (nav: NavigationState) => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  ShoppingCart,
  Server,
  Heart,
  Home,
  Globe,
  User,
  Users,
}

function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? Globe
}

/**
 * Devuelve la moneda local del primer pais de la marca.
 * Si no hay paises o el pais no esta en el mapa, cae en USD.
 */
function getCurrencyForBrand(brand: Brand): { currency: string; symbol: string; trm: number } {
  const firstCountry = brand.countries[0]
  return countryCurrencies[firstCountry] ?? { currency: 'USD', symbol: '$', trm: 1 }
}

/**
 * Formatea un valor USD a la moneda local de la marca.
 */
function formatLocalCurrency(usdValue: number, currency: { currency: string; symbol: string; trm: number }): string {
  const localValue = usdValue * currency.trm
  if (currency.currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(localValue)
  }
  // Para monedas LATAM: abreviar con M (millones) o K (miles)
  if (localValue >= 1_000_000) {
    const millions = localValue / 1_000_000
    return `${currency.symbol}${millions.toFixed(1)}M`
  }
  if (localValue >= 1_000) {
    const thousands = localValue / 1_000
    return `${currency.symbol}${thousands.toFixed(1)}K`
  }
  return `${currency.symbol}${Math.round(localValue).toLocaleString('es-CO')}`
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

interface AuditBarProps {
  score: number
}

function AuditBar({ score }: AuditBarProps) {
  if (score === 0) {
    return <span className="text-xs text-slate-600">Sin auditoria</span>
  }

  const colorBar =
    score < 40
      ? 'bg-red-500'
      : score < 67
        ? 'bg-yellow-500'
        : 'bg-green-500'

  const colorText =
    score < 40
      ? 'text-red-400'
      : score < 67
        ? 'text-yellow-400'
        : 'text-green-400'

  // 5 puntos para la barra de progreso visual
  const filledDots = Math.round((score / 100) * 5)

  return (
    <div className="flex items-center gap-2">
      <span className={cn('text-xs font-semibold tabular-nums', colorText)}>
        {score}/100
      </span>
      <div className="flex gap-0.5" aria-label={`Score de auditoria: ${score} de 100`} role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'w-3 h-1.5 rounded-full',
              i < filledDots ? colorBar : 'bg-slate-700',
            )}
          />
        ))}
      </div>
    </div>
  )
}

interface RoasValueProps {
  roas: number
}

function RoasValue({ roas }: RoasValueProps) {
  if (roas === 0) {
    return <span className="text-slate-500">—</span>
  }
  const color =
    roas >= 3
      ? 'text-green-400'
      : roas >= 1
        ? 'text-yellow-400'
        : 'text-red-400'

  return (
    <span className={cn('font-semibold tabular-nums', color)}>
      {roas.toFixed(2)}x
    </span>
  )
}

// ─── Card activa ──────────────────────────────────────────────────────────────

interface ActiveBrandCardProps {
  brand: Brand
  iconName: string
  onNavigate?: (nav: NavigationState) => void
}

function ActiveBrandCard({ brand, iconName, onNavigate }: ActiveBrandCardProps) {
  const Icon = getIcon(iconName)
  const currency = getCurrencyForBrand(brand)

  const spentLocal = formatLocalCurrency(brand.spent_usd, currency)
  const revenueLocal =
    brand.revenue_usd > 0 ? formatLocalCurrency(brand.revenue_usd, currency) : '—'

  const countryLabel = brand.countries.join(', ')

  function handleClick() {
    onNavigate?.({ module: brand.slug, submodule: 'resumen' })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors cursor-pointer flex flex-col gap-4"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalle de ${brand.name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
            <Icon size={16} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-slate-100 font-semibold text-sm leading-tight truncate">
              {brand.name}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">{countryLabel}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30 shrink-0">
          Activo
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <p className="text-slate-500 mb-0.5">Conversiones</p>
          <p className="text-slate-200 font-medium tabular-nums">
            {brand.conversions > 0 ? brand.conversions.toLocaleString('es-CO') : '—'}
          </p>
        </div>
        <div>
          <p className="text-slate-500 mb-0.5">Gasto ({currency.currency})</p>
          <p className="text-slate-200 font-medium tabular-nums">
            {brand.spent_usd > 0 ? spentLocal : '—'}
          </p>
        </div>
        <div>
          <p className="text-slate-500 mb-0.5">Revenue ({currency.currency})</p>
          <p className="text-slate-200 font-medium tabular-nums">{revenueLocal}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-0.5">ROAS</p>
          <RoasValue roas={brand.roas} />
        </div>
      </div>

      {/* Auditoria */}
      <div>
        <p className="text-slate-500 text-xs mb-1.5">Auditoria</p>
        <AuditBar score={brand.audit_score} />
      </div>

      {/* Footer */}
      <div className="pt-1 border-t border-slate-700/60">
        <span className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
          Ver detalle
          <ArrowRight size={12} aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}

// ─── Card sin campanas ────────────────────────────────────────────────────────

interface InactiveBrandCardProps {
  brand: Brand
  iconName: string
  onNavigate?: (nav: NavigationState) => void
}

function InactiveBrandCard({ brand, iconName, onNavigate }: InactiveBrandCardProps) {
  const Icon = getIcon(iconName)
  const countryLabel = brand.countries.join(', ')

  function handleClick() {
    onNavigate?.({ module: brand.slug, submodule: 'resumen' })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors cursor-pointer flex flex-col gap-4 opacity-70"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Configurar ${brand.name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-slate-700/50 text-slate-500 shrink-0">
            <Icon size={16} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-slate-400 font-semibold text-sm leading-tight truncate">
              {brand.name}
            </h3>
            <p className="text-slate-600 text-xs mt-0.5">{countryLabel}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-slate-600/40 text-slate-400 border-slate-600/40 shrink-0">
          Sin campanas
        </span>
      </div>

      {/* Estado vacio */}
      <div className="flex-1 flex items-center justify-center py-4">
        <p className="text-slate-600 text-sm text-center">Sin campanas activas</p>
      </div>

      {/* Footer */}
      <div className="pt-1 border-t border-slate-700/60">
        <span className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-400 transition-colors font-medium">
          <Settings size={11} aria-hidden="true" />
          Configurar
        </span>
      </div>
    </article>
  )
}

// ─── Vista principal ──────────────────────────────────────────────────────────

export function GrupoView({ onNavigate }: GrupoViewProps) {
  // Cruzar brands con brandModules para obtener el icono de cada marca
  const brandIconMap = new Map<string, string>(
    brandModules.map((bm) => [bm.slug, bm.icon]),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-100 font-bold text-lg">
          Grupo Effi — Resumen por Empresa
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Cada marca muestra sus KPIs en moneda local. Los datos no se consolidan entre marcas.
        </p>
      </div>

      {/* Grid de cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="list"
        aria-label="Marcas del grupo"
      >
        {brands.map((brand) => {
          const iconName = brandIconMap.get(brand.slug) ?? 'Globe'
          const hasActiveCampaigns = brand.status !== 'sin-campanas'

          return (
            <div key={brand.slug} role="listitem">
              {hasActiveCampaigns ? (
                <ActiveBrandCard
                  brand={brand}
                  iconName={iconName}
                  onNavigate={onNavigate}
                />
              ) : (
                <InactiveBrandCard
                  brand={brand}
                  iconName={iconName}
                  onNavigate={onNavigate}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
