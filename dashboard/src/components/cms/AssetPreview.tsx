import { useState } from 'react'
import { Loader2, ExternalLink, Maximize2, Minimize2, AlertCircle, X } from 'lucide-react'
import { getEmbedUrl, parseExternalUrl } from '@/lib/cms'
import type { CmsAsset } from '@/types/cms'

interface AssetPreviewProps {
  asset: CmsAsset
  className?: string
}

export function AssetPreview({ asset, className = '' }: AssetPreviewProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const embedUrl = getEmbedUrl(asset.external_url)
  const { source } = parseExternalUrl(asset.external_url)

  if (!asset.external_url && !asset.storage_path) return null

  // Si no hay URL de embed y no es imagen/video directo, mostrar link
  if (!embedUrl && asset.kind !== 'image' && asset.kind !== 'video') {
    return (
      <div className={`p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center ${className}`}>
        <p className="text-sm text-slate-500 mb-3">Este tipo de archivo no admite vista previa directa.</p>
        <a
          href={asset.external_url || '#'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline"
        >
          Abrir en pestaña nueva <ExternalLink size={14} />
        </a>
      </div>
    )
  }

  return (
    <div className={`relative group ${isExpanded ? 'fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl p-4' : 'w-full'} ${className}`}>
      {/* Controles de expansión */}
      <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-[#0E2A47] transition-colors"
        >
          {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      <div className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${isExpanded ? 'h-full' : 'aspect-video'}`}>
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-[#0E2A47]" size={24} />
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Cargando preview...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 p-6 text-center">
            <div>
              <AlertCircle className="mx-auto text-red-500 mb-2" size={24} />
              <p className="text-sm font-semibold text-red-800">No se pudo cargar la vista previa</p>
              <p className="text-xs text-red-600 mt-1">Verificá los permisos de compartir del archivo.</p>
            </div>
          </div>
        )}

        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
          />
        ) : asset.kind === 'image' && asset.external_url ? (
          <img
            src={asset.external_url}
            alt={asset.variant_label || 'Preview'}
            className="w-full h-full object-contain"
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            Preview no disponible
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="absolute -top-12 right-0 text-white flex items-center gap-2">
          <span className="text-sm font-medium">{asset.variant_label || asset.kind}</span>
          <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-white/10 rounded-full text-white">
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

import { X } from 'lucide-react'
