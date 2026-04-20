/**
 * Tipos del CMS de producción de pauta (schema admin_effix_* CMS foundations).
 * Sincronizados con `sistema/supabase/migrations/20260418_cms_foundations.sql`.
 */

// ============================================================================
// Enums (strings literales — match con Postgres enums)
// ============================================================================

export type CmsArea = 'design' | 'audiovisual' | 'trafficker' | 'dev_web' | 'estratega' | 'finanzas'

export type RequirementStatus =
  | 'draft'
  | 'in_review'
  | 'changes_requested'
  | 'approved'
  | 'in_production'
  | 'qa'
  | 'published'
  | 'archived'
  | 'blocked'
  | 'cancelled'

export type CmsPriority = 'low' | 'normal' | 'high' | 'urgent'

export type StrategyStatus = 'draft' | 'active' | 'paused' | 'closed'

export type AssetKind = 'video' | 'image' | 'copy' | 'doc' | 'link' | 'design_file'

export type ApprovalStatus = 'pending' | 'approved' | 'changes_requested' | 'rejected'

export type LandingStatus = 'mockup' | 'dev' | 'qa' | 'live' | 'paused' | 'archived'

export type LandingTipo = 'lead_capture' | 'ventas' | 'waitlist' | 'comunidad' | 'evento'

export type ReportType = 'weekly' | 'monthly' | 'ad_hoc'

export type BriefFormat = 'markdown' | 'rich'

export type SpendSource = 'manual' | 'csv_import' | 'api_meta' | 'api_google' | 'api_tiktok'

export type CsvImportStatus = 'pending' | 'validating' | 'committed' | 'failed' | 'rolled_back'

export type AdPlatform = 'meta' | 'google' | 'tiktok' | 'whatsapp' | 'email' | 'referral' | 'organic' | 'other'

// ============================================================================
// Entidades (Row shapes — lo que devuelve Supabase al hacer select('*'))
// ============================================================================

export interface CmsBrand {
  slug: string
  name: string
  countries: string[]
  logo_url: string | null
  color_primary: string | null
  active: boolean
  display_order: number
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface FxRate {
  date: string           // ISO date (YYYY-MM-DD)
  currency: string
  rate_usd: number
  source: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface CmsStrategy {
  id: string
  brand_slug: string
  pais: string
  nombre: string
  periodo_start: string | null
  periodo_end: string | null
  objetivo_md: string | null
  estado: StrategyStatus
  owner_estratega: string | null
  budget_total_usd: number
  kpi_targets: Record<string, unknown>
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsLanding {
  id: string
  strategy_id: string
  slug: string | null
  url_vercel: string | null
  url_production: string | null
  screenshot_url: string | null
  funnel: string | null
  tipo: LandingTipo
  status: LandingStatus
  notes_md: string | null
  kpis_snapshot: Record<string, unknown> | null
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsRequirement {
  id: string
  strategy_id: string
  area: CmsArea
  title: string
  brief_md: string | null
  brief_rich: Record<string, unknown> | null
  brief_format: BriefFormat
  priority: CmsPriority
  status: RequirementStatus
  assignee_id: string | null
  deadline: string | null
  template_used: string | null
  revision_count: number
  review_comments_md: string | null
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsAsset {
  id: string
  requirement_id: string
  kind: AssetKind
  platform: string | null
  format: string | null
  duration_s: number | null
  copy_text_md: string | null
  storage_path: string | null
  external_url: string | null
  file_size_bytes: number | null
  mime_type: string | null
  thumbnail_url: string | null
  variant_label: string | null
  approved: boolean
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsApproval {
  id: string
  ap_code: string
  entity_type: 'requirement' | 'asset' | 'budget' | 'landing' | 'strategy'
  entity_id: string
  requested_by: string | null
  approver_id: string | null
  status: ApprovalStatus
  request_md: string | null
  decision_md: string | null
  approved_snapshot: Record<string, unknown> | null
  requested_at: string
  decided_at: string | null
  metadata: Record<string, unknown>
}

export interface CmsBudget {
  id: string
  strategy_id: string
  platform: string
  period_start: string
  period_end: string
  amount_usd: number
  amount_local: number | null
  currency: string
  notes_md: string | null
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsSpendEntry {
  id: string
  fecha: string
  strategy_id: string
  campaign_id: string | null
  platform: string
  amount_local: number
  currency: string
  fx_rate: number
  fx_date: string
  amount_usd: number
  source: SpendSource
  csv_import_id: string | null
  reconciled: boolean
  reconciled_by: string | null
  reconciled_at: string | null
  notes: string | null
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CmsCsvImport {
  id: string
  strategy_id: string | null
  file_name: string | null
  status: CsvImportStatus
  rows_total: number | null
  rows_ok: number | null
  rows_error: number | null
  error_report: Record<string, unknown> | null
  imported_by: string | null
  imported_at: string
  committed_at: string | null
  rolled_back_at: string | null
}

export interface CmsReport {
  id: string
  strategy_id: string
  type: ReportType
  period_start: string
  period_end: string
  kpis_snapshot: Record<string, unknown>
  body_md: string | null
  exported_pdf_url: string | null
  exported_xlsx_url: string | null
  metadata: Record<string, unknown>
  created_by: string | null
  created_at: string
  updated_at: string
}

// ============================================================================
// Payloads de RPCs
// ============================================================================

export interface ComputeSpendUsdResult {
  fx_rate: number
  fx_date: string
  amount_usd: number
}

export interface CreateApprovalResult {
  id: string
  ap_code: string
}
