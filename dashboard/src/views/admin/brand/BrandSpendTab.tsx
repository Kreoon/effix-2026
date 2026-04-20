import { useMemo, useState } from 'react'
import { Plus, Upload, Download, Lock } from 'lucide-react'
import ExcelJS from 'exceljs'
import { useStrategies } from '@/hooks/useStrategies'
import { useSpendEntries, useReconcileMonth } from '@/hooks/useSpendEntries'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { SpendEntryForm } from '@/components/cms/SpendEntryForm'
import { CsvImportDialog } from '@/components/cms/CsvImportDialog'
import { formatUsd, formatLocalAmount, formatDate, PLATFORM_LABEL } from '@/lib/cms'
import type { AdPlatform, CmsBrand } from '@/types/cms'

export function BrandSpendTab({ brand }: { brand: CmsBrand }) {
  const { isAdmin } = useAdminProfile()
  const { data: strategies = [] } = useStrategies({ brandSlug: brand.slug })
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const effectiveStrategy = selectedStrategy || strategies[0]?.id || null
  const { data: entries = [], isLoading } = useSpendEntries({ strategyId: effectiveStrategy })
  const reconcile = useReconcileMonth()

  const [creating, setCreating] = useState(false)
  const [importing, setImporting] = useState(false)

  const totals = useMemo(() => {
    const byPlatform = new Map<string, number>()
    let totalUsd = 0
    entries.forEach((e) => {
      totalUsd += Number(e.amount_usd || 0)
      byPlatform.set(e.platform, (byPlatform.get(e.platform) ?? 0) + Number(e.amount_usd || 0))
    })
    return { totalUsd, byPlatform }
  }, [entries])

  async function handleReconcile() {
    if (!effectiveStrategy) return
    const today = new Date()
    const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const year = prev.getFullYear()
    const month = prev.getMonth() + 1
    if (
      !confirm(
        `¿Cerrar mes ${year}-${String(month).padStart(2, '0')}? Las entradas de ese período quedarán bloqueadas.`,
      )
    )
      return
    const n = await reconcile.mutateAsync({ strategyId: effectiveStrategy, year, month })
    alert(`${n} entradas reconciliadas.`)
  }

  async function exportXlsx() {
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Libro diario')
    ws.columns = [
      { header: 'Fecha', key: 'fecha', width: 12 },
      { header: 'Plataforma', key: 'platform', width: 14 },
      { header: 'Monto local', key: 'amount_local', width: 14 },
      { header: 'Moneda', key: 'currency', width: 8 },
      { header: 'FX', key: 'fx_rate', width: 12 },
      { header: 'USD', key: 'amount_usd', width: 14 },
      { header: 'Fuente', key: 'source', width: 14 },
      { header: 'Reconciliado', key: 'reconciled', width: 12 },
      { header: 'Notas', key: 'notes', width: 30 },
    ]
    ws.addRows(entries)
    ws.getRow(1).font = { bold: true }
    const buf = await wb.xlsx.writeBuffer()
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `libro-diario-${brand.slug}-${new Date().toISOString().slice(0, 10)}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A47]">Libro diario de inversión</h2>
          <p className="text-sm text-slate-600">Registro día a día con TRM y conversión USD.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {strategies.length > 0 && (
            <select
              value={effectiveStrategy ?? ''}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              {strategies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          )}
          {isAdmin && effectiveStrategy && (
            <>
              <button
                onClick={() => setCreating(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm font-medium hover:bg-[#0A1F35]"
              >
                <Plus size={14} /> Nuevo gasto
              </button>
              <button
                onClick={() => setImporting(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
              >
                <Upload size={14} /> Importar CSV
              </button>
              <button
                onClick={exportXlsx}
                disabled={entries.length === 0}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
              >
                <Download size={14} /> Export XLSX
              </button>
              <button
                onClick={handleReconcile}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                title="Cerrar mes anterior (bloquear entradas)"
              >
                <Lock size={14} /> Cerrar mes
              </button>
            </>
          )}
        </div>
      </div>

      {strategies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Creá una estrategia primero para registrar gastos.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Total período</p>
              <p className="text-2xl font-semibold text-[#0E2A47] tabular-nums">
                {formatUsd(totals.totalUsd)}
              </p>
            </div>
            {Array.from(totals.byPlatform.entries())
              .slice(0, 3)
              .map(([platform, amount]) => (
                <div key={platform} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    {PLATFORM_LABEL[platform as AdPlatform] ?? platform}
                  </p>
                  <p className="text-2xl font-semibold text-[#0E2A47] tabular-nums">
                    {formatUsd(amount)}
                  </p>
                </div>
              ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="text-left px-4 py-2.5">Fecha</th>
                  <th className="text-left px-4 py-2.5">Plataforma</th>
                  <th className="text-right px-4 py-2.5">Local</th>
                  <th className="text-right px-4 py-2.5">FX</th>
                  <th className="text-right px-4 py-2.5">USD</th>
                  <th className="text-left px-4 py-2.5">Fuente</th>
                  <th className="text-left px-4 py-2.5">Rec.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      Cargando...
                    </td>
                  </tr>
                )}
                {!isLoading && entries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      Sin entries. Registrá manualmente o importá un CSV.
                    </td>
                  </tr>
                )}
                {entries.slice(0, 200).map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-xs whitespace-nowrap">{formatDate(e.fecha)}</td>
                    <td className="px-4 py-2.5 text-xs">
                      {PLATFORM_LABEL[e.platform as AdPlatform] ?? e.platform}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">
                      {formatLocalAmount(e.amount_local, e.currency)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-slate-500 tabular-nums">
                      {e.fx_rate.toFixed(6)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-medium">
                      {formatUsd(e.amount_usd)}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{e.source}</td>
                    <td className="px-4 py-2.5">
                      {e.reconciled ? (
                        <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {creating && effectiveStrategy && (
        <SpendEntryForm
          strategyId={effectiveStrategy}
          onSaved={() => setCreating(false)}
          onClose={() => setCreating(false)}
        />
      )}

      {importing && effectiveStrategy && (
        <CsvImportDialog
          strategyId={effectiveStrategy}
          onClose={() => setImporting(false)}
          onCommitted={() => setImporting(false)}
        />
      )}
    </div>
  )
}
