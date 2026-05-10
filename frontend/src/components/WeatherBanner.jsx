import { CloudSun, Leaf, Thermometer, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import { memo } from 'react'

function WeatherBanner({ weather, location }) {
  const condition = weather?.condition || 'Current conditions'
  const tempC = weather?.tempC ?? '--'
  const windKph = weather?.windKph ?? '--'
  const season = weather?.season || 'Current'
  const insight = weather?.insight || 'Current weather is available for this location.'
  const details = [
    { icon: CloudSun, label: condition },
    { icon: Thermometer, label: `${tempC}°C` },
    { icon: Wind, label: `Wind ${windKph} km/h` },
    { icon: Leaf, label: season },
  ]

  return (
    <motion.section
      className="mx-auto mt-10 max-w-6xl px-5 sm:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/10 bg-gradient-to-br from-cyan-100/[0.105] via-white/[0.055] to-emerald-200/[0.065] p-5 shadow-lg shadow-black/15 backdrop-blur-sm sm:p-6">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">{location}</p>
            <p className="mt-2 max-w-2xl text-lg font-medium leading-7 text-white/84">{insight}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {details.map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-2xl bg-white/[0.07] px-4 py-3 text-white/82">
                <item.icon className="h-4 w-4 text-cyan-100" />
                <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default memo(WeatherBanner)
