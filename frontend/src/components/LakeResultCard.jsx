import { ArrowUpRight, Fish, Gauge, MapPin, Navigation, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { memo } from 'react'

function titleCase(value) {
  if (!value) return 'Medium'

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function LakeResultCard({ water, weather, location }) {
  const pressure = `${titleCase(water.pressureLevel)} pressure`
  const bestWindow = water.bestWindow || 'Today'
  const weatherSummary = weather?.condition
    ? `${weather.condition}, ${weather.tempC ?? '--'}C`
    : 'Current conditions ready'

  return (
    <motion.article
      layout
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.055] to-cyan-100/[0.035] shadow-md shadow-black/15 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cyan-100/30 hover:bg-white/[0.085]"
      whileTap={{ scale: 0.992 }}
    >
      <Link
        to={`/water/${encodeURIComponent(water.id)}`}
        state={{ water, weather, location }}
        className="relative block p-5 text-left sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent" />
          <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-cyan-200/10 blur-2xl" />
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[1fr_19rem] lg:items-center">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100/10 text-cyan-100">
                <Waves className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/60">
                  {water.distanceKm ?? '--'} km away
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-white/48">{water.region}</p>
              </div>
            </div>

            <h3 className="text-3xl font-black leading-tight text-white sm:text-4xl">{water.name}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              {water.shoreline || `${water.type} water near ${water.region}`}
            </p>
          </div>

          <div className="grid gap-3">
            <Meta icon={Navigation} label={bestWindow} tone="text-emerald-100" />
            <Meta icon={MapPin} label={weatherSummary} tone="text-cyan-100" />
            <Meta icon={Gauge} label={pressure} />
            <Meta icon={Fish} label={`${water.speciesCount ?? 0} target species`} />

            <div className="mt-1 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/15 px-4 py-3 text-sm font-bold text-white">
              <span>View water intelligence</span>
              <ArrowUpRight className="h-4 w-4 text-cyan-100 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function Meta({ icon: Icon, label, tone = 'text-white/70' }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
      <Icon className={`h-4 w-4 ${tone}`} />
      <span className="min-w-0 truncate text-sm font-semibold text-white/72">{label}</span>
    </div>
  )
}

export default memo(LakeResultCard)
