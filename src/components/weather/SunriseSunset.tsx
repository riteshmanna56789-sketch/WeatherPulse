import type { DaylightInfo } from '../../types/weather'

interface SunriseSunsetProps {
  daylight: DaylightInfo
}

function formatDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

export default function SunriseSunset({
  daylight
}: SunriseSunsetProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_16px_45px_rgba(15,27,45,0.06)] dark:border-paper/10 dark:bg-ink-soft">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              Daylight
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink dark:text-paper sm:text-2xl">
              Sunrise & sunset
            </h2>
          </div>

          <div className="rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-right dark:border-paper/10 dark:bg-paper/5">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.12em] text-slate">
              Daylight
            </p>

            <p className="font-display text-sm font-semibold text-ink dark:text-paper">
              {formatDuration(daylight.daylightDuration)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-amber/15 bg-amber/5 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-amber"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2.5v3" />
                <path d="M12 18.5v3" />
                <path d="m4.8 4.8 2.1 2.1" />
                <path d="m17.1 17.1 2.1 2.1" />
                <path d="M2.5 12h3" />
                <path d="M18.5 12h3" />
                <path d="m4.8 19.2 2.1-2.1" />
                <path d="m17.1 6.9 2.1-2.1" />
              </svg>
            </div>

            <div>
              <p className="font-body text-xs font-medium text-slate">
                Sunrise
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink dark:text-paper sm:text-2xl">
                {daylight.sunrise}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-sky-400/15 bg-sky-400/5 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-400/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-sky-500 dark:text-sky-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2.5v3" />
                <path d="M12 18.5v3" />
                <path d="m4.8 4.8 2.1 2.1" />
                <path d="m17.1 17.1 2.1 2.1" />
                <path d="M2.5 12h3" />
                <path d="M18.5 12h3" />
                <path d="m4.8 19.2 2.1-2.1" />
                <path d="m17.1 6.9 2.1-2.1" />
              </svg>
            </div>

            <div>
              <p className="font-body text-xs font-medium text-slate">
                Sunset
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink dark:text-paper sm:text-2xl">
                {daylight.sunset}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 border-t border-ink/10 pt-4 dark:border-paper/10">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber"
            aria-hidden="true"
          />

          <p className="font-body text-xs text-slate">
            {formatDuration(daylight.daylightDuration)} of daylight today
          </p>
        </div>
      </div>
    </section>
  )
}