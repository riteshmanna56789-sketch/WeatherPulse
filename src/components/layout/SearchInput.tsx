import { useEffect, useState, type FormEvent } from 'react'
import type { CitySearchResult } from '../../types/weather'

interface SearchInputProps {
  onSearch: (city: CitySearchResult) => void
  onQueryChange: (query: string) => void
  suggestions?: CitySearchResult[]
}

export default function SearchInput({
  onSearch,
  onQueryChange,
  suggestions = []
}: SearchInputProps) {
  const [value, setValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const filtered = value.trim().length > 0
    ? suggestions.filter((city) => {
        const searchText = value.trim().toLowerCase()

        return (
          city.name.toLowerCase().includes(searchText) ||
          city.region.toLowerCase().includes(searchText) ||
          city.country.toLowerCase().includes(searchText)
        )
      })
    : []

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()

        const input = document.getElementById(
          'weatherpulse-search'
        ) as HTMLInputElement | null

        input?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcut)

    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut)
    }
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!value.trim()) return

    const firstMatch = filtered[0]

    if (firstMatch) {
      onSearch(firstMatch)
      setValue('')
      onQueryChange('')
      setShowSuggestions(false)
    }
  }

  function handlePick(city: CitySearchResult) {
    onSearch(city)
    setValue('')
    onQueryChange('')
    setShowSuggestions(false)
  }

  function handleClear() {
    setValue('')
    onQueryChange('')
    setShowSuggestions(false)
  }

  const showDropdown = showSuggestions && filtered.length > 0

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full sm:min-w-[280px] sm:max-w-md lg:w-[380px]"
    >
      <div
        className={`group flex h-12 items-center gap-3 rounded-full border px-2 pr-3 transition-all duration-300 ${
          isFocused
            ? 'border-sky-400/70 bg-white/95 shadow-[0_0_0_3px_rgba(56,189,248,0.08),0_0_30px_rgba(56,189,248,0.16)] dark:bg-ink-soft/90'
            : 'border-ink/10 bg-white/75 shadow-[0_8px_30px_rgba(15,27,45,0.08)] hover:border-ink/20 hover:bg-white/90 dark:border-paper/10 dark:bg-ink-soft/75 dark:hover:border-paper/20 dark:hover:bg-ink-soft/90'
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isFocused
              ? 'bg-sky-400/15 text-sky-600 dark:bg-sky-400/20 dark:text-sky-300'
              : 'bg-ink/5 text-slate group-hover:text-ink dark:bg-paper/5 dark:group-hover:text-paper'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
            />

            <path d="m20 20-3.6-3.6" />
          </svg>
        </div>

        <input
          id="weatherpulse-search"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onQueryChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => {
            setIsFocused(true)
            setShowSuggestions(true)
          }}
          onBlur={() => {
            setIsFocused(false)

            window.setTimeout(() => {
              setShowSuggestions(false)
            }, 150)
          }}
          placeholder="Search a city..."
          aria-label="Search for a city or state"
          aria-expanded={showDropdown}
          className="min-w-0 flex-1 appearance-none bg-transparent font-body text-sm text-ink outline-none ring-0 placeholder:text-slate/60 focus:outline-none focus:ring-0 dark:text-paper dark:placeholder:text-slate/70"
        />

        {value ? (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            aria-label="Clear search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate transition-all duration-200 hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-paper/10 dark:hover:text-paper"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
            >
              <path d="M6 6 18 18" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
        ) : (
          <kbd className="hidden shrink-0 items-center gap-1 rounded-lg border border-ink/10 bg-ink/5 px-2 py-1 font-body text-[10px] text-slate dark:border-paper/10 dark:bg-paper/5 sm:flex">
            <span className="text-xs">⌘</span>
            <span>K</span>
          </kbd>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-white/95 p-1.5 shadow-[0_20px_50px_rgba(15,27,45,0.15)] backdrop-blur-xl dark:border-paper/10 dark:bg-ink-soft/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <div className="px-3 pb-1.5 pt-2">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">
              Locations
            </p>
          </div>

          <ul>
            {filtered.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    handlePick(city)
                  }}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-sky-400/10 focus-visible:bg-sky-400/10 focus-visible:outline-none dark:hover:bg-sky-400/10 dark:focus-visible:bg-sky-400/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-slate transition-colors group-hover:bg-sky-400/15 group-hover:text-sky-600 dark:bg-paper/5 dark:group-hover:text-sky-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                      <circle
                        cx="12"
                        cy="10"
                        r="2"
                      />
                    </svg>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-semibold text-ink dark:text-paper">
                      {city.name}
                    </span>

                    <span className="mt-0.5 block truncate font-body text-xs text-slate">
                      {[city.region, city.country]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-slate opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sky-600 group-hover:opacity-100 dark:group-hover:text-sky-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}