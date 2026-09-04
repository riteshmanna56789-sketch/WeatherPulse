import type { HourlyReading } from '../../types/weather'
import WeatherIcon from '../ui/WeatherIcon'
import Panel from '../ui/Panel'

interface HourlyForecastProps {
  hours: HourlyReading[]
}

export default function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <Panel eyebrow="Next 12 hours" title="Hourly forecast" className="animate-rise">
      <div className="mt-4 flex gap-1 overflow-x-auto px-5 pb-6 sm:px-6 no-scrollbar">
        {hours.map((hour, i) => (
          <div
            key={hour.time}
            className="flex min-w-[72px] flex-col items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-ink/5 dark:hover:bg-paper/5"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <span className="font-body text-xs text-slate">{hour.time}</span>
            <WeatherIcon condition={hour.condition} className="h-5 w-5 text-dusk dark:text-amber" />
            <span className="font-display text-sm font-medium text-ink dark:text-paper">
              {hour.temperature}°
            </span>
            <span className="font-body text-[11px] text-dusk dark:text-dusk">
              {hour.precipitationChance}%
            </span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
