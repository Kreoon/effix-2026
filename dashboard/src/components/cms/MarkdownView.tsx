import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'

interface MarkdownViewProps {
  md: string | null | undefined
  className?: string
  fallback?: string
}

/**
 * Renderiza markdown con estilos explícitos (sin depender de @tailwindcss/typography).
 * Colores con buen contraste sobre fondos claros (cream/white/slate-50).
 */
export function MarkdownView({ md, className, fallback = 'Sin contenido' }: MarkdownViewProps) {
  if (!md || !md.trim()) {
    return <p className={`text-sm text-slate-400 italic ${className ?? ''}`}>{fallback}</p>
  }
  return (
    <div className={`md-view text-[#1A1A1A] ${className ?? ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold text-[#0E2A47] mt-5 mb-3 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-[#0E2A47] mt-5 mb-2 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-[#0E2A47] mt-4 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-semibold text-[#0E2A47] mt-3 mb-1 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-sm text-[#1A1A1A] leading-relaxed mb-3 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1A1A1A] mb-3 marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-1 text-sm text-[#1A1A1A] mb-3 marker:text-slate-500">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0E2A47]">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline break-words"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <code className="block bg-slate-900 text-slate-100 text-xs font-mono rounded p-3 overflow-x-auto my-2">
                  {children}
                </code>
              )
            }
            return (
              <code className="bg-slate-100 text-[#0E2A47] text-[0.85em] font-mono rounded px-1 py-0.5">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <div className="my-2">{children}</div>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#1BC49C] pl-3 italic text-slate-700 my-3">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-4 border-slate-200" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
          th: ({ children }) => (
            <th className="text-left px-3 py-2 font-semibold text-[#0E2A47] border-b border-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-[#1A1A1A] border-b border-slate-100">{children}</td>
          ),
          input: ({ checked, type }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-1.5 align-middle accent-[#1BC49C]"
                />
              )
            }
            return null
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  )
}
