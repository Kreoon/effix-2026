/**
 * Tipos del schema admin_effix_* en Supabase.
 * Mantener sincronizado con la migración `20260417_admin_effix_schema.sql`.
 * Para regenerar automáticamente: `npx supabase gen types typescript`.
 */

export type AdminRole = 'super_admin' | 'admin' | 'viewer'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'demo_scheduled'
  | 'demo_done'
  | 'won'
  | 'lost'
  | 'opt_out'
  | 'duplicate'

export type AdPlatform =
  | 'meta'
  | 'google'
  | 'tiktok'
  | 'whatsapp'
  | 'email'
  | 'referral'
  | 'organic'

export type FunnelCode = 'A' | 'B' | 'cross'

export type CampaignStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'live'
  | 'paused'
  | 'ended'
  | 'archived'

export interface AdminProfile {
  id: string
  email: string
  full_name: string | null
  role: AdminRole
  is_active: boolean
  marca_scope: string[]
  pais_scope: string[]
  areas: string[]
  last_sign_in: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface AdminLead {
  id: string
  marca_slug: string
  pais: string
  funnel: FunnelCode
  source: AdPlatform
  nombre: string | null
  telefono: string | null
  email: string | null
  profile_type: string | null
  negocio_nombre: string | null
  negocio_url: string | null
  facturacion_mes: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  consent_ts: string
  consent_version: string | null
  status: LeadStatus
  score: number | null
  diagnostico: Record<string, unknown> | null
  sdr_owner: string | null
  wa_responded: boolean
  demo_scheduled: boolean
  demo_scheduled_at: string | null
  notes: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface AdminCampaign {
  id: string
  marca_slug: string
  pais: string
  platform: AdPlatform
  external_id: string | null
  name: string
  funnel: FunnelCode | null
  status: CampaignStatus
  budget_daily_usd: number | null
  budget_total_usd: number | null
  start_date: string | null
  end_date: string | null
  objectives: string[] | null
  audiences: unknown[]
  metrics_last: Record<string, unknown> | null
  metrics_updated_at: string | null
  created_by: string | null
  updated_by: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface AdminAuditLog {
  id: string
  user_id: string | null
  user_email: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  changes: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface AdminSetting {
  key: string
  value: unknown
  category: string | null
  description: string | null
  updated_by: string | null
  updated_at: string
}

type TableSchema<Row> = {
  Row: Row
  Insert: Partial<Row>
  Update: Partial<Row>
  Relationships: []
}

/**
 * Tipo Database para `createClient<Database>()`.
 * Sigue la forma esperada por @supabase/supabase-js v2
 * (Views/Enums/Functions/CompositeTypes obligatorios aunque sean {}).
 */
export type Database = {
  public: {
    Tables: {
      admin_effix_profiles: TableSchema<AdminProfile>
      admin_effix_leads: TableSchema<AdminLead>
      admin_effix_campaigns: TableSchema<AdminCampaign>
      admin_effix_audit_log: TableSchema<AdminAuditLog>
      admin_effix_settings: TableSchema<AdminSetting>
    }
    Views: Record<string, never>
    Functions: {
      admin_effix_current_role: {
        Args: Record<string, never>
        Returns: AdminRole | null
      }
      admin_effix_is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      admin_effix_is_super_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      admin_effix_promote_profile: {
        Args: { target_id: string; new_role: AdminRole }
        Returns: undefined
      }
      admin_effix_register_sign_in: {
        Args: Record<string, never>
        Returns: undefined
      }
    }
    Enums: {
      admin_effix_role: AdminRole
      admin_effix_lead_status: LeadStatus
      admin_effix_platform: AdPlatform
      admin_effix_funnel: FunnelCode
      admin_effix_campaign_status: CampaignStatus
    }
    CompositeTypes: Record<string, never>
  }
}
