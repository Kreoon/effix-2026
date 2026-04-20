import { useEffect, useMemo, useState } from 'react'
import { Command } from 'cmdk'
import { Building2, Check, ChevronsUpDown } from 'lucide-react'
import { useBrands } from '@/hooks/useBrands'
import { cn } from '@/lib/utils'
import type { NavigationState } from '@/data/brand-modules'

interface BrandSwitcherProps {
  currentBrand?: string
  onSelect: (nav: NavigationState) => void
}

/**
 * Command palette para cambiar rápidamente de marca activa.
 * Abre con botón o atajo Ctrl/Cmd + K.
 */
export function BrandSwitcher({ currentBrand, onSelect }: BrandSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data: brands, isLoading } = useBrands()

  const activeBrand = useMemo(
    () => brands?.find((b) => b.slug === currentBrand),
    [brands, currentBrand],
  )

  // Shortcut Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function pick(slug: string) {
    onSelect({ module: 'cms:brand', submodule: 'overview', currentBrand: slug, activeTab: 'overview' })
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
        title="Cambiar de marca (Ctrl + K)"
      >
        <Building2 size={14} className="shrink-0 text-white/60" />
        <span className="flex-1 text-left truncate">
          {activeBrand?.name ?? 'Elegir marca...'}
        </span>
        <kbd className="hidden sm:inline-block text-[10px] font-mono text-white/50 border border-white/20 rounded px-1.5 py-0.5">
          Ctrl K
        </kbd>
        <ChevronsUpDown size={12} className="shrink-0 text-white/40" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Command shouldFilter>
              <div className="border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Buscar marca del Grupo Effi..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
                  autoFocus
                />
                <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
                  Esc
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                {isLoading && (
                  <div className="px-3 py-6 text-center text-sm text-slate-500">
                    Cargando marcas...
                  </div>
                )}
                <Command.Empty className="px-3 py-6 text-center text-sm text-slate-500">
                  Ninguna marca coincide.
                </Command.Empty>
                {(brands ?? []).map((b) => (
                  <Command.Item
                    key={b.slug}
                    value={`${b.name} ${b.slug} ${b.countries.join(' ')}`}
                    onSelect={() => pick(b.slug)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer',
                      'data-[selected=true]:bg-slate-100',
                    )}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: b.color_primary ?? '#94a3b8' }}
                    />
                    <span className="flex-1 font-medium text-[#0E2A47] truncate">{b.name}</span>
                    <span className="text-xs text-slate-400 truncate">{b.countries.join(' · ')}</span>
                    {currentBrand === b.slug && <Check size={14} className="text-emerald-500" />}
                  </Command.Item>
                ))}
              </Command.List>
              <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 flex items-center gap-3">
                <span>
                  <kbd className="font-mono bg-slate-100 rounded px-1">↑↓</kbd> navegar
                </span>
                <span>
                  <kbd className="font-mono bg-slate-100 rounded px-1">Enter</kbd> seleccionar
                </span>
                <span>
                  <kbd className="font-mono bg-slate-100 rounded px-1">Esc</kbd> cerrar
                </span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
