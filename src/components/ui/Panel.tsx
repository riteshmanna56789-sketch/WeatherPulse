import type { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
  className?: string
  title?: string
  eyebrow?: string
}

export default function Panel({ children, className = '', title, eyebrow }: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-ink/10 bg-white/60 backdrop-blur-sm shadow-[0_1px_0_0_rgba(15,27,45,0.04)] dark:border-paper/10 dark:bg-ink-soft/60 ${className}`}
    >
      {(title || eyebrow) && (
        <header className="flex items-baseline justify-between px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            {eyebrow && (
              <p className="font-body text-xs font-medium text-slate">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-display text-lg font-medium text-ink dark:text-paper">
                {title}
              </h2>
            )}
          </div>
        </header>
      )}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        {children}
      </div>
    </section>
  )
}
