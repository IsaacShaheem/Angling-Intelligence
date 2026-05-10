import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection.jsx'
import Navbar from '../components/Navbar.jsx'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = useCallback(async (location) => {
    const nextLocation = location?.trim() || 'Guelph, ON'

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 180))
    navigate(`/results?location=${encodeURIComponent(nextLocation)}`, {
      state: { location: nextLocation },
    })
  }, [navigate])

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-mist">
      <Navbar />
      <HeroSection onSearch={handleSearch} isLoading={isLoading} />
    </main>
  )
}
