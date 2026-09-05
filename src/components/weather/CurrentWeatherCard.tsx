import type {
  CitySearchResult,
  CurrentWeather,
  HourlyReading,
  LocationInfo
} from '../../types/weather'
import type { TemperatureUnit } from '../../utils/temperature'
import { formatTemperature } from '../../utils/temperature'
import { getWeatherInsight } from '../../utils/weatherInsights'
import WeatherIcon from '../ui/WeatherIcon'
import StatTick from './StatTick'
import FeelsLikeIndicator from './FeelsLikeIndicator'
import UvIndexIndicator from './UvIndexIndicator'
import WeatherInsight from './WeatherInsight'

interface CurrentWeatherCardProps {
  location: LocationInfo
  current: CurrentWeather
  hourly: HourlyReading[]
  city: CitySearchResult | null
  isFavorite: boolean
  onToggleFavorite: () => void
  onRefresh: () => void
  loading: boolean
  unit: TemperatureUnit
  onToggleUnit: () => void
  lastUpdated: number | null
}

export default function CurrentWeatherCard({
  location,
  current,
  hourly,
  city,
  isFavorite,
  onToggleFavorite,
  onRefresh,
  loading,
  unit,
  onToggleUnit,
  lastUpdated
}: CurrentWeatherCardProps) {
  const formattedLastUpdated = lastUpdated
    ? new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: '2-digit'
      }).format(lastUpdated)
    : null

  const insight = getWeatherInsight(current, hourly)

  return (
    <section
      aria-labelledby="current-weather-heading"
      aria-busy={loading}
      className="relative isolate overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-white via-white/90 to-sky-500/5 p-5 shadow-[0_20px_60px_rgba(15,27,45,0.08)] dark:border-paper/10 dark:from-ink-soft dark:via-ink-soft/95 dark:to-sky-500/5 sm:p-7 lg:p-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-400/10" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-amber/10 blur-3xl" />

      <div className="relative">
        <h2
          id="current-weather-heading"
          className="sr-only"
        >
          Current weather for {location.city}
        </h2>

        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-slate dark:bg-paper/5"
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
            </div>

            <p className="truncate font-body text-sm font-medium text-slate">
              {location.city}
              {location.region
                ? `, ${location.region}`
                : ''}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {city && (
              <button
                type="button"
                onClick={onToggleFavorite}
                aria-label={
                  isFavorite
                    ? `Remove ${city.name} from favorites`
                    : `Add ${city.name} to favorites`
                }
                aria-pressed={isFavorite}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                  isFavorite
                    ? 'border-amber/30 bg-amber/10 text-amber'
                    : 'border-transparent text-slate hover:border-amber/20 hover:bg-amber/10 hover:text-amber'
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={
                    isFavorite
                      ? 'currentColor'
                      : 'none'
                  }
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={onRefresh}
              disabled={loading || !city}
              aria-label={
                loading
                  ? 'Refreshing weather'
                  : 'Refresh weather'
              }
              aria-busy={loading}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate transition-all duration-200 hover:border-amber/20 hover:bg-amber/10 hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 ${
                  loading ? 'animate-spin' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 11a8 8 0 0 0-14.7-4.2L4 9" />
                <path d="M4 4v5h5" />
                <path d="M4 13a8 8 0 0 0 14.7 4.2L20 15" />
                <path d="M20 20v-5h-5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onToggleUnit}
              aria-label={`Switch to ${
                unit === 'celsius'
                  ? 'Fahrenheit'
                  : 'Celsius'
              }`}
              className="ml-1 flex h-9 items-center rounded-full border border-ink/10 bg-white/70 px-1 font-body text-xs font-semibold text-slate shadow-sm transition-all duration-200 hover:border-amber/30 hover:bg-amber/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber dark:border-paper/10 dark:bg-paper/5"
            >
              <span
                className={`rounded-full px-2 py-1 transition-colors ${
                  unit === 'celsius'
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                    : ''
                }`}
              >
                °C
              </span>

              <span
                className={`rounded-full px-2 py-1 transition-colors ${
                  unit === 'fahrenheit'
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                    : ''
                }`}
              >
                °F
              </span>
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-end gap-4 sm:gap-6">
              <div>
                <p className="font-display text-7xl font-light leading-none tracking-[-0.05em] text-ink dark:text-paper sm:text-8xl">
                  {formatTemperature(
                    current.temperature,
                    unit
                  )}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <WeatherIcon
                    condition={current.condition}
                    className="h-6 w-6 text-dusk dark:text-amber"
                  />

                  <span className="font-display text-base font-semibold text-ink dark:text-paper sm:text-lg">
                    {current.conditionLabel}
                  </span>
                </div>
              </div>

              <div className="mb-1 flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-2 dark:border-paper/10 dark:bg-paper/5">
                <span
                  className="text-sm"
                  aria-hidden="true"
                >
                  🌡️
                </span>

                <span className="font-body text-xs text-slate">
                  Feels like
                </span>

                <span className="font-display text-sm font-semibold text-ink dark:text-paper">
                  {formatTemperature(
                    current.feelsLike,
                    unit
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <FeelsLikeIndicator
                temperature={current.feelsLike}
                unit={unit}
              />
            </div>

            <div className="mt-5">
              <UvIndexIndicator
                uvIndex={current.uvIndex}
              />
            </div>

            <WeatherInsight insight={insight} />

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-slate"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                  />

                  <path d="M12 7v5l3 2" />
                </svg>

                <p className="font-body text-xs text-slate">
                  Local time {location.localTime}
                </p>
              </div>

              {formattedLastUpdated && (
                <div
                  className="flex items-center gap-2"
                  aria-live="polite"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />

                  <p className="font-body text-xs text-slate">
                    Updated {formattedLastUpdated}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-ink/10 bg-white/65 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-ink/15 hover:bg-white/80 dark:border-paper/10 dark:bg-paper/[0.04] dark:hover:bg-paper/[0.07]">
              <StatTick
                label="Humidity"
                value={`${current.humidity}%`}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3.5c3 4 6 7.4 6 10.8a6 6 0 1 1-12 0c0-3.4 3-6.8 6-10.8Z" />
                  </svg>
                }
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white/65 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-ink/15 hover:bg-white/80 dark:border-paper/10 dark:bg-paper/[0.04] dark:hover:bg-paper/[0.07]">
              <StatTick
                label="Wind"
                value={`${current.windSpeed} km/h ${current.windDirection}`}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8h11.5a2.75 2.75 0 1 0-2.4-4.1" />
                    <path d="M3 13h15.5a2.75 2.75 0 1 1-2.4 4.1" />
                  </svg>
                }
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white/65 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-ink/15 hover:bg-white/80 dark:border-paper/10 dark:bg-paper/[0.04] dark:hover:bg-paper/[0.07]">
              <StatTick
                label="Pressure"
                value={`${current.pressure} hPa`}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8.5"
                    />

                    <path d="M12 12 15.2 9" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}