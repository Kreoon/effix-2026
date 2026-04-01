import { ChevronDown } from 'lucide-react'
import { brands, type Brand } from '@/data/mock-data'
import { cn } from '@/lib/utils'

interface BrandSelectorProps {
  value: string
  onChange: (slug: string) => void
  includeAll?: boolean
  className?: string
}

export function BrandSelector({ value, onChange, includeAll = false, className }: BrandSelectorProps) {
  const activeBrands = brands.filter((b: Brand) => b.status !== 'sin-campanas')
  const options = includeAll ? brands : activeBrands

  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none bg-slate-800 border border-slate-700 text-slate-200
          rounded-lg px-3 py-2 pr-8 text-sm font-medium
          focus:outline-none focus:border-blue-500 cursor-pointer
          hover:border-slate-600 transition-colors w-full
        "
        aria-label="Seleccionar marca"
      >
        {options.map((brand: Brand) => (
          <option key={brand.slug} value={brand.slug}>
            {brand.name}
            {brand.countries.length > 0 && ` (${brand.countries.join(', ')})`}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  )
}
