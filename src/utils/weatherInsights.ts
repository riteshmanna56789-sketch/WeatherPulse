import type { CurrentWeather, HourlyReading } from '../types/weather'

export interface WeatherInsight {
  title: string
  message: string
  icon: string
}

export function getWeatherInsight(
  current: CurrentWeather,
  hourly: HourlyReading[]
): WeatherInsight {
  const upcomingRainChance = Math.max(
    ...hourly.slice(1, 6).map((hour) => hour.precipitationChance),
    0
  )

  if (upcomingRainChance >= 60) {
    return {
      title: 'Rain likely later',
      message: `${upcomingRainChance}% chance of precipitation in the next few hours.`,
      icon: '🌧️'
    }
  }

  if (current.uvIndex >= 8) {
    return {
      title: 'Strong UV today',
      message: 'Extra sun protection is recommended if you are heading outside.',
      icon: '☀️'
    }
  }

  if (current.windSpeed >= 30) {
    return {
      title: 'Windy conditions',
      message: `Winds are currently around ${current.windSpeed} km/h.`,
      icon: '💨'
    }
  }

  if (current.temperature >= 35) {
    return {
      title: 'Very hot today',
      message: 'Stay hydrated and take breaks from prolonged heat exposure.',
      icon: '🔥'
    }
  }

  if (current.temperature <= 5) {
    return {
      title: 'Cold conditions',
      message: 'Temperatures are low, so an extra layer may be useful.',
      icon: '🧊'
    }
  }

  return {
    title: 'Conditions look comfortable',
    message: `${current.conditionLabel} with a current temperature of ${current.temperature}°.`,
    icon: '🌤️'
  }
}