const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export async function fetchNearbyWaters(location) {
  const response = await apiRequest('/api/nearby-waters', {
    method: 'POST',
    body: JSON.stringify({
      location: location?.trim() || 'Guelph, ON',
    }),
  })

  return normalizeNearbyWatersResponse(response, location)
}

export async function fetchWaterById(id) {
  const response = await apiRequest(`/api/water/${encodeURIComponent(id)}`)

  return normalizeWaterResponse(response)
}

export async function fetchFishTip({ water, speciesResult, weather }) {
  const response = await apiRequest('/api/fish-tip', {
    method: 'POST',
    body: JSON.stringify({
      water,
      speciesResult,
      weather,
    }),
  })

  return removeScoreText(response.aiTip || '')
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message = payload?.error || payload?.details || 'Unable to reach fishing intelligence right now.'
    throw new Error(message)
  }

  return payload
}

function normalizeNearbyWatersResponse(response, requestedLocation) {
  const weather = normalizeWeather(response?.weather)

  return {
    ...response,
    location: formatLocation(response?.location, requestedLocation),
    weather,
    waters: Array.isArray(response?.waters)
      ? response.waters.map((water) => normalizeWaterSummary(water))
      : [],
  }
}

function normalizeWaterResponse(response) {
  const water = normalizeWaterSummary(response?.water)

  return {
    ...response,
    water,
    weather: normalizeWeather(response?.weather),
    speciesScores: Array.isArray(response?.speciesScores)
      ? response.speciesScores.map((fish) => normalizeSpeciesScore(fish))
      : [],
  }
}

function normalizeWaterSummary(water = {}) {
  return {
    ...water,
    id: water.id || '',
    name: water.name || 'Unknown water',
    type: water.type || 'Water',
    region: water.region || 'Ontario',
    distanceKm: typeof water.distanceKm === 'number' ? water.distanceKm : null,
    pressureLevel: water.pressureLevel || 'medium',
    accessibility: water.accessibility || 'medium',
    speciesCount: water.speciesCount ?? water.species?.length ?? 0,
    bestWindow: water.bestWindow || getBestWindowLabel(),
    shoreline: water.shoreline || describeWaterStructure(water),
  }
}

function normalizeSpeciesScore(fish = {}) {
  const reasons = Array.isArray(fish.reasons) ? fish.reasons.map((reason) => normalizeReason(reason)) : []
  const methods = Array.isArray(fish.methods) ? fish.methods : []
  const species = fish.species || 'This species'
  const score = typeof fish.score === 'number' ? fish.score : 0
  const difficulty = normalizeDifficultyLabel(fish.difficulty, score)

  return {
    ...fish,
    species,
    score,
    difficulty,
    reasons,
    methods,
    shortExplanation:
      removeScoreText(fish.shortExplanation) ||
      `${species} have ${difficulty.toLowerCase()} difficulty today. ${reasons[0]?.text || 'Use current conditions and local structure to choose your presentation.'}`,
    aiTip: removeScoreText(fish.aiTip) || '',
  }
}

function normalizeDifficultyLabel(value, score) {
  if (['Easy', 'Medium', 'Hard', 'Very Hard'].includes(value)) return value

  if (score >= 80) return 'Easy'
  if (score >= 60) return 'Medium'
  if (score >= 40) return 'Hard'

  return 'Very Hard'
}

function cleanReason(reason) {
  return String(reason || '').replace(/^[+-]?\d+:\s*/, '')
}

function normalizeReason(reason) {
  const originalText = String(reason || '').trim()
  const sentiment = getReasonSentiment(originalText)

  return {
    text: cleanReason(originalText),
    sentiment,
  }
}

function getReasonSentiment(reason) {
  if (reason.startsWith('+')) return 'positive'
  if (reason.startsWith('-')) return 'negative'

  return 'neutral'
}

function removeScoreText(text) {
  return String(text || '')
    .replace(/\b[\w\s'-]+ (?:is|are) rated \d+\/100 today\.\s*/gi, '')
    .replace(/\b\d+\/100\b/g, '')
    .replace(/\bcurrent score\b/gi, 'current conditions')
    .trim()
}

function normalizeWeather(weather = {}) {
  const tempC = roundNumber(weather?.temperature?.value)
  const windKph = roundNumber(weather?.wind?.speed?.value)
  const condition = weather?.description || 'Current conditions'
  const season = titleCase(weather?.season || getSeasonFromTime(weather?.time))

  return {
    ...weather,
    condition,
    tempC: tempC ?? '--',
    windKph: windKph ?? '--',
    season,
    insight: weather?.insight || makeWeatherInsight({ condition, tempC, windKph, weather }),
  }
}

function formatLocation(location, fallback) {
  if (typeof location === 'string') return location

  const name = location?.name
  const region = location?.region

  if (name && region) return `${name}, ${region}`
  if (name) return name

  return fallback?.trim() || location?.search || 'Ontario'
}

function describeWaterStructure(water = {}) {
  const tags = Array.isArray(water.tags) ? water.tags : []
  const readableTags = tags
    .slice(0, 3)
    .map((tag) => tag.replaceAll('-', ' '))
    .join(', ')

  if (readableTags) {
    return `${water.type || 'Water'} structure with ${readableTags}.`
  }

  return `${water.type || 'Water'} structure near ${water.region || 'this region'}.`
}

function makeWeatherInsight({ condition, tempC, windKph, weather }) {
  const cloudCover = weather?.cloudCover?.value
  const tempText = typeof tempC === 'number' ? `${tempC}C` : 'current temperatures'
  const windText = typeof windKph === 'number' ? `${windKph} km/h wind` : 'the current wind'
  const cloudText = typeof cloudCover === 'number' ? ` and ${cloudCover}% cloud cover` : ''

  return `${condition}, ${tempText}, ${windText}${cloudText} should help shape lure speed, depth, and shoreline choice today.`
}

function getBestWindowLabel() {
  const hour = new Date().getHours()

  if (hour < 11) return 'Morning'
  if (hour < 17) return 'Afternoon'
  if (hour < 21) return 'Evening'

  return 'Tomorrow morning'
}

function getSeasonFromTime(time) {
  const date = time ? new Date(time) : new Date()
  const month = date.getMonth() + 1

  if (month === 12 || month <= 2) return 'winter'
  if (month <= 5) return 'spring'
  if (month <= 8) return 'summer'

  return 'fall'
}

function roundNumber(value) {
  return typeof value === 'number' ? Math.round(value) : null
}

function titleCase(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Current'
}
