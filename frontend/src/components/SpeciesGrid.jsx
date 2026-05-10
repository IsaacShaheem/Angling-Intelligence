import { motion } from 'framer-motion'
import { memo, useCallback, useState } from 'react'
import { fetchFishTip } from '../services/api.js'
import ExpandableSpeciesCard from './ExpandableSpeciesCard.jsx'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: 'easeOut' } },
}

function SpeciesGrid({ species, water, weather }) {
  const [expandedSpecies, setExpandedSpecies] = useState(null)
  const [aiTips, setAiTips] = useState({})
  const [loadingTips, setLoadingTips] = useState({})
  const [tipErrors, setTipErrors] = useState({})

  const handleToggle = useCallback((name) => {
    setExpandedSpecies((current) => (current === name ? null : name))
  }, [])

  const handleClose = useCallback(() => {
    setExpandedSpecies(null)
  }, [])

  const handleGenerateTip = useCallback(async (fish) => {
    const speciesName = fish.species

    setLoadingTips((current) => ({
      ...current,
      [speciesName]: true,
    }))
    setTipErrors((current) => ({
      ...current,
      [speciesName]: '',
    }))

    try {
      const aiTip = await fetchFishTip({
        water,
        speciesResult: fish,
        weather,
      })

      setAiTips((current) => ({
        ...current,
        [speciesName]: aiTip,
      }))
    } catch (error) {
      setTipErrors((current) => ({
        ...current,
        [speciesName]: error.message || 'Could not generate this Gemini tip.',
      }))
    } finally {
      setLoadingTips((current) => ({
        ...current,
        [speciesName]: false,
      }))
    }
  }, [water, weather])

  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/60">Species intelligence</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Target species</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/55">
          Expand a card to reveal why conditions line up and how to fish the moment.
        </p>
      </div>

      <div className="relative">
        {expandedSpecies ? (
          <motion.div
            className="pointer-events-none absolute inset-0 -m-4 rounded-[2rem] bg-black/18"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        ) : null}

        <motion.div
          className="relative grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {species.map((fish) => (
            <motion.div
              key={fish.species}
              variants={item}
              className={expandedSpecies === fish.species ? 'min-[520px]:col-span-2 lg:col-span-3' : ''}
            >
              <ExpandableSpeciesCard
                fish={fish}
                weather={weather}
                aiTip={aiTips[fish.species] || ''}
                tipError={tipErrors[fish.species] || ''}
                tipLoading={Boolean(loadingTips[fish.species])}
                expanded={expandedSpecies === fish.species}
                dimmed={Boolean(expandedSpecies) && expandedSpecies !== fish.species}
                onToggle={() => handleToggle(fish.species)}
                onClose={handleClose}
                onGenerateTip={() => handleGenerateTip(fish)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(SpeciesGrid)
