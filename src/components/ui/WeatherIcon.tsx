import type { WeatherCondition } from '../../types/weather'

interface WeatherIconProps {
  condition: WeatherCondition
  className?: string
}

/**
 * Geometric weather icon set.
 *
 * The icons intentionally use a clean line-based visual language
 * so they remain consistent across the WeatherPulse dashboard.
 */
export default function WeatherIcon({
  condition,
  className = 'w-6 h-6'
}: WeatherIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  }

  switch (condition) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.5" />

          <path d="M12 2.5v2.4M12 19.1v2.4M4.7 4.7l1.7 1.7M17.6 17.6l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.7 19.3l1.7-1.7M17.6 6.4l1.7-1.7" />
        </svg>
      )

    case 'partly-cloudy':
      return (
        <svg {...common}>
          <circle cx="8.5" cy="8.2" r="3.4" />

          <path d="M8.5 3.2v1.5M8.5 11.7v.4M3.3 8.2h1.5M4.8 4.5l1.1 1.1M12.2 4.5l-1.1 1.1" />

          <path d="M11.3 19.5h5.8a3.3 3.3 0 0 0 .5-6.55A4.7 4.7 0 0 0 9 12.1a3 3 0 0 0-1.2 5.8" />
        </svg>
      )

    case 'cloudy':
      return (
        <svg {...common}>
          <path d="M6.6 18.8h10.8a3.6 3.6 0 0 0 .5-7.05A5.1 5.1 0 0 0 8.5 10.3a3.5 3.5 0 0 0-1.9 8.5Z" />

          <path d="M8.5 15.4h.01M12 15.4h.01M15.5 15.4h.01" />
        </svg>
      )

    case 'rain':
      return (
        <svg {...common}>
          <path d="M6.7 13.8h10.5a3.6 3.6 0 0 0 .5-7.05A5.1 5.1 0 0 0 8.5 5.3a3.5 3.5 0 0 0-1.8 8.5Z" />

          <path
            d="M8 17.2 6.9 20M12 17.2 10.9 20M16 17.2 14.9 20"
            strokeWidth={1.75}
          />
        </svg>
      )

    case 'thunderstorm':
      return (
        <svg {...common}>
          <path d="M6.7 12.8h10.5a3.6 3.6 0 0 0 .5-7.05A5.1 5.1 0 0 0 8.5 4.3a3.5 3.5 0 0 0-1.8 8.5Z" />

          <path
            d="m13.5 12.5-3 4.4h3l-2 4.6 5.8-7h-3.3l2-2Z"
            strokeWidth={1.7}
          />
        </svg>
      )

    case 'snow':
      return (
        <svg {...common}>
          <path d="M6.7 12.4h10.5a3.6 3.6 0 0 0 .5-7.05A5.1 5.1 0 0 0 8.5 3.9a3.5 3.5 0 0 0-1.8 8.5Z" />

          <path d="M8.5 16.2v5.2M12.5 16.2v5.2M16.5 16.2v5.2" />

          <path d="m6.8 18.2 3.4 1.7M14.8 19.9l3.4-1.7M6.8 20.4l3.4-1.7M14.8 18.7l3.4 1.7" />
        </svg>
      )

    case 'fog':
      return (
        <svg {...common}>
          <path d="M6.5 10.5h9.8a3.4 3.4 0 0 0 .4-6.75A4.8 4.8 0 0 0 8.2 3.8a3.4 3.4 0 0 0-1.7 6.7Z" />

          <path d="M4 14.2h16M4 17.7h16M4 21.2h11.5" />
        </svg>
      )

    case 'windy':
      return (
        <svg {...common}>
          <path d="M3 7.5h11.5a2.75 2.75 0 1 0-2.4-4.1" />

          <path d="M3 12.5h15.5a2.75 2.75 0 1 1-2.4 4.1" />

          <path d="M3 17.5h8.5a2 2 0 1 1-1.75 2.95" />
        </svg>
      )

    default:
      return null
  }
}