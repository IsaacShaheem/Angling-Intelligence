import { nearbyWatersResponse, waterResponses } from '../data/mockApiResponses'

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchNearbyWaters(location) {
  await wait()

  return {
    ...nearbyWatersResponse,
    location: location?.trim() || nearbyWatersResponse.location,
  }
}

export async function fetchWaterById(id) {
  await wait(120)

  const response = waterResponses[id]

  if (!response) {
    throw new Error('Water not found')
  }

  return response
}
