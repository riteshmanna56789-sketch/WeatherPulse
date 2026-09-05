import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import CurrentWeatherCard from './components/weather/CurrentWeatherCard'
import HourlyForecast from './components/weather/HourlyForecast'
import DailyForecast from './components/weather/DailyForecast'
import FavoriteLocations from './components/weather/FavoriteLocations'
import { useTheme } from './hooks/useTheme'
import { useFavorites } from './hooks/useFavorites'
import { useTemperatureUnit } from './hooks/useTemperatureUnit'
import { defaultCity, getWeatherForCity } from './data/mockWeather'
import {
  fetchWeather,
  searchCities,
  WeatherApiError
} from './services/weatherApi'
import {
  getCurrentLocation,
  LocationApiError
} from './services/locationApi'
import type {
  CitySearchResult,
  WeatherSnapshot
} from './types/weather'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  } = useFavorites()

  const {
    unit,
    toggleUnit
  } = useTemperatureUnit()

  const [snapshot, setSnapshot] = useState<WeatherSnapshot>(() =>
    getWeatherForCity(defaultCity)
  )

  const [selectedCity, setSelectedCity] =
    useState<CitySearchResult | null>(null)

  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    searchCities(defaultCity, controller.signal)
      .then((results) => {
        const match = results[0]

        if (!match) {
          throw new WeatherApiError(`Could not find ${defaultCity}.`)
        }

        setSelectedCity(match)

        return fetchWeather(match, controller.signal)
      })
      .then((weather) => {
        setSnapshot(weather)
        setLastUpdated(Date.now())
        setNotice(null)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return

        setNotice(
          'Live weather is unavailable right now. Showing sample data instead.'
        )
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length < 2) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()

    const timeout = window.setTimeout(() => {
      searchCities(trimmedQuery, controller.signal)
        .then(setSuggestions)
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') return

          setSuggestions([])
        })
    }, 300)

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)
  }

  async function handleSearch(city: CitySearchResult) {
    const controller = new AbortController()

    setLoading(true)
    setNotice(null)

    try {
      const weather = await fetchWeather(city, controller.signal)

      setSelectedCity(city)
      setSnapshot(weather)
      setLastUpdated(Date.now())
      setSuggestions([])
      setQuery('')
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return

      setNotice(
        error instanceof WeatherApiError
          ? error.message
          : 'Unable to load live weather. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleUseLocation() {
    setLoading(true)
    setNotice(null)

    try {
      const location = await getCurrentLocation()
      const weather = await fetchWeather(location)

      setSelectedCity(location)
      setSnapshot(weather)
      setLastUpdated(Date.now())
      setSuggestions([])
      setQuery('')
    } catch (error: unknown) {
      if (error instanceof LocationApiError) {
        setNotice(error.message)
      } else if (error instanceof WeatherApiError) {
        setNotice(error.message)
      } else {
        setNotice(
          'Unable to load weather for your location. Please try again.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleFavoriteSelect(city: CitySearchResult) {
    setLoading(true)
    setNotice(null)

    try {
      const weather = await fetchWeather(city)

      setSelectedCity(city)
      setSnapshot(weather)
      setLastUpdated(Date.now())
    } catch (error: unknown) {
      setNotice(
        error instanceof WeatherApiError
          ? error.message
          : 'Unable to load live weather. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleRefresh() {
    if (!selectedCity) return

    setLoading(true)
    setNotice(null)

    try {
      const weather = await fetchWeather(selectedCity)

      setSnapshot(weather)
      setLastUpdated(Date.now())
    } catch (error: unknown) {
      setNotice(
        error instanceof WeatherApiError
          ? error.message
          : 'Unable to refresh weather. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  function handleToggleFavorite() {
    if (!selectedCity) return

    if (isFavorite(selectedCity)) {
      removeFavorite(selectedCity)
    } else {
      addFavorite(selectedCity)
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        onSearch={handleSearch}
        onQueryChange={handleQueryChange}
        suggestions={suggestions}
        theme={theme}
        onToggleTheme={toggleTheme}
        onUseLocation={handleUseLocation}
        loading={loading}
      />

      <main className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        {(loading || notice) && (
          <div className="mb-6 animate-rise rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 font-body text-sm text-amber-dim dark:text-amber">
            {loading ? 'Loading live weather…' : notice}
          </div>
        )}

        <div className="mb-6">
          <FavoriteLocations
            favorites={favorites}
            onSelect={handleFavoriteSelect}
            onRemove={removeFavorite}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <CurrentWeatherCard
              location={snapshot.location}
              current={snapshot.current}
              city={selectedCity}
              isFavorite={
                selectedCity
                  ? isFavorite(selectedCity)
                  : false
              }
              onToggleFavorite={handleToggleFavorite}
              onRefresh={handleRefresh}
              loading={loading}
              unit={unit}
              onToggleUnit={toggleUnit}
              lastUpdated={lastUpdated}
            />
          </div>

          <div className="lg:col-span-1">
            <HourlyForecast
              hours={snapshot.hourly}
              unit={unit}
            />
          </div>

          <div className="lg:col-span-1">
             <DailyForecast
  days={snapshot.daily}
  unit={unit}
  currentTemperature={snapshot.current.temperature}
/>
          </div>
        </div>

        <footer className="mt-10 pb-6 text-center font-body text-xs text-slate">
          WeatherPulse · Live weather by Open-Meteo
        </footer>
      </main>
    </div>
  )
}