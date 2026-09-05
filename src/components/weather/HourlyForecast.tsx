import type { HourlyReading } from '../../types/weather'
import type { TemperatureUnit } from '../../utils/temperature'
import { formatTemperature } from '../../utils/temperature'
import WeatherIcon from '../ui/WeatherIcon'

interface HourlyForecastProps {
  hours: HourlyReading[]
  unit: TemperatureUnit
}

export default function HourlyForecast({
  hours,
  unit
}: HourlyForecastProps) {
  const temperatures = hours.map((hour) => hour.temperature)
  const minTemperature = Math.min(...temperatures)
  const maxTemperature = Math.max(...temperatures)
  const temperatureSpan = maxTemperature - minTemperature || 1

  return (
    <section className="animate-rise overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-white/90 via-white/70 to-amber/10 shadow-[0_20px_60px_rgba(15,27,45,0.08)] dark:border-paper/10 dark:from-ink-soft dark:via-ink-soft/95 dark:to-dusk/30">
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Next 12 hours
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
              Hourly forecast
            </h2>

            <p className="mt-1 font-body text-sm text-slate">
              Weather changes through the day
            </p>
          </div>

          <div className="hidden rounded-full border border-ink/10 bg-white/60 px-3 py-2 font-body text-xs font-semibold text-slate shadow-sm dark:border-paper/10 dark:bg-paper/5 sm:block">
            12 Hours
          </div>
        </div>

        <div className="mt-6 -mx-1 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex min-w-max gap-2 px-1">
            {hours.map((hour, i) => {
              const isNow = i === 0

              const temperaturePosition =
                ((hour.temperature - minTemperature) /
                  temperatureSpan) *
                100

              return (
                <div
                  key={hour.time}
                  className={`group relative flex w-[82px] flex-col items-center rounded-2xl border px-3 py-4 transition-all duration-200 sm:w-[88px] ${
                    isNow
                      ? 'border-amber/40 bg-amber/10 shadow-sm'
                      : 'border-transparent hover:border-ink/10 hover:bg-white/70 hover:shadow-sm dark:hover:border-paper/10 dark:hover:bg-paper/5'
                  }`}
                  style={{
                    animationDelay: `${i * 35}ms`
                  }}
                >
                  <span
                    className={`font-body text-[11px] font-semibold ${
                      isNow
                        ? 'text-amber'
                        : 'text-slate'
                    }`}
                  >
                    {isNow ? 'Now' : hour.time}
                  </span>

                  <div
                    className={`mt-4 flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isNow
                        ? 'bg-amber/15 shadow-sm'
                        : 'bg-ink/5 dark:bg-paper/5'
                    }`}
                  >
                    <WeatherIcon
                      condition={hour.condition}
                      className={`h-6 w-6 ${
                        isNow
                          ? 'text-amber'
                          : 'text-dusk dark:text-amber'
                      }`}
                    />
                  </div>

                  <span className="mt-4 font-display text-lg font-semibold text-ink dark:text-paper">
                    {formatTemperature(hour.temperature, unit)}
                  </span>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-paper/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isNow
                          ? 'bg-gradient-to-r from-amber to-amber/60'
                          : 'bg-gradient-to-r from-dusk/70 to-amber/80'
                      }`}
                      style={{
                        width: `${Math.max(
                          temperaturePosition,
                          12
                        )}%`
                      }}
                    />
                  </div>

                  <div
                    className={`mt-3 rounded-full px-2 py-1 font-body text-[10px] font-semibold ${
                      hour.precipitationChance >= 60
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : hour.precipitationChance >= 30
                          ? 'bg-amber/10 text-amber-dim dark:text-amber'
                          : 'bg-ink/5 text-slate dark:bg-paper/5'
                    }`}
                  >
                    {hour.precipitationChance}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-paper/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber" />

            <span className="font-body text-xs text-slate">
              Temperature trend
            </span>
          </div>

          <div className="font-body text-xs text-slate">
            {formatTemperature(minTemperature, unit)} –{' '}
            {formatTemperature(maxTemperature, unit)}
          </div>
        </div>
      </div>
    </section>
  )
}