import { CircleDot } from 'lucide-react'
import { memo } from 'react'

function scoreTone(score) {
  if (score >= 80) return 'from-emerald-200 to-cyan-200'
  if (score >= 60) return 'from-cyan-200 to-yellow-100'
  return 'from-orange-200 to-rose-200'
}

function barColor(score) {
  if (score >= 80) return 'from-emerald-300 to-cyan-200'
  if (score >= 60) return 'from-cyan-200 to-yellow-100'
  return 'from-orange-300 to-rose-300'
}

function scoreLabel(score) {
  if (score >= 80) return 'Prime'
  if (score >= 60) return 'Strong'
  return 'Challenging'
}

function FishSpeciesCard({ fish }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.085] to-white/[0.045] p-4 text-left shadow-sm shadow-black/10 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-emerald-200/25 hover:bg-white/[0.07] sm:p-5">
      <div className="relative grid gap-4 lg:grid-cols-[1fr_10rem] lg:items-center">
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h5 className="text-xl font-black text-white">{fish.species}</h5>
              <p className="mt-1 text-sm font-semibold text-white/52">{fish.difficulty} difficulty</p>
            </div>
            <div className="lg:hidden">
              <Score score={fish.score} />
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/66">{fish.shortExplanation}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {fish.methods.map((method) => (
              <span
                key={method}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/68"
              >
                <CircleDot className="h-3 w-3 text-cyan-100/70" />
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <Score score={fish.score} />
        </div>
      </div>
    </article>
  )
}

function Score({ score }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">Fishing Opportunity Score</p>
        <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white/56">
          {scoreLabel(score)}
        </span>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className={`bg-gradient-to-br bg-clip-text text-4xl font-black leading-none text-transparent ${scoreTone(score)}`}>
          {score}
        </span>
        <span className="pb-1 text-xs font-bold text-white/35">/100</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full origin-left rounded-full bg-gradient-to-r ${barColor(score)}`}
          style={{ transform: `scaleX(${score / 100})` }}
        />
      </div>
    </div>
  )
}

export default memo(FishSpeciesCard)
