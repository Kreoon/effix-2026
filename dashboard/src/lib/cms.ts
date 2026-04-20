/**
 * Helpers y constantes del CMS de pauta.
 */

import type {
  CmsArea,
  CmsPriority,
  RequirementStatus,
  ApprovalStatus,
  StrategyStatus,
  LandingStatus,
  AdPlatform,
} from '@/types/cms'

// ============================================================================
// Config UI — labels y colores por enum (single source of truth)
// ============================================================================

export const AREA_META: Record<CmsArea, { label: string; color: string; bg: string; icon: string }> = {
  design: {
    label: 'Diseño',
    color: 'text-pink-700',
    bg: 'bg-pink-100',
    icon: 'Palette',
  },
  audiovisual: {
    label: 'Audiovisual',
    color: 'text-violet-700',
    bg: 'bg-violet-100',
    icon: 'Film',
  },
  trafficker: {
    label: 'Trafficker',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    icon: 'Target',
  },
  dev_web: {
    label: 'Desarrollo Web',
    color: 'text-sky-700',
    bg: 'bg-sky-100',
    icon: 'Code',
  },
  estratega: {
    label: 'Estratega',
    color: 'text-[#0E2A47]',
    bg: 'bg-amber-100',
    icon: 'Lightbulb',
  },
  finanzas: {
    label: 'Finanzas',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    icon: 'Wallet',
  },
}

export const REQUIREMENT_STATUS_META: Record<
  RequirementStatus,
  { label: string; color: string; bg: string; next: RequirementStatus[] }
> = {
  draft: { label: 'Borrador', color: 'text-slate-700', bg: 'bg-slate-100', next: ['in_review', 'cancelled'] },
  in_review: { label: 'En revisión', color: 'text-amber-700', bg: 'bg-amber-100', next: ['approved', 'changes_requested', 'cancelled'] },
  changes_requested: { label: 'Cambios pedidos', color: 'text-orange-700', bg: 'bg-orange-100', next: ['in_review', 'draft', 'cancelled'] },
  approved: { label: 'Aprobado', color: 'text-emerald-700', bg: 'bg-emerald-100', next: ['in_production', 'cancelled'] },
  in_production: { label: 'En producción', color: 'text-sky-700', bg: 'bg-sky-100', next: ['qa', 'blocked'] },
  qa: { label: 'QA', color: 'text-indigo-700', bg: 'bg-indigo-100', next: ['published', 'in_production'] },
  published: { label: 'Publicado', color: 'text-white', bg: 'bg-emerald-500', next: ['archived'] },
  archived: { label: 'Archivado', color: 'text-slate-500', bg: 'bg-slate-100', next: [] },
  blocked: { label: 'Bloqueado', color: 'text-red-700', bg: 'bg-red-100', next: ['in_production', 'cancelled'] },
  cancelled: { label: 'Cancelado', color: 'text-slate-500', bg: 'bg-slate-200', next: [] },
}

export const PRIORITY_META: Record<CmsPriority, { label: string; color: string; bg: string }> = {
  low: { label: 'Baja', color: 'text-slate-600', bg: 'bg-slate-100' },
  normal: { label: 'Normal', color: 'text-sky-700', bg: 'bg-sky-50' },
  high: { label: 'Alta', color: 'text-amber-700', bg: 'bg-amber-100' },
  urgent: { label: 'Urgente', color: 'text-white', bg: 'bg-red-500' },
}

export const STRATEGY_STATUS_META: Record<StrategyStatus, { label: string; color: string; bg: string }> = {
  draft: { label: 'Borrador', color: 'text-slate-700', bg: 'bg-slate-100' },
  active: { label: 'Activa', color: 'text-white', bg: 'bg-emerald-500' },
  paused: { label: 'Pausada', color: 'text-orange-700', bg: 'bg-orange-100' },
  closed: { label: 'Cerrada', color: 'text-slate-500', bg: 'bg-slate-200' },
}

export const LANDING_STATUS_META: Record<LandingStatus, { label: string; color: string; bg: string }> = {
  mockup: { label: 'Mockup', color: 'text-slate-700', bg: 'bg-slate-100' },
  dev: { label: 'En desarrollo', color: 'text-sky-700', bg: 'bg-sky-100' },
  qa: { label: 'QA', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  live: { label: 'En vivo', color: 'text-white', bg: 'bg-emerald-500' },
  paused: { label: 'Pausada', color: 'text-orange-700', bg: 'bg-orange-100' },
  archived: { label: 'Archivada', color: 'text-slate-500', bg: 'bg-slate-100' },
}

export const APPROVAL_STATUS_META: Record<ApprovalStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pendiente', color: 'text-amber-700', bg: 'bg-amber-100' },
  approved: { label: 'Aprobado', color: 'text-white', bg: 'bg-emerald-500' },
  changes_requested: { label: 'Cambios pedidos', color: 'text-orange-700', bg: 'bg-orange-100' },
  rejected: { label: 'Rechazado', color: 'text-white', bg: 'bg-red-500' },
}

export const PLATFORM_LABEL: Record<AdPlatform, string> = {
  meta: 'Meta',
  google: 'Google',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
  email: 'Email',
  referral: 'Referidos',
  organic: 'Orgánico',
  other: 'Otro',
}

export const AREA_ORDER: CmsArea[] = ['estratega', 'design', 'audiovisual', 'trafficker', 'dev_web', 'finanzas']

// ============================================================================
// Constantes de negocio
// ============================================================================

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024 // 25 MB

export const SUPPORTED_CURRENCIES = ['USD', 'CRC', 'COP', 'DOP', 'GTQ'] as const

export const COUNTRY_LABELS: Record<string, string> = {
  CR: 'Costa Rica',
  CRI: 'Costa Rica',
  CO: 'Colombia',
  COL: 'Colombia',
  EC: 'Ecuador',
  ECU: 'Ecuador',
  RD: 'Rep. Dominicana',
  GT: 'Guatemala',
  GUA: 'Guatemala',
  US: 'Estados Unidos',
  USA: 'Estados Unidos',
}

// ============================================================================
// Formatters
// ============================================================================

export function formatUsd(amount: number | null | undefined, opts?: { showCurrency?: boolean }): string {
  if (amount == null) return '—'
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return opts?.showCurrency === false ? formatted : `$${formatted}`
}

export function formatLocalAmount(
  amount: number | null | undefined,
  currency: string,
): string {
  if (amount == null) return '—'
  const formatted = amount.toLocaleString('es-CR', {
    minimumFractionDigits: currency === 'CRC' || currency === 'COP' ? 0 : 2,
    maximumFractionDigits: 2,
  })
  const symbols: Record<string, string> = {
    CRC: '₡',
    COP: '$',
    DOP: 'RD$',
    GTQ: 'Q',
    USD: '$',
  }
  return `${symbols[currency] ?? currency + ' '}${formatted}`
}

export function formatDate(iso: string | null | undefined, opts?: { includeTime?: boolean }): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  if (opts?.includeTime) {
    return d.toLocaleString('es-CR', { dateStyle: 'short', timeStyle: 'short' })
  }
  return d.toLocaleDateString('es-CR', { dateStyle: 'short' })
}

export function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(d)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function getWeekIso(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

// ============================================================================
// Utilidades markdown / sanitize
// ============================================================================

export function truncateMarkdown(md: string, max = 180): string {
  const stripped = md
    .replace(/#+\s+/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
  return stripped.length > max ? stripped.slice(0, max - 1) + '…' : stripped
}

// ============================================================================
// Storage path builders
// ============================================================================

export function storagePath(
  kind: 'requirement' | 'landing' | 'brand',
  ids: { requirementId?: string; landingId?: string; brandSlug?: string },
  fileName: string,
): string {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  if (kind === 'requirement' && ids.requirementId)
    return `requirements/${ids.requirementId}/${Date.now()}-${safeName}`
  if (kind === 'landing' && ids.landingId)
    return `landings/${ids.landingId}/${Date.now()}-${safeName}`
  if (kind === 'brand' && ids.brandSlug) return `brands/${ids.brandSlug}/${safeName}`
  throw new Error('storagePath: parámetros incompletos')
}
// ============================================================================
// Integraciones Externas (Drive, YouTube, Vimeo, Loom, etc.)
// ============================================================================

export type ExternalSource = 'google_drive' | 'youtube' | 'vimeo' | 'loom' | 'other'

/**
 * Detecta la fuente y el ID de una URL externa
 */
export function parseExternalUrl(url: string | null | undefined): { source: ExternalSource; id: string | null } {
  if (!url) return { source: 'other', id: null }

  // Google Drive
  const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (driveMatch || url.includes('drive.google.com')) {
    return { source: 'google_drive', id: driveMatch ? driveMatch[1] : null }
  }

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
  if (ytMatch) return { source: 'youtube', id: ytMatch[1] }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)
  if (vimeoMatch) return { source: 'vimeo', id: vimeoMatch[1] }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loomMatch) return { source: 'loom', id: loomMatch[1] }

  return { source: 'other', id: null }
}

/**
 * Genera la URL de incrustación (embed) para un iframe
 */
export function getEmbedUrl(url: string | null | undefined): string | null {
  const { source, id } = parseExternalUrl(url)
  if (!id) return null

  switch (source) {
    case 'google_drive':
      return `https://drive.google.com/file/d/${id}/preview`
    case 'youtube':
      return `https://www.youtube.com/embed/${id}`
    case 'vimeo':
      return `https://player.vimeo.com/video/${id}`
    case 'loom':
      return `https://www.loom.com/embed/${id}`
    default:
      return null
  }
}
