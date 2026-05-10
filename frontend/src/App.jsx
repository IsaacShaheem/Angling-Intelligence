import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const ResultsPage = lazy(() => import('./pages/ResultsPage.jsx'))
const WaterDetailPage = lazy(() => import('./pages/WaterDetailPage.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.24, ease: 'easeOut' }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/water/:id" element={<WaterDetailPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function RouteFallback() {
  return <div className="min-h-screen bg-midnight" />
}
