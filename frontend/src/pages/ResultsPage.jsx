import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Loader2, MapPinned, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import NearbyWatersGrid from '../components/NearbyWatersGrid.jsx'
import WeatherBanner from '../components/WeatherBanner.jsx'
import { fetchNearbyWaters, fetchWaterById } from '../services/api.js'

export default function ResultsPage() {
  const routerLocation = useLocation()
  const [searchParams] = useSearchParams()
  const requestedLocation = routerLocation.state?.location || searchParams.get('location') || 'Guelph, ON'

  const [location, setLocation] = useState(requestedLocation)
  const [weather, setWeather] = useState(null)
  const [waters, setWaters] = useState([])
  const [expandedWaterId, setExpandedWaterId] = useState(null)
  const [waterDetails, setWaterDetails] = useState({})
  const [loadingWaters, setLoadingWaters] = useState(true)
  const [loadingWaterId, setLoadingWaterId] = useState(null)
  const [resultsError, setResultsError] = useState('')
  const [waterErrors, setWaterErrors] = useState({})
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true

    async function loadResults() {
      setLoadingWaters(true)
      setResultsError('')

      try {
        const response = await fetchNearbyWaters(requestedLocation)

        if (!active) return

        setLocation(response.location)
        setWeather(response.weather)
        setWaters(response.waters)
      } catch (error) {
        if (!active) return

        setWeather(null)
        setWaters([])
        setResultsError(error.message || 'Could not load nearby waters.')
      } finally {
        if (active) {
          setLoadingWaters(false)
        }
      }
    }

    loadResults()

    return () => {
      active = false
    }
  }, [requestedLocation, retryCount])

  const handleToggleWater = useCallback(async (water) => {
    if (expandedWaterId === water.id) {
      setExpandedWaterId(null)
      return
    }

    setExpandedWaterId(water.id)

    if (waterDetails[water.id]) return

    setLoadingWaterId(water.id)
    setWaterErrors((current) => ({ ...current, [water.id]: '' }))

    try {
      const response = await fetchWaterById(water.id)
      setWaterDetails((current) => ({ ...current, [water.id]: response }))
    } catch (error) {
      setWaterErrors((current) => ({
        ...current,
        [water.id]: error.message || 'Could not load this water.',
      }))
    } finally {
      setLoadingWaterId(null)
    }
  }, [expandedWaterId, waterDetails])

  const hasResults = useMemo(() => waters.length > 0 && weather, [waters, weather])
  const nearestWater = waters[0]

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight pb-20 text-mist">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(34,211,238,0.14),transparent_30rem),radial-gradient(circle_at_80%_14%,rgba(16,185,129,0.10),transparent_28rem),linear-gradient(180deg,#07131f_0%,#08131f_45%,#061722_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-100/[0.035] to-transparent" />
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-32">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-sm transition-colors hover:border-cyan-100/30 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          New search
        </Link>

        <motion.div
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/62">
              Nearby fishing intelligence
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">
              Waters near {location}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
              Expand a water to compare today’s best species opportunities without leaving the list.
            </p>
          </div>

          {nearestWater ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 text-white/72 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-100/10 text-cyan-100">
                  <MapPinned className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">Closest water</p>
                  <p className="mt-1 font-bold text-white">{nearestWater.name}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-black/15 px-4 py-3 text-sm">
                <span>{nearestWater.distanceKm} km away</span>
                <span className="flex items-center gap-2 font-semibold text-emerald-100">
                  <Waves className="h-4 w-4" />
                  {waters.length} waters
                </span>
              </div>
            </div>
          ) : null}
        </motion.div>
      </section>

      {loadingWaters ? (
        <section className="relative mx-auto mt-14 grid max-w-6xl place-items-center px-5 sm:px-8">
          <div className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-white/[0.07] px-6 py-5 text-white/72 shadow-sm backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin text-cyan-100" />
            Reading nearby water conditions
          </div>
        </section>
      ) : null}

      {!loadingWaters && resultsError ? (
        <section className="relative mx-auto mt-14 max-w-6xl px-5 sm:px-8">
          <div className="rounded-[2rem] border border-rose-200/15 bg-rose-400/[0.07] p-8 text-center">
            <p className="text-lg font-bold text-white">Could not load nearby waters</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/62">{resultsError}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-full bg-cyan-100 px-5 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-white"
            >
              Try again
            </button>
          </div>
        </section>
      ) : null}

      {hasResults ? (
        <>
          <WeatherBanner weather={weather} location={location} />
          <NearbyWatersGrid
            waters={waters}
            expandedWaterId={expandedWaterId}
            waterDetails={waterDetails}
            waterErrors={waterErrors}
            loadingWaterId={loadingWaterId}
            onToggleWater={handleToggleWater}
          />
        </>
      ) : null}

      {!loadingWaters && !resultsError && !hasResults ? (
        <section className="relative mx-auto mt-14 max-w-6xl px-5 sm:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
            <p className="text-lg font-bold text-white">No nearby waters found</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/58">
              Try a different Ontario city or nearby landmark.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  )
}
