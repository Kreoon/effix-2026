import { useRef, useState } from 'react'
import { Upload, Link2, FileText, Loader2, X, ExternalLink } from 'lucide-react'
import { useAssets, useUploadAsset, useCreateExternalAsset, useDeleteAsset, getSignedUrl } from '@/hooks/useAssets'
import { MAX_UPLOAD_BYTES } from '@/lib/cms'
import type { AssetKind, CmsAsset } from '@/types/cms'
import { useAdminProfile } from '@/hooks/useAdminProfile'

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
    <div className="space-y-3">
      {/* Upload directo */}
      {isAdmin && (
        <div className="flex items-start gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadMut.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E2A47] text-white px-3 py-2 text-sm hover:bg-[#0A1F35] disabled:opacity-60"
          >
            {uploadMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Subir archivo (≤25 MB)
          </button>
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={handleFile}
            accept="image/*,application/pdf,text/markdown,text/plain,text/csv,video/mp4,video/quicktime"
          />
        </div>
      )}

      {/* URL externa */}
      {isAdmin && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <Link2 size={12} /> URL externa (Drive, Vimeo, Frame.io, Bunny)
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={externalKind}
              onChange={(e) => setExternalKind(e.target.value as AssetKind)}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm bg-white"
            >
              <option value="link">Link</option>
              <option value="video">Video</option>
              <option value="image">Imagen</option>
              <option value="doc">Documento</option>
              <option value="design_file">Archivo diseño</option>
            </select>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="flex-1 min-w-48 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
            />
            <input
              type="text"
              value={externalLabel}
              onChange={(e) => setExternalLabel(e.target.value)}
              placeholder="v1, A/B..."
              className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
            />
            <button
              type="button"
              onClick={handleExternal}
              disabled={!externalUrl.trim() || externalMut.isPending}
              className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-60"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Lista */}
      <div className="space-y-1">
        {isLoading && <p className="text-xs text-slate-500">Cargando assets...</p>}
        {!isLoading && assets.length === 0 && (
          <p className="text-xs text-slate-400">Sin assets adjuntos todavía.</p>
        )}
        {assets.map((a) => (
          <AssetRow key={a.id} asset={a} onDelete={() => deleteMut.mutate(a)} canDelete={isAdmin} />
        ))}
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

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm">
      <FileText size={14} className="text-slate-400 shrink-0" />
      <span className="flex-1 min-w-0 truncate">
        <span className="text-[#0E2A47] font-medium">{asset.kind}</span>
        {asset.variant_label && <span className="text-slate-500"> · {asset.variant_label}</span>}
        {asset.format && <span className="text-slate-400 text-xs"> · {asset.format}</span>}
        {asset.file_size_bytes && (
          <span className="text-slate-400 text-xs"> · {(asset.file_size_bytes / 1024 / 1024).toFixed(2)} MB</span>
        )}
      </span>
      <button
        onClick={open}
        disabled={loadingUrl}
        className="text-xs text-sky-600 hover:underline inline-flex items-center gap-1"
      >
        {loadingUrl ? <Loader2 size={12} className="animate-spin" /> : <ExternalLink size={12} />}
        Abrir
      </button>
      {canDelete && (
        <button onClick={onDelete} className="text-slate-400 hover:text-red-600">
          <X size={14} />
        </button>
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
