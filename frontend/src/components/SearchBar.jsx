import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { memo } from 'react'

function SearchBar({ onSearch, isLoading, error }) {
  const [location, setLocation] = useState('Guelph, ON')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(location)
  }

  return (
    <motion.div
      className="mx-auto mt-10 w-full max-w-2xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.34, ease: 'easeOut' }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-3 rounded-[2rem] border border-white/15 bg-white/[0.12] p-2 shadow-lg shadow-black/20 backdrop-blur-sm transition-colors focus-within:border-cyan-200/45"
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-300/15 text-cyan-100 sm:h-14 sm:w-14">
          <MapPin className="h-5 w-5" />
        </div>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          aria-describedby={error ? 'location-search-error' : undefined}
          aria-invalid={Boolean(error)}
          aria-label="Ontario location"
          placeholder="Search Ontario location"
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-white/45 sm:text-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-100 px-5 text-sm font-bold text-slate-950 shadow-md shadow-cyan-950/20 transition-transform hover:scale-[1.015] hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:px-7"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{isLoading ? 'Searching' : 'Find water'}</span>
        </button>
      </form>
      {error ? (
        <p
          id="location-search-error"
          className="mt-3 rounded-2xl border border-rose-200/15 bg-rose-400/[0.07] px-4 py-3 text-sm font-semibold text-rose-50/86"
        >
          {error}
        </p>
      ) : null}
    </motion.div>
  )
}

export default memo(SearchBar)
