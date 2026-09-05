import type {
  CitySearchResult,
  CurrentWeather,
  LocationInfo
} from '../../types/weather'
import type { TemperatureUnit } from '../../utils/temperature'
import { formatTemperature } from '../../utils/temperature'
import WeatherIcon from '../ui/WeatherIcon'
import StatTick from './StatTick'
import FeelsLikeIndicator from './FeelsLikeIndicator'
import UvIndexIndicator from './UvIndexIndicator'

interface CurrentWeatherCardProps {
  location: LocationInfo
  current: CurrentWeather
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

  return (
    <section className="animate-rise rounded-3xl border border-ink/10 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_1px_0_0_rgba(15,27,45,0.04)] dark:border-paper/10 dark:from-ink-soft/80 dark:to-ink-soft/30 sm:p-8">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-body text-sm text-slate">
              {location.city}, {location.region}
            </p>

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
                className="flex h-8 w-8 items-center justify-center rounded-full text-amber transition-colors hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2-1 5.9-5.2-2.8-5.2 2.8-1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={onRefresh}
              disabled={loading || !city}
              aria-label="Refresh weather"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate transition-colors hover:bg-amber/10 hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:cursor-not-allowed disabled:opacity-50"
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
                unit === 'celsius' ? 'Fahrenheit' : 'Celsius'
              }`}
              className="ml-1 flex h-8 items-center rounded-full border border-ink/10 bg-white/60 px-1 font-body text-xs font-semibold text-slate transition-colors hover:border-amber/40 hover:bg-amber/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber dark:border-paper/10 dark:bg-ink-soft/60"
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
                    ? 'bg-ink text-paper dark:bg-ink-soft dark:text-paper'
                    : ''
                }`}
              >
                °F
              </span>
            </button>
          </div>

          <div className="mt-3 flex items-end gap-4">
            <span className="font-display text-7xl font-light leading-none text-ink dark:text-paper sm:text-8xl">
              {formatTemperature(current.temperature, unit)}
            </span>

            <div className="mb-2 flex items-center gap-2 text-dusk dark:text-amber">
              <WeatherIcon
                condition={current.condition}
                className="h-7 w-7"
              />

              <span className="font-display text-base font-medium text-ink dark:text-paper">
                {current.conditionLabel}
              </span>
            </div>
          </div>

          <FeelsLikeIndicator
            temperature={current.feelsLike}
            unit={unit}
          />

          <UvIndexIndicator
            uvIndex={current.uvIndex}
          />

          <div className="mt-2 space-y-1">
            <p className="font-body text-sm text-slate">
              Local time {location.localTime}
            </p>

            {formattedLastUpdated && (
              <p className="font-body text-xs text-slate/80">
                Updated {formattedLastUpdated}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 dark:border-paper/10 sm:grid-cols-3 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
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
              >
                <path d="M12 3.5c3 4 6 7.4 6 10.8a6 6 0 1 1-12 0c0-3.4 3-6.8 6-10.8Z" />
              </svg>
            }
          />

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
              >
                <path d="M3 8h11.5a2.75 2.75 0 1 0-2.4-4.1" />
                <path d="M3 13h15.5a2.75 2.75 0 1 1-2.4 4.1" />
              </svg>
            }
          />

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
              >
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 12 15.2 9" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}