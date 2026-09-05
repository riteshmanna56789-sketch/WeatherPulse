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
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber/10 text-amber"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
              </svg>
            </div>

            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Saved places
            </p>
          </div>

          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
            Favorite locations
          </h2>

          <p className="mt-1 font-body text-sm text-slate">
            Quick access to the places you check most.
          </p>
        </div>

        <div className="hidden rounded-full border border-ink/10 bg-white/60 px-3 py-2 font-body text-xs font-semibold text-slate shadow-sm dark:border-paper/10 dark:bg-paper/5 sm:block">
          {favorites.length}{' '}
          {favorites.length === 1 ? 'Location' : 'Locations'}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((city, index) => (
          <div
            key={`${city.name}-${city.region}-${city.country}`}
            className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-white/85 via-white/70 to-amber/5 shadow-[0_10px_30px_rgba(15,27,45,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/30 hover:shadow-[0_16px_40px_rgba(15,27,45,0.09)] dark:border-paper/10 dark:from-ink-soft/90 dark:via-ink-soft/75 dark:to-amber/5 dark:hover:border-amber/30"
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-amber/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
              aria-hidden="true"
            />

            <div className="relative flex items-center gap-3 p-4">
              <button
                type="button"
                onClick={() => onSelect(city)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-ink"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber/15 bg-amber/10 text-amber transition-all duration-200 group-hover:border-amber/25 group-hover:bg-amber/15"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
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
                  <span className="flex items-center gap-2">
                    <span className="block truncate font-display text-base font-semibold text-ink dark:text-paper">
                      {city.name}
                    </span>

                    <span
                      className="shrink-0 text-amber opacity-70"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
                      </svg>
                    </span>
                  </span>

                  <span className="mt-1 block truncate font-body text-xs text-slate">
                    {[city.region, city.country]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-slate opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber group-hover:opacity-100"
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

              <button
                type="button"
                onClick={() => onRemove(city)}
                aria-label={`Remove ${city.name} from favorites`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 6 18 18" />
                  <path d="m18 6-12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}