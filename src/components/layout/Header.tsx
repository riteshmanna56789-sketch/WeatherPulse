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
    <header className="relative z-30 border-b border-ink/10 bg-white/50 backdrop-blur-xl dark:border-paper/10 dark:bg-ink/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber/20 bg-amber/10 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-amber"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />

                <path d="M12 2.5v2" />
                <path d="M12 19.5v2" />
                <path d="m4.9 4.9 1.4 1.4" />
                <path d="m17.7 17.7 1.4 1.4" />
                <path d="M2.5 12h2" />
                <path d="M19.5 12h2" />
                <path d="m4.9 19.1 1.4-1.4" />
                <path d="m17.7 6.3 1.4-1.4" />
              </svg>
            </div>

            <div>
              <h1 className="font-display text-xl font-semibold tracking-tight text-ink dark:text-paper sm:text-2xl">
                WeatherPulse
              </h1>

              <p className="hidden font-body text-[11px] text-slate sm:block">
                Weather at a glance
              </p>
            </div>
          </div>

          <div className="lg:hidden">
            <ThemeToggle
              theme={theme}
              onToggle={onToggleTheme}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto lg:items-center">
          <SearchInput
            onSearch={onSearch}
            onQueryChange={onQueryChange}
            suggestions={suggestions}
          />

          <button
            type="button"
            onClick={onUseLocation}
            disabled={loading}
            className="group flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 font-body text-sm font-medium text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/40 hover:bg-amber/10 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:border-paper/10 dark:bg-ink-soft/70 dark:text-paper dark:hover:bg-paper/5 sm:px-5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
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

            <span>
              {loading ? 'Finding location…' : 'Use My Location'}
            </span>
          </button>
        </div>

        <div className="hidden lg:block">
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
          />
        </div>
      </div>
    </header>
  )
}