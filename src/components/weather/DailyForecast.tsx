import type { DailyReading } from '../../types/weather'
import type { TemperatureUnit } from '../../utils/temperature'
import {
  convertTemperature,
  formatTemperature
} from '../../utils/temperature'
import WeatherIcon from '../ui/WeatherIcon'

interface DailyForecastProps {
  days: DailyReading[]
  unit: TemperatureUnit
  currentTemperature: number
}

export default function DailyForecast({
  days,
  unit,
  currentTemperature
}: DailyForecastProps) {
  const convertedDays = days.map((day) => ({
    ...day,
    low: convertTemperature(day.low, unit),
    high: convertTemperature(day.high, unit)
  }))

  const weekLow = Math.min(
    ...convertedDays.map((day) => day.low)
  )

  const weekHigh = Math.max(
    ...convertedDays.map((day) => day.high)
  )

  const span = weekHigh - weekLow || 1

  const formattedCurrentTemperature =
    formatTemperature(
      currentTemperature,
      unit
    )

  return (
    <section className="animate-rise overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-white/90 via-white/70 to-amber/10 shadow-[0_20px_60px_rgba(15,27,45,0.08)] dark:border-paper/10 dark:from-ink-soft dark:via-ink-soft/95 dark:to-dusk/30">
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Next 7 days
            </p>

            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
              Daily forecast
            </h2>

            <p className="mt-1 font-body text-sm text-slate">
              Your week at a glance
            </p>
          </div>

          <div className="hidden rounded-full border border-ink/10 bg-white/60 px-3 py-2 font-body text-xs font-semibold text-slate shadow-sm dark:border-paper/10 dark:bg-paper/5 sm:block">
            7 Day Forecast
          </div>
        </div>

        {convertedDays[0] && (
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-amber/20 bg-gradient-to-br from-dusk via-dusk/95 to-ink-soft p-5 text-paper shadow-lg sm:p-7">
            <div
              className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber/20 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-paper/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-semibold sm:text-3xl">
                    Today
                  </p>

                  <p className="mt-1 font-body text-sm text-paper/70">
                    {convertedDays[0].date}
                  </p>
                </div>

                <div className="rounded-full border border-paper/15 bg-paper/10 px-3 py-1.5 font-body text-xs font-medium text-paper/80">
                  {convertedDays[0].precipitationChance}% rain
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-3xl border border-paper/10 bg-paper/10 backdrop-blur-sm sm:h-24 sm:w-24"
                    aria-hidden="true"
                  >
                    <WeatherIcon
                      condition={
                        convertedDays[0].condition
                      }
                      className="h-12 w-12 text-amber sm:h-14 sm:w-14"
                    />
                  </div>

                  <div>
                    <p className="font-display text-6xl font-light leading-none tracking-tight sm:text-7xl">
                      {formattedCurrentTemperature}
                    </p>

                    <p className="mt-2 font-display text-base font-medium text-paper sm:text-lg">
                      {convertedDays[0].conditionLabel}
                    </p>
                  </div>
                </div>

                <div className="min-w-0 flex-1 sm:max-w-md">
                  <div className="flex items-center justify-between font-body text-xs text-paper/70">
                    <span>Low</span>
                    <span>High</span>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="w-9 shrink-0 font-body text-sm font-medium">
                      {formatTemperature(
                        convertedDays[0].low,
                        unit
                      )}
                    </span>

                    <div
                      className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-paper/15"
                      aria-hidden="true"
                    >
                      <div
                        className="absolute top-0 h-full rounded-full bg-gradient-to-r from-paper/50 via-amber to-amber"
                        style={{
                          left: `${
                            ((convertedDays[0].low -
                              weekLow) /
                              span) *
                            100
                          }%`,
                          width: `${Math.max(
                            ((convertedDays[0].high -
                              convertedDays[0].low) /
                              span) *
                              100,
                            8
                          )}%`
                        }}
                      />

                      <span
                        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-paper shadow-lg"
                        style={{
                          left: `${Math.max(
                            Math.min(
                              ((convertTemperature(
                                currentTemperature,
                                unit
                              ) -
                                weekLow) /
                                span) *
                                100,
                              100
                            ),
                            0
                          )}%`
                        }}
                      />
                    </div>

                    <span className="w-9 shrink-0 text-right font-body text-sm font-semibold">
                      {formatTemperature(
                        convertedDays[0].high,
                        unit
                      )}
                    </span>
                  </div>

                  <p className="mt-3 font-body text-xs text-paper/60">
                    {convertedDays[0].precipitationChance}% chance of rain
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {convertedDays.slice(1).map((day, index) => {
            const actualIndex = index + 1

            const leftPct =
              ((day.low - weekLow) / span) * 100

            const widthPct = Math.max(
              ((day.high - day.low) / span) * 100,
              4
            )

            return (
              <div
                key={day.date}
                className="group rounded-2xl border border-transparent px-3 py-4 transition-all duration-200 hover:border-ink/10 hover:bg-white/70 hover:shadow-sm dark:hover:border-paper/10 dark:hover:bg-paper/5 sm:px-4"
                style={{
                  animationDelay: `${actualIndex * 45}ms`
                }}
              >
                <div className="grid grid-cols-[52px_42px_1fr_auto] items-center gap-3 sm:grid-cols-[72px_48px_1fr_auto] sm:gap-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink dark:text-paper">
                      {day.day}
                    </p>

                    <p className="mt-0.5 font-body text-[10px] text-slate">
                      {day.date}
                    </p>
                  </div>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 dark:bg-paper/5"
                    aria-hidden="true"
                  >
                    <WeatherIcon
                      condition={day.condition}
                      className="h-6 w-6 text-dusk dark:text-amber"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-8 shrink-0 text-right font-body text-xs text-slate">
                        {formatTemperature(
                          day.low,
                          unit
                        )}
                      </span>

                      <div
                        className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink/10 dark:bg-paper/10"
                        aria-hidden="true"
                      >
                        <div
                          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-dusk/80 to-amber transition-all duration-500 group-hover:brightness-110"
                          style={{
                            left: `${leftPct}%`,
                            width: `${widthPct}%`
                          }}
                        />
                      </div>

                      <span className="w-8 shrink-0 font-body text-xs font-semibold text-ink dark:text-paper">
                        {formatTemperature(
                          day.high,
                          unit
                        )}
                      </span>
                    </div>

                    <p className="mt-2 truncate font-body text-[11px] text-slate">
                      {day.conditionLabel}
                    </p>
                  </div>

                  <div
                    className={`rounded-full px-2.5 py-1.5 font-body text-[10px] font-semibold ${
                      day.precipitationChance >= 60
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : day.precipitationChance >= 30
                          ? 'bg-amber/10 text-amber-dim dark:text-amber'
                          : 'bg-ink/5 text-slate dark:bg-paper/5'
                    }`}
                  >
                    {day.precipitationChance}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 dark:border-paper/10 dark:bg-paper/[0.03] sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-lg"
              aria-hidden="true"
            >
              🌿
            </div>

            <div>
              <p className="font-display text-sm font-semibold text-ink dark:text-paper">
                Looks like a great week ahead
              </p>

              <p className="mt-0.5 font-body text-xs text-slate">
                Check the forecast before heading out.
              </p>
            </div>
          </div>

          <div
            className="hidden h-10 w-px bg-ink/10 dark:bg-paper/10 sm:block"
            aria-hidden="true"
          />

          <div className="flex items-center gap-3 sm:text-right">
            <div
              className="text-lg"
              aria-hidden="true"
            >
              ⌁
            </div>

            <div>
              <p className="font-body text-xs font-medium text-ink dark:text-paper">
                Data provided by Open-Meteo
              </p>

              <p className="mt-0.5 font-body text-[10px] text-slate">
                Stay prepared. Stay awesome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}