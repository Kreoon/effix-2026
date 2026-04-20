import { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, List, ListOrdered, Link2, Pilcrow } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BriefFormat } from '@/types/cms'

interface DualEditorProps {
  value: string
  format: BriefFormat
  onChange: (value: string, format: BriefFormat) => void
  placeholder?: string
  minHeight?: number
  templateUrl?: string
}

/**
 * Editor con toggle Markdown ↔ Rich text.
 * Fuente de verdad: siempre markdown (el rich text se serializa a markdown al salir).
 */
export function DualEditor({
  value,
  format,
  onChange,
  placeholder = 'Escribí acá el brief...',
  minHeight = 300,
  templateUrl,
}: DualEditorProps) {
  const [mode, setMode] = useState<BriefFormat>(format)

  async function loadTemplate() {
    if (!templateUrl) return
    try {
      const res = await fetch(templateUrl)
      const text = await res.text()
      onChange(text, 'markdown')
      setMode('markdown')
    } catch (e) {
      console.error('Error cargando plantilla:', e)
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 bg-slate-50">
        <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5">
          <button
            type="button"
            onClick={() => setMode('markdown')}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded transition-colors',
              mode === 'markdown' ? 'bg-[#0E2A47] text-white' : 'text-slate-600 hover:text-[#0E2A47]',
            )}
          >
            Markdown
          </button>
          <button
            type="button"
            onClick={() => setMode('rich')}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded transition-colors',
              mode === 'rich' ? 'bg-[#0E2A47] text-white' : 'text-slate-600 hover:text-[#0E2A47]',
            )}
          >
            Rich text
          </button>
        </div>
        {templateUrl && (
          <button
            type="button"
            onClick={loadTemplate}
            className="text-xs text-[#0E2A47] hover:underline"
          >
            Cargar plantilla
          </button>
        )}
      </div>

      {/* Body */}
      {mode === 'markdown' ? (
        <div data-color-mode="light" style={{ minHeight }}>
          <MDEditor
            value={value}
            onChange={(v) => onChange(v ?? '', 'markdown')}
            preview="edit"
            height={minHeight}
            textareaProps={{ placeholder }}
            visibleDragbar={false}
          />
        </div>
      ) : (
        <RichEditor
          value={value}
          onChange={(md) => onChange(md, 'rich')}
          placeholder={placeholder}
          minHeight={minHeight}
        />
      )}
    </div>
  )
}

// ============================================================================
// Rich editor interno (TipTap → markdown al guardar)
// ============================================================================

function RichEditor({
  value,
  onChange,
  placeholder,
  minHeight,
}: {
  value: string
  onChange: (md: string) => void
  placeholder: string
  minHeight: number
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: mdToHtml(value),
    onUpdate({ editor }) {
      onChange(htmlToMd(editor.getHTML()))
    },
  })

  // Sync externo (por ej cargar plantilla desde toolbar)
  useEffect(() => {
    if (!editor) return
    const current = htmlToMd(editor.getHTML())
    if (current !== value) editor.commands.setContent(mdToHtml(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) return null

  return (
    <div>
      <div className="flex items-center gap-1 px-2 py-1 border-b border-slate-100">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic size={14} />
        </ToolbarBtn>
        <span className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered size={14} />
        </ToolbarBtn>
        <span className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarBtn
          onClick={() => {
            const url = window.prompt('URL del enlace')
            if (url) editor.chain().focus().setLink({ href: url }).run()
            else editor.chain().focus().unsetLink().run()
          }}
          active={editor.isActive('link')}
        >
          <Link2 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')}>
          <Pilcrow size={14} />
        </ToolbarBtn>
      </div>
      <div
        className="px-4 py-3 prose prose-sm max-w-none focus-within:outline-none"
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

function ToolbarBtn({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-1.5 rounded transition-colors',
        active ? 'bg-[#0E2A47] text-white' : 'text-slate-600 hover:bg-slate-100',
      )}
    >
      {children}
    </button>
  )
}

// ============================================================================
// Conversión minimalista md ↔ html (TipTap maneja HTML; markdown se genera ligero)
// ============================================================================

function mdToHtml(md: string): string {
  if (!md) return ''
  const lines = md.split('\n')
  const out: string[] = []
  let inList: 'ul' | 'ol' | null = null

  const flush = () => {
    if (inList) {
      out.push(`</${inList}>`)
      inList = null
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      flush()
      const level = h[1].length
      out.push(`<h${level}>${inline(h[2])}</h${level}>`)
      continue
    }
    const ol = /^\d+\.\s+(.*)$/.exec(line)
    if (ol) {
      if (inList !== 'ol') {
        flush()
        out.push('<ol>')
        inList = 'ol'
      }
      out.push(`<li>${inline(ol[1])}</li>`)
      continue
    }
    const ul = /^[-*]\s+(.*)$/.exec(line)
    if (ul) {
      if (inList !== 'ul') {
        flush()
        out.push('<ul>')
        inList = 'ul'
      }
      out.push(`<li>${inline(ul[1])}</li>`)
      continue
    }
    flush()
    out.push(`<p>${inline(line)}</p>`)
  }
  flush()
  return out.join('')
}

function inline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function htmlToMd(html: string): string {
  if (!html) return ''
  let s = html
    .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
    .replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
    .replace(/<p>(.*?)<\/p>/g, '$1\n\n')

  // Listas
  s = s.replace(/<ul>([\s\S]*?)<\/ul>/g, (_m, inner: string) => {
    return inner.replace(/<li>(.*?)<\/li>/g, '- $1\n') + '\n'
  })
  s = s.replace(/<ol>([\s\S]*?)<\/ol>/g, (_m, inner: string) => {
    let i = 1
    return inner.replace(/<li>(.*?)<\/li>/g, () => `${i++}. $1\n`) + '\n'
  })

  return s
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
