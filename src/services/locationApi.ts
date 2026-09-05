import type { CitySearchResult } from '../types/weather'

const REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse'

interface NominatimResponse {
  place_id?: number
  address?: {
    city?: string
    town?: string
    village?: string
    municipality?: string
    county?: string
    state?: string
    country?: string
    country_code?: string
  }
}

export class LocationApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LocationApiError'
  }
}

export interface Coordinates {
  latitude: number
  longitude: number
}

function getBrowserCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new LocationApiError(
          'Geolocation is not supported by this browser.',
        ),
      )
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new LocationApiError(
                'Location permission was denied. Please allow location access and try again.',
              ),
            )
            break

          case error.POSITION_UNAVAILABLE:
            reject(
              new LocationApiError(
                'Your location could not be determined.',
              ),
            )
            break

          case error.TIMEOUT:
            reject(
              new LocationApiError(
                'Location request timed out. Please try again.',
              ),
            )
            break

          default:
            reject(
              new LocationApiError(
                'Unable to determine your location.',
              ),
            )
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  })
}

async function reverseGeocode(
  coordinates: Coordinates,
): Promise<CitySearchResult> {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(coordinates.latitude),
    lon: String(coordinates.longitude),
    zoom: '10',
    addressdetails: '1',
  })

  const response = await fetch(
    `${REVERSE_GEOCODING_URL}?${params.toString()}`,
  )

  if (!response.ok) {
    throw new LocationApiError(
      `Location service returned HTTP ${response.status}.`,
    )
  }

  const data = (await response.json()) as NominatimResponse
  const address = data.address

  if (!address) {
    throw new LocationApiError(
      'Could not determine your location details.',
    )
  }

  const name =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    address.county

  if (!name) {
    throw new LocationApiError(
      'Could not determine a city for your location.',
    )
  }

  return {
    id: data.place_id ?? 0,
    name,
    region: address.state ?? '',
    country: address.country ?? '',
    countryCode: address.country_code?.toUpperCase() ?? '',
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timezone: 'auto',
  }
}

export async function getCurrentLocation(): Promise<CitySearchResult> {
  const coordinates = await getBrowserCoordinates()
  return reverseGeocode(coordinates)
}