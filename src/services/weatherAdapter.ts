import type {
  CitySearchResult,
  DailyReading,
  HourlyReading,
  LocationInfo,
  OpenMeteoWeatherResponse,
  WeatherSnapshot,
} from '../types/weather'
import { describeWeatherCode } from '../utils/weatherCodes'

function requiredValue<T>(value: T | undefined, label: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Open-Meteo response is missing ${label}.`)
  }
  return value
}

function formatHour(value: string): string {
  const hour = Number(value.slice(11, 13))
  if (!Number.isFinite(hour)) return value
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour} ${suffix}`
}

function formatDate(value: string): string {
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}

function formatDay(value: string, index: number): string {
  if (index === 0) return 'Today'
  return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(
    new Date(`${value}T12:00:00`),
  )
}

function formatLocalTime(value: string): string {
  const hour = Number(value.slice(11, 13))
  const minute = value.slice(14, 16)
  if (!Number.isFinite(hour) || !minute) return value
  const suffix = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${minute} ${suffix}`
}

function currentHourIndex(times: string[], currentTime: string): number {
  let index = 0
  for (let i = 0; i < times.length; i += 1) {
    if (times[i] > currentTime) break
    index = i
  }
  return index
}

function compassDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(degrees / 45) % directions.length]
}

export function cityLabel(city: CitySearchResult): string {
  return [city.name, city.region, city.country].filter(Boolean).join(', ')
}

export function adaptWeatherResponse(
  response: OpenMeteoWeatherResponse,
  city: CitySearchResult,
): WeatherSnapshot {
  const current = requiredValue(response.current, 'current weather')
  const hourly = requiredValue(response.hourly, 'hourly forecast')
  const daily = requiredValue(response.daily, 'daily forecast')
  const currentCode = requiredValue(current.weather_code, 'current weather code')
  const currentDescription = describeWeatherCode(currentCode)

  const location: LocationInfo = {
    city: city.name,
    region: city.region,
    country: city.country,
    localTime: formatLocalTime(requiredValue(current.time, 'current time')),
  }

  const hourlyTimes = requiredValue(hourly.time, 'hourly times')
  const hourlyTemperatures = requiredValue(hourly.temperature_2m, 'hourly temperatures')
  const hourlyCodes = requiredValue(hourly.weather_code, 'hourly weather codes')
  const hourlyPrecipitation = hourly.precipitation_probability ?? []
  const currentTime = requiredValue(current.time, 'current time')
  const startIndex = currentHourIndex(hourlyTimes, currentTime)
  const hourlyReadings: HourlyReading[] = hourlyTimes.slice(startIndex, startIndex + 12).map((time, index) => {
    const sourceIndex = startIndex + index
    return {
      time: index === 0 ? 'Now' : formatHour(time),
      temperature: Math.round(hourlyTemperatures[sourceIndex] ?? hourlyTemperatures[0] ?? 0),
      condition: describeWeatherCode(hourlyCodes[sourceIndex] ?? currentCode).condition,
      precipitationChance: hourlyPrecipitation[sourceIndex] ?? 0,
    }
  })

  const dailyTimes = requiredValue(daily.time, 'daily times')
  const dailyCodes = requiredValue(daily.weather_code, 'daily weather codes')
  const dailyHighs = requiredValue(daily.temperature_2m_max, 'daily high temperatures')
  const dailyLows = requiredValue(daily.temperature_2m_min, 'daily low temperatures')
  const dailyPrecipitation = daily.precipitation_probability_max ?? []
  const dailyReadings: DailyReading[] = dailyTimes.slice(0, 7).map((date, index) => {
    const description = describeWeatherCode(dailyCodes[index] ?? currentCode)
    return {
      day: formatDay(date, index),
      date: formatDate(date),
      condition: description.condition,
      conditionLabel: description.label,
      high: Math.round(dailyHighs[index] ?? 0),
      low: Math.round(dailyLows[index] ?? 0),
      precipitationChance: dailyPrecipitation[index] ?? 0,
    }
  })

  return {
    location,
    current: {
      temperature: Math.round(current.temperature_2m ?? 0),
      feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0),
      condition: currentDescription.condition,
      conditionLabel: currentDescription.label,
      humidity: Math.round(current.relative_humidity_2m ?? 0),
      windSpeed: Math.round(current.wind_speed_10m ?? 0),
      windDirection: compassDirection(current.wind_direction_10m ?? 0),
      uvIndex: Math.round(current.uv_index ?? 0),
      visibility: Math.round((current.visibility ?? 0) / 1000),
      pressure: Math.round(current.surface_pressure ?? 0),
    },
    hourly: hourlyReadings,
    daily: dailyReadings,
  }
}
