import type { WeatherInsight as WeatherInsightData } from '../../utils/weatherInsights'

interface WeatherInsightProps {
  insight: WeatherInsightData
}

export default function WeatherInsight({
  insight
}: WeatherInsightProps) {
  return (
    <div className="mt-5 max-w-xl overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-r from-sky-400/10 via-white/50 to-amber/5 p-4 shadow-sm dark:border-sky-400/20 dark:from-sky-400/10 dark:via-paper/[0.04] dark:to-amber/5 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-lg">
          {insight.icon}
        </div>

        <div className="min-w-0">
          <p className="font-display text-sm font-semibold text-ink dark:text-paper">
            {insight.title}
          </p>

          <p className="mt-1 font-body text-xs leading-5 text-slate sm:text-sm">
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  )
}