export type TemperatureUnit = 'celsius' | 'fahrenheit'

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit
): number {
  if (unit === 'celsius') {
    return Math.round(celsius)
  }

  return Math.round((celsius * 9) / 5 + 32)
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit
): string {
  return `${convertTemperature(celsius, unit)}°`
}