import { useRef, useState, useEffect } from 'react'
import { Upload, Link2, FileText, Loader2, X, ExternalLink, Eye, EyeOff, Film, Image as ImageIcon, FileText as DocIcon, Pin } from 'lucide-react'
import { useAssets, useUploadAsset, useCreateExternalAsset, useDeleteAsset, getSignedUrl } from '@/hooks/useAssets'
import { MAX_UPLOAD_BYTES, parseExternalUrl } from '@/lib/cms'
import type { AssetKind, CmsAsset } from '@/types/cms'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import { AssetPreview } from './AssetPreview'

interface AssetUploaderProps {
  requirementId: string
}

export function AssetUploader({ requirementId }: AssetUploaderProps) {
  const { isAdmin } = useAdminProfile()
  const { data: assets = [], isLoading } = useAssets(requirementId)
  const uploadMut = useUploadAsset()
  const externalMut = useCreateExternalAsset()
  const deleteMut = useDeleteAsset()
  const fileRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const [externalUrl, setExternalUrl] = useState('')
  const [externalKind, setExternalKind] = useState<AssetKind>('link')
  const [externalLabel, setExternalLabel] = useState('')

  // Detección inteligente de tipo al pegar URL
  useEffect(() => {
    if (!externalUrl) return
    const { source } = parseExternalUrl(externalUrl)
    if (source === 'youtube' || source === 'vimeo' || source === 'loom') {
      setExternalKind('video')
    } else if (source === 'google_drive') {
      setExternalKind('doc')
    } else if (externalUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      setExternalKind('image')
    }
  }, [externalUrl])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return

    const kind = inferKind(file.type)
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(
        `Archivo muy grande (${(file.size / 1024 / 1024).toFixed(1)} MB). Máx 25 MB. Subí a Drive/Vimeo y usá "URL externa" abajo.`,
      )
      e.target.value = ''
      return
    }

    try {
      await uploadMut.mutateAsync({ requirementId, file, kind })
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  async function handleExternal() {
    if (!externalUrl.trim()) return
    setError(null)
    try {
      await externalMut.mutateAsync({
        requirement_id: requirementId,
        kind: externalKind,
        external_url: externalUrl.trim(),
        variant_label: externalLabel.trim() || null,
      })
      setExternalUrl('')
      setExternalLabel('')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload y Link inputs */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadMut.isPending}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-white p-4 hover:border-[#0E2A47] hover:bg-slate-50 transition-all group disabled:opacity-60"
          >
            <div className="p-2 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#0E2A47] group-hover:text-white transition-colors">
              {uploadMut.isPending ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#0E2A47]">Subir archivo</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Máximo 25MB · Directo</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              hidden
              onChange={handleFile}
              accept="image/*,application/pdf,text/markdown,text/plain,text/csv,video/mp4,video/quicktime"
            />
          </button>

          <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              <Link2 size={14} /> Integración Externa
            </div>
            <div className="space-y-2">
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="Pegá link de Drive, YouTube, Loom..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0E2A47] transition-colors"
              />
              <div className="flex gap-2">
                <select
                  value={externalKind}
                  onChange={(e) => setExternalKind(e.target.value as AssetKind)}
                  className="flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm bg-white font-medium text-[#0E2A47]"
                >
                  <option value="link">Link</option>
                  <option value="video">Video</option>
                  <option value="image">Imagen</option>
                  <option value="doc">Documento</option>
                  <option value="design_file">Diseño</option>
                </select>
                <input
                  type="text"
                  value={externalLabel}
                  onChange={(e) => setExternalLabel(e.target.value)}
                  placeholder="v1..."
                  className="w-16 rounded-lg border border-slate-200 px-2 py-2 text-sm text-center"
                />
                <button
                  type="button"
                  onClick={handleExternal}
                  disabled={!externalUrl.trim() || externalMut.isPending}
                  className="rounded-lg bg-[#0E2A47] text-white px-4 py-2 text-sm font-bold hover:bg-[#0A1F35] disabled:opacity-60 transition-all"
                >
                  {externalMut.isPending ? <Loader2 size={14} className="animate-spin" /> : 'Añadir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 flex items-center gap-2">
          <X size={14} className="shrink-0" /> {error}
        </div>
      )}

      {/* Lista de Entregables */}
      <div className="space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-slate-300" />
          </div>
        )}
        {!isLoading && assets.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
            <Pin className="mx-auto text-slate-300 mb-2" size={24} />
            <p className="text-sm text-slate-500 font-medium">No hay entregables adjuntos todavía.</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Sube archivos o pega links arriba</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3">
          {assets.map((a) => (
            <AssetRow key={a.id} asset={a} onDelete={() => deleteMut.mutate(a)} canDelete={isAdmin} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AssetRow({
  asset,
  onDelete,
  canDelete,
}: {
  asset: CmsAsset
  onDelete: () => void
  canDelete: boolean
}) {
  const [loadingUrl, setLoadingUrl] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function open() {
    if (asset.external_url) {
      window.open(asset.external_url, '_blank')
      return
    }
    if (!asset.storage_path) return
    setLoadingUrl(true)
    const signed = await getSignedUrl(asset.storage_path)
    setLoadingUrl(false)
    if (signed) window.open(signed, '_blank')
  }

  const kindIcon = {
    image: <ImageIcon size={16} />,
    video: <Film size={16} />,
    doc: <DocIcon size={16} />,
    link: <Link2 size={16} />,
    design_file: <FileText size={16} />,
    copy: <FileText size={16} />,
  }[asset.kind]

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white transition-all ${expanded ? 'ring-2 ring-[#0E2A47]/10 shadow-lg' : 'hover:border-slate-300 shadow-sm'}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className={`p-2 rounded-lg ${expanded ? 'bg-[#0E2A47] text-white' : 'bg-slate-100 text-slate-500'}`}>
          {kindIcon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#0E2A47] capitalize">{asset.kind}</span>
            {asset.variant_label && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                {asset.variant_label}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium truncate max-w-xs">
            {asset.external_url || asset.storage_path?.split('/').pop()}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-2 rounded-lg transition-colors ${expanded ? 'bg-amber-100 text-amber-700' : 'hover:bg-slate-100 text-slate-400 hover:text-[#0E2A47]'}`}
            title="Vista previa"
          >
            {expanded ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={open}
            disabled={loadingUrl}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-sky-600 transition-colors"
            title="Abrir original"
          >
            {loadingUrl ? <Loader2 size={18} className="animate-spin" /> : <ExternalLink size={18} />}
          </button>
          {canDelete && (
            <button 
              onClick={onDelete} 
              className="p-2 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
              title="Eliminar"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="p-4 pt-0 border-t border-slate-50 animate-in slide-in-from-top-2 duration-300">
          <AssetPreview asset={asset} />
        </div>
      )}
    </div>
  )
}

function inferKind(mime: string): AssetKind {
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime === 'application/pdf' || mime.startsWith('text/')) return 'doc'
  return 'doc'
}
