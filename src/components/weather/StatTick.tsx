import type { ReactNode } from 'react'

interface StatTickProps {
  label: string
  value: string
  icon: ReactNode
}

export default function StatTick({ label, value, icon }: StatTickProps) {
  return (
    <div className="flex items-center gap-3 border-l border-ink/10 pl-3 dark:border-paper/10 first:border-l-0 first:pl-0">
      <span className="text-dusk dark:text-dusk">{icon}</span>
      <div>
        <p className="font-body text-xs text-slate">{label}</p>
        <p className="font-display text-base font-medium text-ink dark:text-paper">{value}</p>
      </div>
    </div>
  )
}
