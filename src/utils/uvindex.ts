export type UvRiskLevel =
  | 'low'
  | 'moderate'
  | 'high'
  | 'very-high'
  | 'extreme'

export interface UvIndexInfo {
  level: UvRiskLevel
  label: string
  advice: string
}

export function getUvIndexInfo(uvIndex: number): UvIndexInfo {
  if (uvIndex <= 2) {
    return {
      level: 'low',
      label: 'Low',
      advice: 'Minimal sun protection needed'
    }
  }

  if (uvIndex <= 5) {
    return {
      level: 'moderate',
      label: 'Moderate',
      advice: 'Sun protection recommended'
    }
  }

  if (uvIndex <= 7) {
    return {
      level: 'high',
      label: 'High',
      advice: 'Protection recommended'
    }
  }

  if (uvIndex <= 10) {
    return {
      level: 'very-high',
      label: 'Very High',
      advice: 'Extra protection needed'
    }
  }

  return {
    level: 'extreme',
    label: 'Extreme',
    advice: 'Avoid prolonged sun exposure'
  }
}