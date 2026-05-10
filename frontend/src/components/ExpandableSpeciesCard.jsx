import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Brain, ChevronDown, CloudSun, Leaf, Loader2, Thermometer, Timer, X } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { fallbackFishImage, fallbackFishImageBackup, fishImages } from '../data/fishImages'

function scoreGradient(score) {
  if (score <= 25) return 'from-red-500 to-rose-400'
  if (score <= 50) return 'from-orange-400 to-amber-300'
  if (score <= 70) return 'from-yellow-300 to-amber-200'
  return 'from-emerald-400 to-green-300'
}

function ExpandableSpeciesCard({
  fish,
  weather,
  aiTip,
  tipError,
  tipLoading,
  expanded,
  dimmed,
  onToggle,
  onClose,
  onGenerateTip,
}) {
  const reduceMotion = useReducedMotion()
  const [imageSrc, setImageSrc] = useState(fishImages[fish.species] || fallbackFishImage)
  const methods = Array.isArray(fish.methods) ? fish.methods : []
  const reasons = Array.isArray(fish.reasons) ? fish.reasons : []
  const difficulty = fish.difficulty || 'Medium'
  const explanation = fish.shortExplanation || `${fish.species} have ${difficulty.toLowerCase()} difficulty today.`
  const score = Math.max(0, Math.min(100, fish.score || 0))
  const barScale = score / 100
  const hasGeneratedTip = Boolean(aiTip)
  const tipButtonClassName = hasGeneratedTip
    ? 'mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100/25 bg-emerald-100/14 px-4 py-2 text-sm font-black text-emerald-50 transition-colors disabled:cursor-not-allowed'
    : 'mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-slate-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-white/18 disabled:text-white/50'

  useEffect(() => {
    setImageSrc(fishImages[fish.species] || fallbackFishImage)
  }, [fish.species])

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(125,211,252,0.18),transparent_42%),linear-gradient(180deg,rgba(8,47,73,0.34),rgba(6,17,29,0.96))]" />
          <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-cyan-100/38 to-transparent" />
          <motion.img
            layout
            src={imageSrc}
            alt={fish.species}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 m-auto h-[72%] w-[82%] object-contain object-center drop-shadow-[0_18px_22px_rgba(0,0,0,0.32)] ${
              expanded ? 'sm:h-[82%] sm:w-[78%]' : ''
            }`}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: expanded ? 1.045 : 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: 'easeOut' }}
            onError={() => {
              if (imageSrc !== fallbackFishImage) {
                setImageSrc(fallbackFishImage)
                return
              }

              if (fallbackFishImage !== fallbackFishImageBackup && imageSrc !== fallbackFishImageBackup) {
                setImageSrc(fallbackFishImageBackup)
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06111d] via-[#06111d]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06111d] to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/28 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/78 backdrop-blur-sm">
            {difficulty} difficulty
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className={`${expanded ? 'text-4xl sm:text-5xl' : 'text-2xl'} font-black leading-none text-white`}>
                {fish.species}
              </h3>
              <p className="mt-2 text-sm font-bold text-cyan-100/70">{difficulty} Difficulty</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`${expanded ? 'text-6xl' : 'text-4xl'} font-black leading-none text-white`}>
                {score}
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/58">
                {difficulty} difficulty
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <div className="min-w-0 flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full origin-left rounded-full bg-gradient-to-r ${scoreGradient(score)}`}
                style={{ transform: `scaleX(${barScale})` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-white/38">Higher score = easier fishing opportunity</p>
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
                    {reasons.map((reason, index) => {
                      const reasonText = typeof reason === 'string' ? reason : reason.text
                      const sentiment = typeof reason === 'object' ? reason?.sentiment : 'neutral'
                      const dotColor = {
                        positive: 'bg-emerald-400',
                        negative: 'bg-rose-400',
                        neutral: 'bg-white/28',
                      }[sentiment] || 'bg-white/28'

                      return (
                        <p key={`${reasonText}-${index}`} className="flex gap-2 text-sm leading-6 text-white/66">
                          <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
                          {reasonText}
                        </p>
                      )
                    })}
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

                  <button
                    type="button"
                    onClick={onGenerateTip}
                    disabled={tipLoading || hasGeneratedTip}
                    className={tipButtonClassName}
                  >
                    {tipLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                    {hasGeneratedTip ? '✓ Gemini Tip Generated' : 'Generate Gemini Tip'}
                  </button>

                  {tipLoading ? (
                    <p className="mt-3 text-sm font-semibold text-cyan-100/72">Generating Gemini tip...</p>
                  ) : null}

                  {!tipLoading && aiTip ? (
                    <p className="mt-4 rounded-2xl bg-cyan-100/10 p-4 text-sm leading-6 text-white/78">{aiTip}</p>
                  ) : null}

                  {!tipLoading && tipError ? (
                    <p className="mt-3 text-sm font-semibold text-rose-100/78">{tipError}</p>
                  ) : null}
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
