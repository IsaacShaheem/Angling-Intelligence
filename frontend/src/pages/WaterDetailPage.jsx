import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, CloudSun, Fish, Gauge, Loader2, MapPin, Navigation, RefreshCw, Thermometer, Waves, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import SpeciesGrid from '../components/SpeciesGrid.jsx'
import { fetchWaterById } from '../services/api.js'

function titleCase(value) {
  if (!value) return 'Medium'

  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function WaterDetailPage() {
  const { id } = useParams()
  const routerLocation = useLocation()
  const stateWater = routerLocation.state?.water
  const stateWeather = routerLocation.state?.weather
  const previousLocation = routerLocation.state?.location

  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true

    async function loadWater() {
      setLoading(true)
      setError('')

      try {
        const response = await fetchWaterById(id)

        if (!active) return

        setDetail(response)
      } catch (loadError) {
        if (!active) return

        setDetail(null)
        setError(loadError.message || 'Could not load this water.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadWater()

    return () => {
      active = false
    }
  }, [id, retryCount])

  const water = detail?.water || stateWater
  const weather = detail?.weather || stateWeather
  const species = useMemo(() => detail?.speciesScores || [], [detail])
  const bestTarget = useMemo(
    () => species.reduce((best, fish) => (!best || fish.score > best.score ? fish : best), null),
    [species],
  )
  const backTo = previousLocation
    ? `/results?location=${encodeURIComponent(previousLocation)}`
    : '/results'

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-mist">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(34,211,238,0.16),transparent_30rem),radial-gradient(circle_at_84%_20%,rgba(16,185,129,0.11),transparent_28rem),linear-gradient(180deg,#07131f_0%,#08131f_42%,#05121d_100%)]" />
      <div className="water-sheen pointer-events-none absolute inset-x-0 top-20 h-[42vh] opacity-25" />
      <div className="mist-layer pointer-events-none absolute inset-x-0 top-12 h-48 opacity-35" />
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-32">
        <Link
          to={backTo}
          state={previousLocation ? { location: previousLocation } : undefined}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-sm transition-colors hover:border-cyan-100/30 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to waters
        </Link>

        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/62">
              Lake intelligence
            </p>
            <h1 className="mt-3 text-5xl font-black leading-tight text-white sm:text-7xl">
              {water?.name || 'Loading water'}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-white/68">
              <Pill icon={MapPin} text={water?.region || 'Ontario'} />
              <Pill icon={Waves} text={water?.type || 'Water'} />
              <Pill icon={Gauge} text={`${titleCase(water?.accessibility)} access`} />
              {water?.distanceKm != null ? <Pill icon={Navigation} text={`${water.distanceKm} km away`} /> : null}
            </div>
          </div>

          <BestTargetCard fish={bestTarget} loading={loading} />
        </motion.div>
      </section>

      <section className="relative mx-auto mt-8 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5 shadow-md shadow-black/15 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/58">Current weather</p>
            <p className="mt-3 max-w-3xl text-lg font-medium leading-8 text-white/76">
              {weather?.insight || 'Current weather is being folded into the fish difficulty guidance for this water.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <WeatherMetric icon={CloudSun} text={weather?.condition || 'Current'} />
            <WeatherMetric icon={Thermometer} text={`${weather?.tempC ?? '--'}C`} />
            <WeatherMetric icon={Wind} text={`${weather?.windKph ?? '--'} km/h`} />
            <WeatherMetric icon={Fish} text={`${species.length || water?.speciesCount || 0} species`} />
          </div>
        </div>
      </section>

      {loading ? (
        <section className="relative mx-auto mt-14 grid max-w-6xl place-items-center px-5 sm:px-8">
          <div className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/[0.07] px-6 py-5 text-white/72 shadow-sm backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin text-cyan-100" />
            Reading species conditions
          </div>
        </section>
      ) : null}

      {!loading && error ? (
        <section className="relative mx-auto mt-14 max-w-6xl px-5 sm:px-8">
          <div className="rounded-[2rem] border border-rose-200/15 bg-rose-400/[0.07] p-8 text-center">
            <p className="text-lg font-bold text-white">Could not load water intelligence</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/62">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-white"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </section>
      ) : null}

      {!loading && !error && species.length > 0 ? (
        <SpeciesGrid species={species} water={water} weather={weather} />
      ) : null}

      {!loading && !error && species.length === 0 ? (
        <section className="relative mx-auto mt-14 max-w-6xl px-5 pb-20 sm:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
            <p className="text-lg font-bold text-white">No species intelligence found</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/58">
              Try another nearby water from the results list.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function BestTargetCard({ fish, loading }) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-emerald-100/15 bg-gradient-to-br from-emerald-200/[0.13] via-cyan-100/[0.075] to-white/[0.045] p-5 shadow-md shadow-black/15">
      <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-emerald-200/10 blur-2xl" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100/65">Best target right now</p>
        {loading ? (
          <div className="mt-4 flex items-center gap-3 text-white/68">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-100" />
            Calculating
          </div>
        ) : fish ? (
          <>
            <h2 className="mt-3 text-3xl font-black text-white">{fish.species}</h2>
            <div className="mt-3">
              <p className="text-4xl font-black leading-none text-emerald-100">{fish.score}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-white/58">
                {fish.difficulty || 'Medium'} Difficulty
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/62">
              {fish.shortExplanation || "Today's strongest target based on the current conditions."}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-white/62">Species scoring will appear when this water loads.</p>
        )}
      </div>
    </div>
  )
}

function Pill({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.075] px-3 py-2">
      <Icon className="h-4 w-4 text-cyan-100/72" />
      {text}
    </span>
  )
}

function WeatherMetric({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-bold text-white/76">
      <Icon className="h-4 w-4 shrink-0 text-cyan-100" />
      <span className="min-w-0 truncate">{text}</span>
    </div>
  )
}
