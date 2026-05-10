import { Accessibility, ChevronDown, Fish, Gauge, Loader2, MapPin, Waves } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback } from 'react'
import FishSpeciesCard from './FishSpeciesCard.jsx'

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function WaterCard({ water, expanded, details, isLoading, onToggle }) {
  const accessibility = `${titleCase(water.accessibility)} access`
  const pressure = `${titleCase(water.pressureLevel)} pressure`
  const species = details?.speciesScores ?? []
  const handleToggle = useCallback(() => onToggle(water), [onToggle, water])

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border p-5 shadow-md shadow-black/15 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 sm:p-6 ${
        expanded
          ? 'border-cyan-200/45 bg-cyan-100/[0.115]'
          : 'border-white/10 bg-white/[0.065] hover:border-cyan-200/25 hover:bg-white/[0.09]'
      }`}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-200/0 via-cyan-200/35 to-emerald-200/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/10 blur-xl transition-opacity ${expanded ? 'opacity-100' : 'opacity-60'}`} />
      <button
        type="button"
        onClick={handleToggle}
        className="relative block w-full text-left"
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-cyan-100">
              <Waves className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/65">
                {water.distanceKm} km away
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{water.name}</h3>
              <p className="mt-1 text-sm font-medium text-white/58">{water.region}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-white/72 sm:grid-cols-2 lg:min-w-[30rem]">
            <Meta icon={MapPin} text={water.type} />
            <Meta icon={Accessibility} text={accessibility} />
            <Meta icon={Gauge} text={pressure} />
            <Meta icon={Fish} text={`${water.speciesCount} target species`} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/15 px-4 py-3">
          <span className="text-sm text-white/55">{expanded ? 'Tap to close' : 'Best window'}</span>
          <span className="flex items-center gap-3 text-sm font-bold text-emerald-100">
            {expanded ? 'Showing opportunities' : water.bestWindow}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180 text-cyan-100' : ''}`}
            />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-100/62">
                    Opportunities inside {water.name}
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">Species worth targeting today</h4>
                </div>
                <p className="max-w-md text-sm leading-6 text-white/56">
                  {details?.water?.shoreline || water.shoreline}
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.065] px-4 py-4 text-sm font-semibold text-white/68">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-100" />
                  Loading fishing opportunities
                </div>
              ) : (
                <motion.div
                  className="grid gap-3"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.035 } },
                  }}
                >
                  {species.map((fish) => (
                    <motion.div
                      key={fish.species}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
                      }}
                    >
                      <FishSpeciesCard fish={fish} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  )
}

function Meta({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-cyan-100/70" />
      <span>{text}</span>
    </div>
  )
}

export default memo(WaterCard)
