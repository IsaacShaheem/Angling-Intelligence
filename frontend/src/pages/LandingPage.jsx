import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection.jsx'
import Navbar from '../components/Navbar.jsx'
import { fetchNearbyWaters } from '../services/api.js'

const LOCATION_NOT_FOUND_MESSAGE = 'Location not found. Try another Ontario city or town.'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleSearch = useCallback(async (location) => {
    const nextLocation = location?.trim() || 'Guelph, ON'

    setIsLoading(true)
    setSearchError('')

    try {
      const nearbyResults = await fetchNearbyWaters(nextLocation)

      navigate(`/results?location=${encodeURIComponent(nextLocation)}`, {
        state: { location: nextLocation, nearbyResults },
      })
    } catch {
      setSearchError(LOCATION_NOT_FOUND_MESSAGE)
      setIsLoading(false)
    }
  }, [navigate])

  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-mist">
      <Navbar />
      <HeroSection onSearch={handleSearch} isLoading={isLoading} searchError={searchError} />
    </main>
  )
}
