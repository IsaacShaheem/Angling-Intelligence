import { motion } from 'framer-motion'
import { memo } from 'react'
import LakeResultCard from './LakeResultCard.jsx'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: 'easeOut' } },
}

function NearbyWatersGrid({ waters, weather, location }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-14">
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/60">Nearby waters</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Choose your destination</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/55">
          Pick the water that fits today&apos;s conditions, then explore the best species opportunities there.
        </p>
      </div>
      <motion.div
        className="grid gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {waters.map((water) => (
          <motion.div key={water.id} variants={item}>
            <LakeResultCard water={water} weather={weather} location={location} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default memo(NearbyWatersGrid)
