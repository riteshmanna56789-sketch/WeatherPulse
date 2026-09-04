import type { WeatherSnapshot } from '../types/weather'

/**
 * Placeholder data, intentionally shaped like a real weather API response
 * (e.g. Open-Meteo / OpenWeather) so a live fetch can replace this import
 * later without reshaping any component.
 */
export const mockWeatherByCity: Record<string, WeatherSnapshot> = {
  Kolkata: {
    location: {
      city: 'Kolkata',
      region: 'West Bengal',
      country: 'India',
      localTime: '2:45 PM',
    },
    current: {
      temperature: 33,
      feelsLike: 38,
      condition: 'partly-cloudy',
      conditionLabel: 'Partly Cloudy',
      humidity: 78,
      windSpeed: 14,
      windDirection: 'SE',
      uvIndex: 7,
      visibility: 8,
      pressure: 1006,
    },
    hourly: [
      { time: 'Now', temperature: 33, condition: 'partly-cloudy', precipitationChance: 10 },
      { time: '3 PM', temperature: 34, condition: 'partly-cloudy', precipitationChance: 15 },
      { time: '4 PM', temperature: 33, condition: 'cloudy', precipitationChance: 20 },
      { time: '5 PM', temperature: 32, condition: 'cloudy', precipitationChance: 30 },
      { time: '6 PM', temperature: 30, condition: 'rain', precipitationChance: 55 },
      { time: '7 PM', temperature: 29, condition: 'rain', precipitationChance: 60 },
      { time: '8 PM', temperature: 28, condition: 'thunderstorm', precipitationChance: 70 },
      { time: '9 PM', temperature: 28, condition: 'rain', precipitationChance: 50 },
      { time: '10 PM', temperature: 27, condition: 'cloudy', precipitationChance: 25 },
      { time: '11 PM', temperature: 27, condition: 'clear', precipitationChance: 5 },
      { time: '12 AM', temperature: 26, condition: 'clear', precipitationChance: 5 },
      { time: '1 AM', temperature: 26, condition: 'clear', precipitationChance: 0 },
    ],
    daily: [
      { day: 'Today', date: 'Sep 4', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 34, low: 27, precipitationChance: 40 },
      { day: 'Fri', date: 'Sep 5', condition: 'rain', conditionLabel: 'Showers', high: 31, low: 26, precipitationChance: 70 },
      { day: 'Sat', date: 'Sep 6', condition: 'thunderstorm', conditionLabel: 'Thunderstorms', high: 30, low: 25, precipitationChance: 80 },
      { day: 'Sun', date: 'Sep 7', condition: 'cloudy', conditionLabel: 'Overcast', high: 31, low: 26, precipitationChance: 45 },
      { day: 'Mon', date: 'Sep 8', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 32, low: 26, precipitationChance: 30 },
      { day: 'Tue', date: 'Sep 9', condition: 'clear', conditionLabel: 'Sunny', high: 33, low: 25, precipitationChance: 10 },
      { day: 'Wed', date: 'Sep 10', condition: 'clear', conditionLabel: 'Sunny', high: 34, low: 26, precipitationChance: 5 },
    ],
  },
  London: {
    location: {
      city: 'London',
      region: 'England',
      country: 'United Kingdom',
      localTime: '10:15 AM',
    },
    current: {
      temperature: 17,
      feelsLike: 15,
      condition: 'cloudy',
      conditionLabel: 'Overcast',
      humidity: 64,
      windSpeed: 22,
      windDirection: 'W',
      uvIndex: 2,
      visibility: 12,
      pressure: 1013,
    },
    hourly: [
      { time: 'Now', temperature: 17, condition: 'cloudy', precipitationChance: 20 },
      { time: '11 AM', temperature: 18, condition: 'cloudy', precipitationChance: 20 },
      { time: '12 PM', temperature: 18, condition: 'partly-cloudy', precipitationChance: 15 },
      { time: '1 PM', temperature: 19, condition: 'partly-cloudy', precipitationChance: 10 },
      { time: '2 PM', temperature: 19, condition: 'clear', precipitationChance: 5 },
      { time: '3 PM', temperature: 18, condition: 'clear', precipitationChance: 5 },
      { time: '4 PM', temperature: 18, condition: 'partly-cloudy', precipitationChance: 10 },
      { time: '5 PM', temperature: 17, condition: 'cloudy', precipitationChance: 25 },
      { time: '6 PM', temperature: 16, condition: 'rain', precipitationChance: 45 },
      { time: '7 PM', temperature: 15, condition: 'rain', precipitationChance: 50 },
      { time: '8 PM', temperature: 14, condition: 'cloudy', precipitationChance: 30 },
      { time: '9 PM', temperature: 13, condition: 'cloudy', precipitationChance: 20 },
    ],
    daily: [
      { day: 'Today', date: 'Sep 4', condition: 'cloudy', conditionLabel: 'Overcast', high: 19, low: 13, precipitationChance: 30 },
      { day: 'Fri', date: 'Sep 5', condition: 'rain', conditionLabel: 'Light Rain', high: 17, low: 12, precipitationChance: 65 },
      { day: 'Sat', date: 'Sep 6', condition: 'windy', conditionLabel: 'Windy', high: 16, low: 11, precipitationChance: 40 },
      { day: 'Sun', date: 'Sep 7', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 18, low: 12, precipitationChance: 20 },
      { day: 'Mon', date: 'Sep 8', condition: 'clear', conditionLabel: 'Sunny', high: 20, low: 13, precipitationChance: 5 },
      { day: 'Tue', date: 'Sep 9', condition: 'clear', conditionLabel: 'Sunny', high: 21, low: 14, precipitationChance: 5 },
      { day: 'Wed', date: 'Sep 10', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 19, low: 13, precipitationChance: 15 },
    ],
  },
  Tokyo: {
    location: {
      city: 'Tokyo',
      region: 'Kanto',
      country: 'Japan',
      localTime: '6:20 PM',
    },
    current: {
      temperature: 28,
      feelsLike: 31,
      condition: 'clear',
      conditionLabel: 'Clear',
      humidity: 58,
      windSpeed: 9,
      windDirection: 'N',
      uvIndex: 3,
      visibility: 15,
      pressure: 1011,
    },
    hourly: [
      { time: 'Now', temperature: 28, condition: 'clear', precipitationChance: 0 },
      { time: '7 PM', temperature: 26, condition: 'clear', precipitationChance: 0 },
      { time: '8 PM', temperature: 25, condition: 'clear', precipitationChance: 0 },
      { time: '9 PM', temperature: 24, condition: 'partly-cloudy', precipitationChance: 5 },
      { time: '10 PM', temperature: 23, condition: 'partly-cloudy', precipitationChance: 5 },
      { time: '11 PM', temperature: 23, condition: 'cloudy', precipitationChance: 10 },
      { time: '12 AM', temperature: 22, condition: 'cloudy', precipitationChance: 10 },
      { time: '1 AM', temperature: 22, condition: 'clear', precipitationChance: 0 },
      { time: '2 AM', temperature: 21, condition: 'clear', precipitationChance: 0 },
      { time: '3 AM', temperature: 21, condition: 'clear', precipitationChance: 0 },
      { time: '4 AM', temperature: 20, condition: 'clear', precipitationChance: 0 },
      { time: '5 AM', temperature: 20, condition: 'fog', precipitationChance: 0 },
    ],
    daily: [
      { day: 'Today', date: 'Sep 4', condition: 'clear', conditionLabel: 'Clear', high: 29, low: 22, precipitationChance: 0 },
      { day: 'Fri', date: 'Sep 5', condition: 'clear', conditionLabel: 'Sunny', high: 30, low: 23, precipitationChance: 0 },
      { day: 'Sat', date: 'Sep 6', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 29, low: 23, precipitationChance: 10 },
      { day: 'Sun', date: 'Sep 7', condition: 'rain', conditionLabel: 'Showers', high: 27, low: 22, precipitationChance: 60 },
      { day: 'Mon', date: 'Sep 8', condition: 'thunderstorm', conditionLabel: 'Thunderstorms', high: 26, low: 22, precipitationChance: 75 },
      { day: 'Tue', date: 'Sep 9', condition: 'cloudy', conditionLabel: 'Overcast', high: 27, low: 22, precipitationChance: 35 },
      { day: 'Wed', date: 'Sep 10', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', high: 28, low: 23, precipitationChance: 20 },
    ],
  },
}

export const defaultCity = 'Kolkata'

export function getWeatherForCity(city: string): WeatherSnapshot {
  const match = Object.keys(mockWeatherByCity).find(
    (key) => key.toLowerCase() === city.trim().toLowerCase(),
  )
  return mockWeatherByCity[match ?? defaultCity]
}

export const availableCities = Object.keys(mockWeatherByCity)
