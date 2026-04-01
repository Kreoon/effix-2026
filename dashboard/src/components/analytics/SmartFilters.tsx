import { useState } from 'react'
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react'
import type { SmartFilters } from '@/data/analytics-helpers'

interface SmartFiltersProps {
  filters: SmartFilters
  onChange: (filters: SmartFilters) => void
}

const DEFAULT_FILTERS: SmartFilters = {
  minRoas: 0,
  minQuantity: 0,
  minSpend: 0,
  ticketTypes: ['vip', 'tres_dias', 'un_dia'],
  onlyWithSales: false,
}

export function SmartFiltersPanel({ filters, onChange }: SmartFiltersProps) {
  const [open, setOpen] = useState(false)

  const toggleTicketType = (type: 'vip' | 'tres_dias' | 'un_dia') => {
    const current = filters.ticketTypes
    const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    if (next.length === 0) return // Siempre al menos uno
    onChange({ ...filters, ticketTypes: next })
  }

  const handleReset = () => onChange(DEFAULT_FILTERS)

  const isActive =
    filters.minRoas > 0 ||
    filters.minQuantity > 0 ||
    filters.minSpend > 0 ||
    filters.ticketTypes.length < 3 ||
    filters.onlyWithSales

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-slate-400" />
          <span>Filtros inteligentes</span>
          {isActive && (
            <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
              Activos
            </span>
          )}
        </div>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-700 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ROAS minimo */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              ROAS minimo
              <span className="ml-2 text-slate-200 normal-case font-semibold">
                {filters.minRoas === 0 ? 'Sin filtro' : `${filters.minRoas.toFixed(1)}x`}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={filters.minRoas}
              onChange={(e) => onChange({ ...filters, minRoas: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
              aria-label="ROAS minimo"
            />
            <div className="flex justify-between text-xs text-slate-600">
              <span>0x</span>
              <span>10x</span>
            </div>
          </div>

          {/* Ventas minimas */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Ventas minimas
              <span className="ml-2 text-slate-200 normal-case font-semibold">
                {filters.minQuantity === 0 ? 'Sin filtro' : `${filters.minQuantity} boletas`}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={filters.minQuantity}
              onChange={(e) => onChange({ ...filters, minQuantity: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
              aria-label="Ventas minimas"
            />
            <div className="flex justify-between text-xs text-slate-600">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          {/* Tipo de boleta */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Tipo de boleta
            </span>
            <div className="flex flex-col gap-2">
              {(
                [
                  { key: 'vip', label: 'VIP' },
                  { key: 'tres_dias', label: '3 Dias' },
                  { key: 'un_dia', label: '1 Dia' },
                ] as { key: 'vip' | 'tres_dias' | 'un_dia'; label: string }[]
              ).map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={filters.ticketTypes.includes(key)}
                    onChange={() => toggleTicketType(key)}
                    className="accent-blue-500 cursor-pointer"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Opciones
            </span>
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.onlyWithSales}
                onChange={(e) => onChange({ ...filters, onlyWithSales: e.target.checked })}
                className="accent-blue-500 cursor-pointer"
              />
              Solo dias con ventas
            </label>
            <button
              onClick={handleReset}
              disabled={!isActive}
              className="mt-auto flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Limpiar filtros"
            >
              <X size={13} />
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
