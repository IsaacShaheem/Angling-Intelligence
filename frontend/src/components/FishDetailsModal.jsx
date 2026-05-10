import { AnimatePresence, motion } from 'framer-motion'
import { Brain, CloudSun, X } from 'lucide-react'

function scoreColor(score) {
  if (score >= 80) return 'text-emerald-100'
  if (score >= 60) return 'text-cyan-100'
  return 'text-orange-100'
}

export default function FishDetailsModal({ fish, onClose }) {
  return (
    <AnimatePresence>
      {fish ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-midnight/78 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0b1826]/96 p-6 shadow-lg shadow-black/35 sm:p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close fish details"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-12">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-cyan-100/65">Species details</p>
              <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">{fish.species}</h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Fishing Opportunity Score</p>
                <div className="mt-4 flex items-end gap-3">
                  <span className={`text-7xl font-black leading-none ${scoreColor(fish.score)}`}>{fish.score}</span>
                  <span className="pb-3 text-sm font-bold text-white/40">/100</span>
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-200" style={{ width: `${fish.score}%` }} />
                </div>
                <p className="mt-5 text-sm font-semibold text-white/70">Difficulty: {fish.difficulty}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Methods and baits</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {fish.methods.map((method) => (
                    <span key={method} className="rounded-full bg-cyan-100/10 px-3 py-2 text-sm font-semibold text-cyan-50">
                      {method}
                    </span>
                  ))}
                </div>
                <p className="mt-5 leading-7 text-white/72">{fish.shortExplanation}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Insight icon={Brain} title="AI fishing tip" text={fish.aiTip} />
              <Insight icon={CloudSun} title="Condition reasoning" text={fish.reasons.join(' ')} />
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Insight({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-100/75">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <p className="leading-7 text-white/70">{text}</p>
    </div>
  )
}
