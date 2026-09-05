import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent
} from 'react'
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
  const [showSuggestions, setShowSuggestions] =
    useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)

  const filtered =
    value.trim().length > 0
      ? suggestions.filter((city) => {
          const searchText = value
            .trim()
            .toLowerCase()

          return (
            city.name
              .toLowerCase()
              .includes(searchText) ||
            city.region
              .toLowerCase()
              .includes(searchText) ||
            city.country
              .toLowerCase()
              .includes(searchText)
          )
        })
      : []

  const showDropdown =
    showSuggestions && filtered.length > 0

  useEffect(() => {
    function handleKeyboardShortcut(
      event: globalThis.KeyboardEvent
    ) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyboardShortcut
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyboardShortcut
      )
    }
  }, [])

  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(-1)
    }
  }, [filtered.length, activeIndex])

  function selectCity(city: CitySearchResult) {
    onSearch(city)
    setValue('')
    onQueryChange('')
    setShowSuggestions(false)
    setActiveIndex(-1)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!value.trim()) {
      return
    }

    const selectedCity =
      activeIndex >= 0
        ? filtered[activeIndex]
        : filtered[0]

    if (selectedCity) {
      selectCity(selectedCity)
    }
  }

  function handlePick(city: CitySearchResult) {
    selectCity(city)
  }

  function handleClear() {
    setValue('')
    onQueryChange('')
    setShowSuggestions(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLInputElement>
  ) {
    if (!showDropdown) {
      if (
        event.key === 'ArrowDown' &&
        filtered.length > 0
      ) {
        event.preventDefault()
        setShowSuggestions(true)
        setActiveIndex(0)
      }

      if (event.key === 'Escape') {
        setShowSuggestions(false)
        setActiveIndex(-1)
      }

      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()

        setActiveIndex((current) =>
          current < filtered.length - 1
            ? current + 1
            : 0
        )
        break

      case 'ArrowUp':
        event.preventDefault()

        setActiveIndex((current) =>
          current > 0
            ? current - 1
            : filtered.length - 1
        )
        break

      case 'Enter':
        if (activeIndex >= 0) {
          event.preventDefault()

          const selectedCity =
            filtered[activeIndex]

          if (selectedCity) {
            selectCity(selectedCity)
          }
        }
        break

      case 'Escape':
        event.preventDefault()
        setShowSuggestions(false)
        setActiveIndex(-1)
        break

      default:
        break
    }
  }

  const activeSuggestionId =
    activeIndex >= 0
      ? `weatherpulse-suggestion-${filtered[activeIndex]?.id}`
      : undefined

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full sm:min-w-[280px] sm:max-w-md lg:w-[380px]"
      role="search"
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
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
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
          ref={inputRef}
          id="weatherpulse-search"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onQueryChange(e.target.value)
            setShowSuggestions(true)
            setActiveIndex(-1)
          }}
          onFocus={() => {
            setIsFocused(true)
            setShowSuggestions(true)
          }}
          onBlur={() => {
            setIsFocused(false)

            window.setTimeout(() => {
              setShowSuggestions(false)
              setActiveIndex(-1)
            }, 150)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search a city..."
          aria-label="Search for a city or state"
          aria-autocomplete="list"
          aria-controls="weatherpulse-suggestions"
          aria-expanded={showDropdown}
          aria-activedescendant={activeSuggestionId}
          role="combobox"
          className="min-w-0 flex-1 appearance-none bg-transparent font-body text-sm text-ink outline-none ring-0 placeholder:text-slate/60 focus:outline-none focus:ring-0 dark:text-paper dark:placeholder:text-slate/70"
        />

        {value ? (
          <button
            type="button"
            onMouseDown={(event) =>
              event.preventDefault()
            }
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
              aria-hidden="true"
            >
              <path d="M6 6 18 18" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
        ) : (
          <kbd
            className="hidden shrink-0 items-center gap-1 rounded-lg border border-ink/10 bg-ink/5 px-2 py-1 font-body text-[10px] text-slate dark:border-paper/10 dark:bg-paper/5 sm:flex"
            aria-label="Keyboard shortcut Control or Command K"
          >
            <span
              className="text-xs"
              aria-hidden="true"
            >
              ⌘
            </span>
            <span>K</span>
          </kbd>
        )}
      </div>

      {showDropdown && (
        <div
          id="weatherpulse-suggestions"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-white/95 p-1.5 shadow-[0_20px_50px_rgba(15,27,45,0.15)] backdrop-blur-xl dark:border-paper/10 dark:bg-ink-soft/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        >
          <div className="px-3 pb-1.5 pt-2">
            <p
              className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-slate"
              aria-hidden="true"
            >
              Locations
            </p>
          </div>

          <ul
            role="listbox"
            aria-label="Location suggestions"
          >
            {filtered.map((city, index) => {
              const isActive =
                index === activeIndex

              return (
                <li
                  key={city.id}
                  id={`weatherpulse-suggestion-${city.id}`}
                  role="option"
                  aria-selected={isActive}
                >
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault()
                      handlePick(city)
                    }}
                    onMouseEnter={() =>
                      setActiveIndex(index)
                    }
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-sky-400/10'
                        : 'hover:bg-sky-400/10'
                    } focus-visible:bg-sky-400/10 focus-visible:outline-none dark:hover:bg-sky-400/10 dark:focus-visible:bg-sky-400/10`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate transition-colors ${
                        isActive
                          ? 'bg-sky-400/15 text-sky-600 dark:text-sky-300'
                          : 'bg-ink/5 group-hover:bg-sky-400/15 group-hover:text-sky-600 dark:bg-paper/5 dark:group-hover:text-sky-300'
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
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
                        {[
                          city.region,
                          city.country
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 shrink-0 text-slate transition-all duration-200 ${
                        isActive
                          ? 'translate-x-0.5 text-sky-600 opacity-100 dark:text-sky-300'
                          : 'opacity-0 group-hover:translate-x-0.5 group-hover:text-sky-600 group-hover:opacity-100 dark:group-hover:text-sky-300'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </form>
  )
}