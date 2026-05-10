import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Brain, ChevronDown, CircleDot, CloudSun, Leaf, Thermometer, Timer, X } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { fallbackFishImage, fishImages } from '../data/fishImages'

function scoreLabel(score) {
  if (score >= 80) return 'Prime'
  if (score >= 60) return 'Strong'
  return 'Challenging'
}

function scoreTone(score) {
  if (score >= 80) return 'text-emerald-100'
  if (score >= 60) return 'text-cyan-100'
  return 'text-orange-100'
}

function scoreGradient(score) {
  if (score >= 80) return 'from-emerald-300 to-cyan-200'
  if (score >= 60) return 'from-cyan-200 to-yellow-100'
  return 'from-orange-300 to-rose-300'
}

function ExpandableSpeciesCard({ fish, weather, expanded, dimmed, onToggle, onClose }) {
  const reduceMotion = useReducedMotion()
  const [imageSrc, setImageSrc] = useState(fishImages[fish.species] || fallbackFishImage)
  const methods = Array.isArray(fish.methods) ? fish.methods : []
  const reasons = Array.isArray(fish.reasons) ? fish.reasons : []
  const label = scoreLabel(fish.score)
  const explanation = fish.aiTip || fish.shortExplanation || `${fish.species} is currently rated ${fish.score}/100.`

  useEffect(() => {
    if (!expanded) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expanded, onClose])

  return (
    <motion.article
      layout
      className={`relative overflow-hidden rounded-[1.6rem] border shadow-md shadow-black/18 transition-[border-color,opacity] duration-200 ${
        expanded
          ? 'z-10 border-cyan-100/35 bg-[#0b1b28]'
          : 'border-white/10 bg-white/[0.065] hover:border-cyan-100/25'
      } ${dimmed ? 'opacity-45' : 'opacity-100'}`}
      transition={{ layout: { duration: reduceMotion ? 0.01 : 0.3, ease: 'easeOut' } }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="group block w-full text-left"
      >
        <div className={`relative overflow-hidden ${expanded ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/3]'}`}>
          <img
            src={imageSrc}
            alt={fish.species}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            onError={() => {
              if (imageSrc !== fallbackFishImage) {
                setImageSrc(fallbackFishImage)
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06111d] via-[#06111d]/24 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/28 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/78 backdrop-blur-sm">
            {fish.difficulty} difficulty
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className={`${expanded ? 'text-4xl sm:text-5xl' : 'text-2xl'} font-black leading-none text-white`}>
                {fish.species}
              </h3>
              <p className="mt-2 text-sm font-bold text-cyan-100/70">{label} Conditions</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`${expanded ? 'text-6xl' : 'text-4xl'} font-black leading-none ${scoreTone(fish.score)}`}>
                {fish.score}
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/42">score</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full origin-left rounded-full bg-gradient-to-r ${scoreGradient(fish.score)}`}
              style={{ transform: `scaleX(${fish.score / 100})` }}
            />
          </div>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/72">
            {expanded ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: 'easeOut' }}
            className="border-t border-white/10 px-4 pb-5 pt-5 sm:px-5"
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
              <section>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/58">
                  Why conditions are good
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Condition icon={Thermometer} text={`${weather?.tempC ?? '--'}C water-adjacent air`} />
                  <Condition icon={CloudSun} text={weather?.condition || 'Current weather'} />
                  <Condition icon={Timer} text="Current bite window" />
                  <Condition icon={Leaf} text={weather?.season || 'Current season'} />
                </div>
                {reasons.length > 0 ? (
                  <div className="mt-4 grid gap-2">
                    {reasons.map((reason) => (
                      <p key={reason} className="flex gap-2 text-sm leading-6 text-white/66">
                        <CircleDot className="mt-1.5 h-3 w-3 shrink-0 text-emerald-100/72" />
                        {reason}
                      </p>
                    ))}
                  </div>
                ) : null}
              </section>

              <section>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100/58">
                  Recommended methods
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {methods.length > 0 ? methods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full bg-cyan-100/10 px-3 py-2 text-sm font-bold text-cyan-50/84"
                    >
                      {method}
                    </span>
                  )) : (
                    <span className="rounded-full bg-white/[0.08] px-3 py-2 text-sm font-bold text-white/58">
                      Match speed to structure
                    </span>
                  )}
                </div>
                <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100/68">
                    <Brain className="h-4 w-4" />
                    AI insight
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{explanation}</p>
                </div>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

function Condition({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white/70">
      <Icon className="h-4 w-4 text-cyan-100/72" />
      <span className="min-w-0 truncate">{text}</span>
    </div>
  )
}

export default memo(ExpandableSpeciesCard)
