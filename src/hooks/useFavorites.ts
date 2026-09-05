import { useEffect, useState } from 'react'
import type { CitySearchResult } from '../types/weather'

const STORAGE_KEY = 'weatherpulse-favorites'

function getLocationKey(city: CitySearchResult): string {
  return [
    city.name,
    city.region,
    city.country,
    city.countryCode
  ]
    .map((value) => value.trim().toLowerCase())
    .join('|')
}

function loadFavorites(): CitySearchResult[] {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) return []

  try {
    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    const validFavorites = parsed.filter(
      (city): city is CitySearchResult =>
        city &&
        typeof city === 'object' &&
        typeof city.id === 'number' &&
        typeof city.name === 'string' &&
        typeof city.region === 'string' &&
        typeof city.country === 'string' &&
        typeof city.countryCode === 'string' &&
        typeof city.latitude === 'number' &&
        typeof city.longitude === 'number' &&
        typeof city.timezone === 'string'
    )

    const uniqueFavorites = validFavorites.filter(
      (city, index, array) =>
        array.findIndex(
          (favorite) =>
            getLocationKey(favorite) === getLocationKey(city)
        ) === index
    )

    return uniqueFavorites
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<CitySearchResult[]>(
    loadFavorites
  )

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    )
  }, [favorites])

  function addFavorite(city: CitySearchResult) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) =>
          getLocationKey(favorite) === getLocationKey(city)
      )

      if (alreadyFavorite) {
        return currentFavorites
      }

      return [...currentFavorites, city]
    })
  }

  function removeFavorite(city: CitySearchResult) {
    const cityKey = getLocationKey(city)

    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (favorite) =>
          getLocationKey(favorite) !== cityKey
      )
    )
  }

  function isFavorite(city: CitySearchResult) {
    const cityKey = getLocationKey(city)

    return favorites.some(
      (favorite) =>
        getLocationKey(favorite) === cityKey
    )
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }
}