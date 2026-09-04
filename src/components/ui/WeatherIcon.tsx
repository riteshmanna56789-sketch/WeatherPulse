import type { WeatherCondition } from '../../types/weather'

interface WeatherIconProps {
  condition: WeatherCondition
  className?: string
}

/**
 * Minimal line-based icon set. Deliberately geometric/instrument-like
 * rather than the rounded cartoon-cloud style most weather apps use.
 */
export default function WeatherIcon({ condition, className = 'w-6 h-6' }: WeatherIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (condition) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </svg>
      )
    case 'partly-cloudy':
      return (
        <svg {...common}>
          <circle cx="8.5" cy="8.5" r="3.4" />
          <path d="M8.5 3.2v1.6M8.5 12.2v.4M3.2 8.5h1.6M13.9 3.2 12.9 4.4M3.5 13.5l1.1-1.1" />
          <path d="M11.8 20h5.7a3.3 3.3 0 0 0 .5-6.55A4.6 4.6 0 0 0 9.3 12.2a3 3 0 0 0-1.1 5.8" />
        </svg>
      )
    case 'cloudy':
      return (
        <svg {...common}>
          <path d="M6.8 19h10.9a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.6 10.6 3.4 3.4 0 0 0 6.8 19Z" />
        </svg>
      )
    case 'rain':
      return (
        <svg {...common}>
          <path d="M6.8 14.5h10.4a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.6 6.1 3.4 3.4 0 0 0 6.8 14.5Z" />
          <path d="M8.5 17.5 7.3 20M12.5 17.5 11.3 20M16.5 17.5 15.3 20" />
        </svg>
      )
    case 'thunderstorm':
      return (
        <svg {...common}>
          <path d="M6.8 13h10.4a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.6 4.6 3.4 3.4 0 0 0 6.8 13Z" />
          <path d="M13 13.5 10 18h3l-2 4.5 6-7h-3.4l2-2Z" />
        </svg>
      )
    case 'snow':
      return (
        <svg {...common}>
          <path d="M6.8 12.5h10.4a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.6 4.1 3.4 3.4 0 0 0 6.8 12.5Z" />
          <path d="M8 16v6M12 16v6M16 16v6M6.5 18.5l3 1.5M17.5 18.5l-3 1.5M6.5 22.5l3-1.5M17.5 22.5l-3-1.5" />
        </svg>
      )
    case 'fog':
      return (
        <svg {...common}>
          <path d="M6.5 10.5h9.7a3.3 3.3 0 0 0 .3-6.58A4.7 4.7 0 0 0 8.2 3.8 3.3 3.3 0 0 0 6.5 10.5Z" />
          <path d="M4 14.5h16M4 18h16M4 21.5h11" />
        </svg>
      )
    case 'windy':
      return (
        <svg {...common}>
          <path d="M3 8h11.5a2.75 2.75 0 1 0-2.4-4.1" />
          <path d="M3 13h15.5a2.75 2.75 0 1 1-2.4 4.1" />
          <path d="M3 18h8.5a2 2 0 1 1-1.75 2.95" />
        </svg>
      )
    default:
      return null
  }
}
