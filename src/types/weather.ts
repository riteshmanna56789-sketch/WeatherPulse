export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'windy'

export interface CurrentWeather {
  temperature: number
  feelsLike: number
  condition: WeatherCondition
  conditionLabel: string
  humidity: number
  windSpeed: number
  windDirection: string
  uvIndex: number
  visibility: number
  pressure: number
}

export interface HourlyReading {
  time: string
  temperature: number
  condition: WeatherCondition
  precipitationChance: number
}

export interface DailyReading {
  day: string
  date: string
  condition: WeatherCondition
  conditionLabel: string
  high: number
  low: number
  precipitationChance: number
}

export interface LocationInfo {
  city: string
  region: string
  country: string
  localTime: string
}

export interface DaylightInfo {
  sunrise: string
  sunset: string
  daylightDuration: number
}

export interface WeatherSnapshot {
  location: LocationInfo
  current: CurrentWeather
  hourly: HourlyReading[]
  daily: DailyReading[]
  daylight?: DaylightInfo
}

export interface CitySearchResult {
  id: number
  name: string
  region: string
  country: string
  countryCode: string
  latitude: number
  longitude: number
  timezone: string
  featureCode?: string
  population?: number
}

export interface OpenMeteoGeocodingResponse {
  results?: Array<{
    id?: number
    name?: string
    admin1?: string
    country?: string
    latitude?: number
    longitude?: number
    timezone?: string
    feature_code?: string
    country_code?: string
    population?: number
  }>
  generationtime_ms?: number
  timezone_abbreviation?: string
  utc_offset_seconds?: number
}

export interface OpenMeteoWeatherResponse {
  current?: {
    time?: string
    temperature_2m?: number
    relative_humidity_2m?: number
    apparent_temperature?: number
    weather_code?: number
    wind_speed_10m?: number
    wind_direction_10m?: number
    uv_index?: number
    surface_pressure?: number
    visibility?: number
  }

  hourly?: {
    time?: string[]
    temperature_2m?: number[]
    precipitation_probability?: number[]
    weather_code?: number[]
  }

  daily?: {
    time?: string[]
    weather_code?: number[]
    temperature_2m_max?: number[]
    temperature_2m_min?: number[]
    precipitation_probability_max?: number[]
    sunrise?: string[]
    sunset?: string[]
    daylight_duration?: number[]
  }

  timezone?: string
  timezone_abbreviation?: string
}