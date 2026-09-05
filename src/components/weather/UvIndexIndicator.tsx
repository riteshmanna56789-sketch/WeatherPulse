import { getUvIndexInfo } from '../../utils/uvindex'

interface UvIndexIndicatorProps {
  uvIndex: number
}

function getIndicatorPosition(uvIndex: number): number {
  const clampedIndex = Math.max(0, Math.min(uvIndex, 11))
  return (clampedIndex / 11) * 100
}

function getRiskTextClass(level: string): string {
  if (level === 'low') {
    return 'text-emerald-600 dark:text-emerald-400'
  }

  if (level === 'moderate') {
    return 'text-yellow-600 dark:text-yellow-400'
  }

  if (level === 'high') {
    return 'text-orange-600 dark:text-orange-400'
  }

  if (level === 'very-high') {
    return 'text-red-600 dark:text-red-400'
  }

  return 'text-red-700 dark:text-red-400'
}

export default function UvIndexIndicator({
  uvIndex
}: UvIndexIndicatorProps) {
  const info = getUvIndexInfo(uvIndex)
  const position = getIndicatorPosition(uvIndex)

  return (
    <div className="mt-5 max-w-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">☀️</span>

            <span className="font-body text-sm font-medium text-ink dark:text-paper">
              UV index
            </span>

            <span className="font-display text-sm font-semibold text-ink dark:text-paper">
              {uvIndex}
            </span>

            <span
              className={`font-body text-sm font-semibold ${getRiskTextClass(
                info.level
              )}`}
            >
              · {info.label}
            </span>
          </div>

          <p className="mt-1 font-body text-xs text-slate">
            {info.advice}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="relative h-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-60% to-red-600">
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-ink shadow-md dark:border-ink-soft dark:bg-paper"
            style={{
              left: `${position}%`
            }}
          />
        </div>

        <div className="mt-1 flex justify-between font-body text-[10px] text-slate">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Extreme</span>
        </div>
      </div>
    </div>
  )
}