import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useCreateReport, useUpdateReport } from '@/hooks/useReports'
import { DualEditor } from './DualEditor'
import { formatUsd } from '@/lib/cms'
import type { CmsReport, ReportType } from '@/types/cms'

interface Props {
  report?: CmsReport
  strategyId: string
  onSaved: () => void
  onClose: () => void
}

export function ReportForm({ report, strategyId, onSaved, onClose }: Props) {
  const create = useCreateReport()
  const update = useUpdateReport()
  const qc = useQueryClient()
  const isEdit = Boolean(report)

  const today = new Date().toISOString().slice(0, 10)
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)

  const [form, setForm] = useState({
    type: (report?.type ?? 'weekly') as ReportType,
    period_start: report?.period_start ?? weekAgo,
    period_end: report?.period_end ?? today,
    body_md: report?.body_md ?? defaultReportBody(),
    kpis_snapshot: report?.kpis_snapshot ?? {},
  })
  const [loadingSnapshot, setLoadingSnapshot] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function regenerateSnapshot() {
    setLoadingSnapshot(true)
    try {
      const { data: spend } = await supabase
        .from('admin_effix_spend_entries')
        .select('amount_usd, platform')
        .eq('strategy_id', strategyId)
        .gte('fecha', form.period_start)
        .lte('fecha', form.period_end)

      const spendTotal = (spend ?? []).reduce((acc, r) => acc + Number(r.amount_usd || 0), 0)
      const byPlatform: Record<string, number> = {}
      ;(spend ?? []).forEach((r) => {
        byPlatform[r.platform] = (byPlatform[r.platform] ?? 0) + Number(r.amount_usd || 0)
      })

      const { count: requirementsCount } = await supabase
        .from('admin_effix_requirements')
        .select('id', { count: 'exact', head: true })
        .eq('strategy_id', strategyId)
        .eq('status', 'published')

      setForm((f) => ({
        ...f,
        kpis_snapshot: {
          spend_usd: spendTotal,
          spend_by_platform: byPlatform,
          requirements_published: requirementsCount ?? 0,
          period_days: diffDays(f.period_start, f.period_end),
          generated_at: new Date().toISOString(),
        },
      }))
    } finally {
      setLoadingSnapshot(false)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const payload = {
        strategy_id: strategyId,
        type: form.type,
        period_start: form.period_start,
        period_end: form.period_end,
        body_md: form.body_md,
        kpis_snapshot: form.kpis_snapshot,
      }
      if (isEdit && report) {
        await update.mutateAsync({ id: report.id, patch: payload })
      } else {
        await create.mutateAsync(payload)
      }
      qc.invalidateQueries({ queryKey: ['cms-reports'] })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const pending = create.isPending || update.isPending
  const snap = form.kpis_snapshot as {
    spend_usd?: number
    spend_by_platform?: Record<string, number>
    requirements_published?: number
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">{isEdit ? 'Editar reporte' : 'Nuevo reporte'}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Tipo">
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as ReportType,
                    period_start:
                      e.target.value === 'monthly'
                        ? monthAgo
                        : e.target.value === 'weekly'
                          ? weekAgo
                          : form.period_start,
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
                <option value="ad_hoc">Ad hoc</option>
              </select>
            </Field>
            <Field label="Inicio">
              <input
                type="date"
                value={form.period_start}
                onChange={(e) => setForm({ ...form, period_start: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Fin">
              <input
                type="date"
                value={form.period_end}
                onChange={(e) => setForm({ ...form, period_end: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Snapshot de KPIs
              </h3>
              <button
                type="button"
                onClick={regenerateSnapshot}
                disabled={loadingSnapshot}
                className="text-xs text-[#0E2A47] hover:underline inline-flex items-center gap-1"
              >
                {loadingSnapshot && <Loader2 size={12} className="animate-spin" />}
                Regenerar
              </button>
            </div>
            {!snap.spend_usd ? (
              <p className="text-xs text-slate-500">Clic en "Regenerar" para capturar KPIs del período.</p>
            ) : (
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <Dt label="Spend total" value={formatUsd(snap.spend_usd ?? 0)} />
                <Dt label="Requerimientos publicados" value={String(snap.requirements_published ?? 0)} />
                {snap.spend_by_platform &&
                  Object.entries(snap.spend_by_platform).map(([p, v]) => (
                    <Dt key={p} label={`Spend ${p}`} value={formatUsd(v as number)} />
                  ))}
              </dl>
            )}
          </div>

          <Field label="Body del reporte (markdown)">
            <DualEditor
              value={form.body_md}
              format="markdown"
              onChange={(v) => setForm({ ...form, body_md: v })}
              placeholder="Resumen ejecutivo, highlights, lowlights, acciones..."
              minHeight={280}
            />
          </Field>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <footer className="px-5 py-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm font-medium hover:bg-[#0A1F35] disabled:opacity-60"
          >
            {pending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? 'Guardar' : 'Crear'}
          </button>
        </footer>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

function Dt({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500 text-[11px]">{label}</dt>
      <dd className="text-[#0E2A47] font-medium tabular-nums">{value}</dd>
    </div>
  )
}

function diffDays(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000) + 1
}

function defaultReportBody(): string {
  return `# Reporte

## Resumen ejecutivo

…

## Highlights

-

## Lowlights

-

## Próximos pasos

-
`
}
