import type { DailyReading } from '../../types/weather'
import type { TemperatureUnit } from '../../utils/temperature'
import { convertTemperature, formatTemperature } from '../../utils/temperature'
import WeatherIcon from '../ui/WeatherIcon'
import Panel from '../ui/Panel'

interface DailyForecastProps {
  days: DailyReading[]
  unit: TemperatureUnit
}

export default function DailyForecast({
  days,
  unit
}: DailyForecastProps) {
  const convertedDays = days.map((day) => ({
    ...day,
    low: convertTemperature(day.low, unit),
    high: convertTemperature(day.high, unit)
  }))

  const weekLow = Math.min(...convertedDays.map((day) => day.low))
  const weekHigh = Math.max(...convertedDays.map((day) => day.high))
  const span = weekHigh - weekLow || 1

  return (
    <Panel
      eyebrow="Next 7 days"
      title="Daily trend"
      className="animate-rise"
    >
      <ul className="mt-3 divide-y divide-ink/10 px-2 pb-3 dark:divide-paper/10 sm:px-3">
        {convertedDays.map((day, i) => {
          const leftPct = ((day.low - weekLow) / span) * 100
          const widthPct = ((day.high - day.low) / span) * 100

          return (
            <li
              key={day.date}
              className="grid grid-cols-[64px_28px_1fr_72px] items-center gap-3 px-3 py-3.5 sm:grid-cols-[80px_28px_1fr_88px] sm:gap-4 sm:px-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div>
                <p className="font-display text-sm font-medium text-ink dark:text-paper">
                  {day.day}
                </p>

                <p className="font-body text-xs text-slate">
                  {day.date}
                </p>
              </div>

              <WeatherIcon
                condition={day.condition}
                className="h-5 w-5 text-dusk dark:text-amber"
              />

              <div className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-right font-body text-xs text-slate">
                  {formatTemperature(day.low, unit)}
                </span>

                <div className="relative h-1.5 flex-1 rounded-full bg-ink/10 dark:bg-paper/10">
                  <div
                    className="absolute h-full origin-left animate-sweep rounded-full bg-gradient-to-r from-dusk to-amber"
                    style={{
                      left: `${leftPct}%`,
                      width: `${widthPct}%`
                    }}
                  />
                </div>

                <span className="w-8 shrink-0 font-body text-xs text-ink dark:text-paper">
                  {formatTemperature(day.high, unit)}
                </span>
              </div>

              <p className="text-right font-body text-xs text-dusk dark:text-dusk">
                {day.precipitationChance}% rain
              </p>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}