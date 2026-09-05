import SearchInput from './SearchInput'
import ThemeToggle from './ThemeToggle'
import type { CitySearchResult } from '../../types/weather'

interface HeaderProps {
  onSearch: (city: CitySearchResult) => void
  onQueryChange: (query: string) => void
  suggestions: CitySearchResult[]
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onUseLocation: () => void
  loading: boolean
}

export default function Header({
  onSearch,
  onQueryChange,
  suggestions,
  theme,
  onToggleTheme,
  onUseLocation,
  loading
}: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          onSearch={onSearch}
          onQueryChange={onQueryChange}
          suggestions={suggestions}
        />

        <button
          type="button"
          onClick={onUseLocation}
          disabled={loading}
          className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 font-body text-sm text-ink transition-colors hover:border-amber/60 hover:bg-amber/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-paper/10 dark:bg-ink-soft/70 dark:text-paper"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="3"
            />

            <path d="M12 2v3" />
            <path d="M12 19v3" />
            <path d="M2 12h3" />
            <path d="M19 12h3" />
          </svg>

          {loading ? 'Loading…' : 'Use My Location'}
        </button>
      </div>

      <ThemeToggle
        theme={theme}
        onToggle={onToggleTheme}
      />
    </header>
  )
}

