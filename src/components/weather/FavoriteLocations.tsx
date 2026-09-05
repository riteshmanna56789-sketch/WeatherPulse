import type { CitySearchResult } from '../../types/weather'

interface FavoriteLocationsProps {
  favorites: CitySearchResult[]
  onSelect: (city: CitySearchResult) => void
  onRemove: (city: CitySearchResult) => void
}

export default function FavoriteLocations({
  favorites,
  onSelect,
  onRemove
}: FavoriteLocationsProps) {
  if (favorites.length === 0) {
    return null
  }

  return (
    <section className="animate-rise">
      <div className="mb-3 flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-amber"
          fill="currentColor"
        >
          <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8-1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
        </svg>

        <h2 className="font-display text-lg font-medium text-ink dark:text-paper">
          Favorite Locations
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((city) => (
          <div
            key={`${city.name}-${city.region}-${city.country}`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 transition-colors hover:border-amber/40 hover:bg-amber/5 dark:border-paper/10 dark:bg-ink-soft/60 dark:hover:border-amber/40"
          >
            <button
              type="button"
              onClick={() => onSelect(city)}
              className="min-w-0 flex-1 text-left"
            >
              <span className="block truncate font-display text-base font-medium text-ink dark:text-paper">
                {city.name}
              </span>

              <span className="mt-1 block truncate font-body text-xs text-slate">
                {[city.region, city.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onRemove(city)}
              aria-label={`Remove ${city.name} from favorites`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
              >
                <path d="M6 6 18 18" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}