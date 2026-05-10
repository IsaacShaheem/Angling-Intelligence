import { motion } from 'framer-motion'
import { memo } from 'react'
import BubbleBackground from './BubbleBackground.jsx'
import SearchBar from './SearchBar.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

function HeroSection({ onSearch, isLoading, searchError }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-midnight px-5 py-28 sm:px-8"
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-42"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1755870344289-00ac1db1b144?auto=format&fit=crop&fm=webp&q=58&w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(186,230,253,0.20),transparent_22%),radial-gradient(circle_at_50%_55%,rgba(20,184,166,0.14),transparent_38%),linear-gradient(180deg,rgba(8,47,73,0.68)_0%,rgba(8,28,43,0.88)_44%,#020814_100%)]" />
      <div className="water-sheen absolute inset-x-0 bottom-0 h-[36vh] opacity-45" />
      <div className="mist-layer absolute inset-x-0 top-20 h-44 opacity-45" />
      <BubbleBackground />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-midnight" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl text-center"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.055 }}
      >
        <motion.p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-cyan-100/78"
          variants={fadeUp}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          Ontario fishing intelligence
        </motion.p>
        <motion.h1
          className="mx-auto max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-normal text-white drop-shadow-sm sm:text-7xl lg:text-8xl"
          variants={fadeUp}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        >
          Angling Intelligence
        </motion.h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-xl font-medium text-white/76 sm:text-2xl"
          variants={fadeUp}
          transition={{ duration: 0.34, ease: 'easeOut' }}
        >
          Where are we fishing today?
        </motion.p>
        <motion.div
          className="mx-auto mt-7 h-px w-72 bg-gradient-to-r from-transparent via-cyan-100/55 to-transparent"
          variants={{
            hidden: { opacity: 0, scaleX: 0.7 },
            show: { opacity: 1, scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <SearchBar onSearch={onSearch} isLoading={isLoading} error={searchError} />
        <p className="mx-auto mt-5 max-w-lg text-sm font-medium text-white/42">
          Built for nearby Ontario waters, shifting weather, and better first casts.
        </p>
      </motion.div>
    </section>
  )
}

export default memo(HeroSection)
