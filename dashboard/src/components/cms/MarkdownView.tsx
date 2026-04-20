import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'

interface MarkdownViewProps {
  md: string | null | undefined
  className?: string
  fallback?: string
}

export function MarkdownView({ md, className, fallback = 'Sin contenido' }: MarkdownViewProps) {
  if (!md || !md.trim()) {
    return <p className={`text-sm text-slate-400 italic ${className ?? ''}`}>{fallback}</p>
  }
  return (
    <div className={`prose prose-sm max-w-none ${className ?? ''}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {md}
      </ReactMarkdown>
    </div>
  )
}
