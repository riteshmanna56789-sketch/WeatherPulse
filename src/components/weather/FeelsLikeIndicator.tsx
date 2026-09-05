import type { TemperatureUnit } from '../../utils/temperature'
import { formatTemperature } from '../../utils/temperature'

interface FeelsLikeIndicatorProps {
  temperature: number
  unit: TemperatureUnit
}

function getTemperatureInfo(temperature: number) {
  if (temperature <= 5) {
    return {
      label: 'Very cold',
      icon: 'ice',
      position: 8
    }
  }

  if (temperature <= 15) {
    return {
      label: 'Cool',
      icon: 'cool',
      position: 25
    }
  }

  if (temperature <= 25) {
    return {
      label: 'Comfortable',
      icon: 'comfortable',
      position: 50
    }
  }

  if (temperature <= 32) {
    return {
      label: 'Warm',
      icon: 'warm',
      position: 72
    }
  }

  return {
    label: 'Hot',
    icon: 'hot',
    position: 92
  }
}

export default function FeelsLikeIndicator({
  temperature,
  unit
}: FeelsLikeIndicatorProps) {
  const info = getTemperatureInfo(temperature)

  return (
    <div className="mt-4 max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {info.icon === 'ice' && (
            <span className="text-lg">🧊</span>
          )}

          {info.icon === 'cool' && (
            <span className="text-lg">❄️</span>
          )}

          {info.icon === 'comfortable' && (
            <span className="text-lg">🌤️</span>
          )}

          {info.icon === 'warm' && (
            <span className="text-lg">☀️</span>
          )}

          {info.icon === 'hot' && (
            <span className="text-lg">🔥</span>
          )}

          <span className="font-body text-sm font-medium text-ink dark:text-paper">
            Feels like {formatTemperature(temperature, unit)} · {info.label}
          </span>
        </div>
      </div>

      <div className="mt-2">
        <div className="relative h-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-400 via-amber to-red-500">
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-ink shadow-md dark:border-ink-soft dark:bg-paper"
            style={{
              left: `${info.position}%`
            }}
          />
        </div>

        <div className="mt-1 flex justify-between font-body text-[10px] text-slate">
          <span>Cool</span>
          <span>Hot</span>
        </div>
      </div>
    </div>
  )
}