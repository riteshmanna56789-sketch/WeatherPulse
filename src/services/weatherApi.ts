import type {
  CitySearchResult,
  OpenMeteoGeocodingResponse,
  OpenMeteoWeatherResponse
} from '../types/weather'
import { adaptWeatherResponse } from './weatherAdapter'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export class WeatherApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WeatherApiError'
  }
}

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new WeatherApiError(
      `Weather service returned HTTP ${response.status}.`
    )
  }

  try {
    return (await response.json()) as T
  } catch {
    throw new WeatherApiError(
      'Weather service returned invalid JSON.'
    )
  }
}

export async function searchCities(
  query: string,
  signal?: AbortSignal
): Promise<CitySearchResult[]> {
  const params = new URLSearchParams({
    name: query.trim(),
    count: '6',
    language: 'en',
    format: 'json'
  })

  const response = await fetchJson<OpenMeteoGeocodingResponse>(
    `${GEOCODING_URL}?${params.toString()}`,
    signal
  )

  return (response.results ?? []).flatMap((result) => {
    if (
      typeof result.id !== 'number' ||
      !result.name ||
      typeof result.latitude !== 'number' ||
      typeof result.longitude !== 'number'
    ) {
      return []
    }

    return [
      {
        id: result.id,
        name: result.name,
        region: result.admin1 ?? '',
        country: result.country ?? '',
        countryCode: result.country_code ?? '',
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone ?? 'auto',
        featureCode: result.feature_code ?? '',
        population: result.population
      }
    ]
  })
}

export async function fetchWeather(
  city: CitySearchResult,
  signal?: AbortSignal
) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index,surface_pressure,visibility',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,daylight_duration',
    timezone: 'auto',
    forecast_days: '7'
  })

  const response = await fetchJson<OpenMeteoWeatherResponse>(
    `${WEATHER_URL}?${params.toString()}`,
    signal
  )

  return adaptWeatherResponse(response, city)
}