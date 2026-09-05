import { useEffect, useState } from 'react'
import type { TemperatureUnit } from '../utils/temperature'

const STORAGE_KEY = 'weatherpulse-temperature-unit'

function getInitialUnit(): TemperatureUnit {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored === 'fahrenheit') {
    return 'fahrenheit'
  }

  return 'celsius'
}

export function useTemperatureUnit() {
  const [unit, setUnit] = useState<TemperatureUnit>(getInitialUnit)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, unit)
  }, [unit])

  function toggleUnit() {
    setUnit((currentUnit) =>
      currentUnit === 'celsius'
        ? 'fahrenheit'
        : 'celsius'
    )
  }

  return {
    unit,
    setUnit,
    toggleUnit
  }
}