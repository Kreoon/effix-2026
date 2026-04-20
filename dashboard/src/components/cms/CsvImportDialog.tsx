import { useRef, useState } from 'react'
import Papa from 'papaparse'
import { Loader2, Upload, X, AlertTriangle, CheckCircle2, type LucideIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { computeSpendUsd } from '@/hooks/useSpendEntries'
import { SUPPORTED_CURRENCIES, formatUsd } from '@/lib/cms'

interface Row {
  index: number
  fecha: string
  platform: string
  currency: string
  amount_local: number
  campaign?: string | null
  notes?: string | null
  /** Calculados al validar */
  fx_rate?: number
  fx_date?: string
  amount_usd?: number
  error?: string
}

interface Props {
  strategyId: string
  onClose: () => void
  onCommitted: () => void
}

/**
 * Importa CSV al libro diario. Columnas esperadas (cabecera obligatoria):
 *   fecha, platform, currency, amount_local, campaign (opcional), notes (opcional)
 *
 * Formato fecha: YYYY-MM-DD. Moneda: USD|CRC|COP|DOP|GTQ.
 */
export function CsvImportDialog({ strategyId, onClose, onCommitted }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const qc = useQueryClient()
  const [fileName, setFileName] = useState<string>('')
  const [rows, setRows] = useState<Row[]>([])
  const [parsing, setParsing] = useState(false)
  const [committing, setCommitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'validated' | 'committed'>('idle')
  const [summary, setSummary] = useState<{ ok: number; err: number; totalUsd: number } | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setParsing(true)
    setStatus('idle')

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const raw = result.data
        const validated: Row[] = []
        let ok = 0
        let err = 0
        let totalUsd = 0

        for (let i = 0; i < raw.length; i++) {
          const r = raw[i]
          const row: Row = {
            index: i + 2, // header + 1-indexed
            fecha: (r.fecha || '').trim(),
            platform: (r.platform || '').trim().toLowerCase(),
            currency: (r.currency || '').trim().toUpperCase(),
            amount_local: Number(r.amount_local || 0),
            campaign: r.campaign?.trim() || null,
            notes: r.notes?.trim() || null,
          }

          // Validaciones básicas
          if (!row.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(row.fecha)) {
            row.error = 'fecha inválida (formato YYYY-MM-DD)'
          } else if (!row.platform) {
            row.error = 'platform vacío'
          } else if (!SUPPORTED_CURRENCIES.includes(row.currency as (typeof SUPPORTED_CURRENCIES)[number])) {
            row.error = `currency no soportada (usar ${SUPPORTED_CURRENCIES.join('|')})`
          } else if (!row.amount_local || row.amount_local <= 0) {
            row.error = 'amount_local debe ser > 0'
          } else {
            try {
              const c = await computeSpendUsd({
                fecha: row.fecha,
                currency: row.currency,
                amount_local: row.amount_local,
              })
              row.fx_rate = c.fx_rate
              row.fx_date = c.fx_date
              row.amount_usd = c.amount_usd
              totalUsd += c.amount_usd
              ok++
            } catch (e) {
              row.error = e instanceof Error ? e.message : 'fx_rate no disponible'
            }
          }
          if (row.error) err++
          validated.push(row)
        }

        setRows(validated)
        setSummary({ ok, err, totalUsd })
        setStatus('validated')
        setParsing(false)
      },
      error: (e) => {
        setParsing(false)
        alert(e.message)
      },
    })
  }

  async function commit() {
    if (rows.length === 0) return
    setCommitting(true)
    try {
      // Crear registro de import
      const { data: importRec, error: impErr } = await supabase
        .from('admin_effix_csv_imports')
        .insert({
          strategy_id: strategyId,
          file_name: fileName,
          status: 'validating',
          rows_total: rows.length,
          rows_ok: rows.filter((r) => !r.error).length,
          rows_error: rows.filter((r) => r.error).length,
          error_report: {
            errors: rows.filter((r) => r.error).map((r) => ({ row: r.index, error: r.error })),
          },
        })
        .select('id')
        .single()
      if (impErr) throw impErr

      // Solo insertar filas válidas
      const valid = rows.filter((r) => !r.error && r.amount_usd != null)
      const payload = valid.map((r) => ({
        fecha: r.fecha,
        strategy_id: strategyId,
        campaign_id: null,
        platform: r.platform,
        amount_local: r.amount_local,
        currency: r.currency,
        fx_rate: r.fx_rate!,
        fx_date: r.fx_date!,
        amount_usd: r.amount_usd!,
        source: 'csv_import',
        csv_import_id: importRec.id,
        notes: r.notes,
      }))

      if (payload.length > 0) {
        const { error: insErr } = await supabase.from('admin_effix_spend_entries').insert(payload)
        if (insErr) {
          await supabase
            .from('admin_effix_csv_imports')
            .update({ status: 'failed', rolled_back_at: new Date().toISOString() })
            .eq('id', importRec.id)
          throw insErr
        }
      }

      await supabase
        .from('admin_effix_csv_imports')
        .update({ status: 'committed', committed_at: new Date().toISOString() })
        .eq('id', importRec.id)

      setStatus('committed')
      qc.invalidateQueries({ queryKey: ['cms-spend'] })
      setTimeout(() => {
        onCommitted()
        onClose()
      }, 1200)
    } catch (e) {
      alert('Error al importar: ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setCommitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0E2A47]">Importar libro diario desde CSV</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-xs text-sky-900">
            <p className="font-medium mb-1">Formato esperado (cabecera obligatoria)</p>
            <code className="block font-mono bg-white rounded p-2 text-[11px]">
              fecha,platform,currency,amount_local,campaign,notes
              <br />
              2026-04-18,meta,USD,125.50,F1 Conversations,Test
              <br />
              2026-04-18,google,CRC,65000,Brand,
            </code>
            <p className="mt-2 text-[11px]">
              Fecha: YYYY-MM-DD · currency: {SUPPORTED_CURRENCIES.join(' · ')} · campaign y notes opcionales.
            </p>
          </div>

          {status === 'idle' && (
            <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={parsing}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm hover:bg-[#0A1F35] disabled:opacity-60"
              >
                {parsing ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                Elegir CSV
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                hidden
                onChange={handleFile}
              />
            </div>
          )}

          {status === 'validated' && summary && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Filas OK" value={summary.ok} color="text-emerald-700" icon={CheckCircle2} />
                <StatBox
                  label="Filas con error"
                  value={summary.err}
                  color="text-red-700"
                  icon={AlertTriangle}
                />
                <StatBox label="Total USD (OK)" value={formatUsd(summary.totalUsd)} color="text-[#0E2A47]" />
              </div>

              <div className="rounded-lg border border-slate-200 overflow-x-auto max-h-72">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-2 py-2 text-left">#</th>
                      <th className="px-2 py-2 text-left">Fecha</th>
                      <th className="px-2 py-2 text-left">Plat</th>
                      <th className="px-2 py-2 text-right">Local</th>
                      <th className="px-2 py-2 text-left">Cur</th>
                      <th className="px-2 py-2 text-right">USD</th>
                      <th className="px-2 py-2 text-left">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.slice(0, 100).map((r) => (
                      <tr key={r.index} className={r.error ? 'bg-red-50' : 'hover:bg-slate-50'}>
                        <td className="px-2 py-1.5">{r.index}</td>
                        <td className="px-2 py-1.5">{r.fecha}</td>
                        <td className="px-2 py-1.5">{r.platform}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">{r.amount_local}</td>
                        <td className="px-2 py-1.5">{r.currency}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">
                          {r.amount_usd ? formatUsd(r.amount_usd) : '—'}
                        </td>
                        <td className="px-2 py-1.5 text-red-700">{r.error ?? ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rows.length > 100 && (
                  <p className="p-2 text-center text-xs text-slate-500">
                    Mostrando primeras 100 de {rows.length} filas
                  </p>
                )}
              </div>
            </div>
          )}

          {status === 'committed' && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center text-emerald-900">
              <CheckCircle2 className="inline-block mr-2" size={18} />
              Import aplicado correctamente.
            </div>
          )}
        </div>

        {status === 'validated' && (
          <footer className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {summary?.err
                ? `${summary.err} filas con error NO se importarán. Podés corregir y re-subir.`
                : 'Todas las filas son válidas.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={commit}
                disabled={committing || summary?.ok === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm disabled:opacity-60"
              >
                {committing && <Loader2 size={14} className="animate-spin" />}
                Importar {summary?.ok ?? 0} filas
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string
  value: string | number
  color: string
  icon?: LucideIcon
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
        {Icon && <Icon size={12} />}
        {label}
      </div>
      <p className={`text-xl font-semibold tabular-nums ${color}`}>{value}</p>
    </div>
  )
}
