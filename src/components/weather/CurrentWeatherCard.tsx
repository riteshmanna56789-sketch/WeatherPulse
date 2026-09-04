import type { CurrentWeather, LocationInfo } from '../../types/weather'
import WeatherIcon from '../ui/WeatherIcon'
import StatTick from './StatTick'

interface CurrentWeatherCardProps {
  location: LocationInfo
  current: CurrentWeather
}

export default function CurrentWeatherCard({ location, current }: CurrentWeatherCardProps) {
  return (
    <section className="animate-rise rounded-3xl border border-ink/10 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_1px_0_0_rgba(15,27,45,0.04)] dark:border-paper/10 dark:from-ink-soft/80 dark:to-ink-soft/30 sm:p-8">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="font-body text-sm text-slate">
            {location.city}, {location.region}
          </p>
          <div className="mt-3 flex items-end gap-4">
            <span className="font-display text-7xl font-light leading-none text-ink dark:text-paper sm:text-8xl">
              {current.temperature}°
            </span>
            <div className="mb-2 flex items-center gap-2 text-dusk dark:text-amber">
              <WeatherIcon condition={current.condition} className="h-7 w-7" />
              <span className="font-display text-base font-medium text-ink dark:text-paper">
                {current.conditionLabel}
              </span>
            </div>
          </div>
          <p className="mt-2 font-body text-sm text-slate">
            Feels like {current.feelsLike}° · Local time {location.localTime}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 dark:border-paper/10 sm:grid-cols-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <StatTick
            label="Humidity"
            value={`${current.humidity}%`}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3.5c3 4 6 7.4 6 10.8a6 6 0 1 1-12 0c0-3.4 3-6.8 6-10.8Z" />
              </svg>
            }
          />
          <StatTick
            label="Wind"
            value={`${current.windSpeed} km/h ${current.windDirection}`}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h11.5a2.75 2.75 0 1 0-2.4-4.1" />
                <path d="M3 13h15.5a2.75 2.75 0 1 1-2.4 4.1" />
              </svg>
            }
          />
          <StatTick
            label="UV index"
            value={`${current.uvIndex}`}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8" />
              </svg>
            }
          />
          <StatTick
            label="Pressure"
            value={`${current.pressure} hPa`}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
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
