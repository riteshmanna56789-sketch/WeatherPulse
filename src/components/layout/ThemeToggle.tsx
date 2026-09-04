interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={onToggle}
      className="relative flex h-8 w-14 items-center rounded-full border border-ink/10 bg-white/70 px-1 transition-colors dark:border-paper/10 dark:bg-ink-soft/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-amber text-ink shadow-sm transition-transform duration-300 ${
          isDark ? 'translate-x-6 bg-dusk text-paper' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M20.7 14.9A8.5 8.5 0 1 1 9.1 3.3a7 7 0 0 0 11.6 11.6Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <circle cx="12" cy="12" r="4.2" />
          </svg>
        )}
      </span>
    </button>
  )
}
