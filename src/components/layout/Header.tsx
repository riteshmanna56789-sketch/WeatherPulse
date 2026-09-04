import SearchInput from './SearchInput'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  onSearch: (city: string) => void
  onQueryChange: (query: string) => void
  suggestions: string[]
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Header({
  onSearch,
  onQueryChange,
  suggestions,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/80 backdrop-blur-md dark:border-paper/10 dark:bg-ink/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8">
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-amber dark:bg-paper dark:text-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3.2M12 17.8V21M4.2 12H1M23 12h-3.2M6.1 6.1l1.7 1.7M16.2 16.2l1.7 1.7M17.9 6.1l-1.7 1.7M7.8 16.2l-1.7 1.7" />
                <circle cx="12" cy="12" r="3.4" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-paper">
              WeatherPulse
            </span>
          </div>
          <div className="sm:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            onSearch={onSearch}
            onQueryChange={onQueryChange}
            suggestions={suggestions}
          />
          <div className="hidden sm:block">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </header>
  )
}
