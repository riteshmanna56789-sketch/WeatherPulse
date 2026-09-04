import type { WeatherCondition } from '../types/weather'

export interface WeatherCodeDescription {
  condition: WeatherCondition
  label: string
}

export function describeWeatherCode(code: number): WeatherCodeDescription {
  if (code === 0) return { condition: 'clear', label: 'Clear' }
  if (code === 1) return { condition: 'partly-cloudy', label: 'Mainly Clear' }
  if (code === 2) return { condition: 'partly-cloudy', label: 'Partly Cloudy' }
  if (code === 3) return { condition: 'cloudy', label: 'Overcast' }
  if (code === 45 || code === 48) return { condition: 'fog', label: 'Foggy' }
  if (code >= 51 && code <= 57) return { condition: 'rain', label: 'Drizzle' }
  if (code >= 61 && code <= 67) {
    return { condition: 'rain', label: code >= 65 ? 'Heavy Rain' : 'Rain' }
  }
  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return { condition: 'snow', label: 'Snow' }
  }
  if (code === 80 || code === 81 || code === 82) {
    return { condition: 'rain', label: code === 82 ? 'Heavy Showers' : 'Showers' }
  }
  if (code === 85 || code === 86) return { condition: 'snow', label: 'Snow Showers' }
  if (code === 95 || code === 96 || code === 99) {
    return { condition: 'thunderstorm', label: 'Thunderstorms' }
  }

  return { condition: 'cloudy', label: 'Cloudy' }
}
