import { useState, type FormEvent } from 'react'
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!value.trim()) return

    const firstMatch = filtered[0]

    if (firstMatch) {
      onSearch(firstMatch)
      setShowSuggestions(false)
      return
    }

    setShowSuggestions(false)
  }

  function handlePick(city: CitySearchResult) {
    setValue(city.name)
    onSearch(city)
    setShowSuggestions(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xs"
    >
      <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 transition-colors focus-within:border-amber/60 focus-within:ring-2 focus-within:ring-amber/10 focus-within:shadow-sm dark:border-paper/10 dark:bg-ink-soft/70">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-slate"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
        >
          <circle
            cx="11"
            cy="11"
            r="6.5"
          />

          <path d="m20 20-3.6-3.6" />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onQueryChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 120)
          }}
          placeholder="Search city or state…"
          aria-label="Search for a city or state"
          className="w-full bg-transparent font-body text-sm text-ink placeholder:text-slate/70 focus:outline-none dark:text-paper"
        />
      </div>

      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-lg dark:border-paper/10 dark:bg-ink-soft">
          {filtered.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onMouseDown={() => handlePick(city)}
                className="block w-full px-4 py-2 text-left font-body text-sm text-ink hover:bg-amber/10 dark:text-paper"
              >
                <span className="block">
                  {city.name}
                </span>

                <span className="block text-xs text-slate">
                  {[city.region, city.country]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}