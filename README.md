# Angling Intelligence

**Ontario fishing intelligence powered by weather, location, species scoring, and tactical AI guidance.**

Angling Intelligence helps anglers decide **where to fish nearby** and **which species are most worth targeting right now**. Enter an Ontario location, explore nearby waters, review live weather context, and drill into species-level recommendations with difficulty labels, condition reasoning, recommended methods, and optional Gemini-generated fishing tips.

## Overview

Most fishing apps make anglers do the hard part themselves: cross-reference weather, location, species habits, seasonal timing, accessibility, and local water options.

Angling Intelligence turns that decision-making process into a guided product experience.

The app takes a user-provided Ontario location, geocodes it, finds nearby curated fishing waters, pulls current weather, ranks target species for each water, and presents the results in a polished, responsive interface designed for quick planning before a trip.

## Problem

Choosing a good fishing spot is rarely just about finding the nearest lake.

Anglers have to consider:

- Which waters are close enough to visit
- What species live there
- Whether current weather helps or hurts the bite
- Seasonal species behavior
- Time of day
- Water type and habitat
- Fishing pressure
- Accessibility
- Practical lure and bait choices

That information is usually scattered across maps, weather apps, forums, and experience.

## Solution

Angling Intelligence centralizes the workflow into three steps:

1. Search an Ontario location
2. Compare nearby fishing waters
3. Open a water profile to see ranked species opportunities

Each species is scored using deterministic fishing logic that considers seasonal timing, weather, temperature, time of day, habitat suitability, and pressure level. Users can then expand a species card to see why it is a good or difficult target and request a short Gemini-powered tactical tip.

## Key Features

- Location-based Ontario fishing search
- Ontario-focused geocoding through Open-Meteo
- Nearby water discovery using Haversine distance calculations
- Curated dataset of **155 Ontario waters**
- Support for **16 target fish species**
- Current weather integration via Open-Meteo Forecast API
- Species scoring system with explainable reasons
- Difficulty labels: `Easy`, `Medium`, `Hard`, and `Very Hard`
- Recommended fishing methods per species
- Gemini-generated beginner-friendly tactical tips
- Fallback tip generation when no Gemini API key is configured
- Responsive React interface
- Animated page transitions with reduced-motion support
- Expandable species cards with fish imagery
- Loading, retry, empty, and error states
- Vite proxy support for local frontend/backend development

## Product Flow

### 1. Landing Page

The landing page presents the core product action immediately: search for an Ontario location.

The default search value is `Guelph, ON`, making the app demo-friendly while still allowing custom Ontario city or town searches.

### 2. Results Page

After a successful search, the app displays:

- Normalized searched location
- Current weather summary
- Closest matching fishing waters
- Distance in kilometers
- Water type and region
- Pressure level
- Accessibility
- Number of known target species
- Best available fishing window label

### 3. Water Detail Page

Selecting a water opens a dedicated intelligence view containing:

- Water metadata
- Current weather context
- Best target species right now
- Ranked target species cards
- Difficulty labels
- Condition reasoning
- Recommended techniques
- Optional Gemini-generated fishing advice

## Architecture

Angling Intelligence is split into a Vite React frontend and an Express backend.

```txt
User
  |
  v
React Frontend
  |
  |  POST /api/nearby-waters
  |  GET  /api/water/:id
  |  POST /api/fish-tip
  v
Express Backend
  |
  |-- Open-Meteo Geocoding API
  |-- Open-Meteo Forecast API
  |-- Curated Ontario water dataset
  |-- Species scoring engine
  |-- Gemini AI tip generation
```

## Frontend

The frontend is a React single-page application built with Vite.

### Frontend Technologies

- React 19
- Vite 6
- React Router 7
- Framer Motion
- Tailwind CSS
- Lucide React icons
- ESLint
- PostCSS
- Autoprefixer

### Frontend Structure

```txt
frontend/
  src/
    App.jsx
    main.jsx
    styles.css
    services/
      api.js
    pages/
      LandingPage.jsx
      ResultsPage.jsx
      WaterDetailPage.jsx
    components/
      Navbar.jsx
      HeroSection.jsx
      SearchBar.jsx
      BubbleBackground.jsx
      WeatherBanner.jsx
      NearbyWatersGrid.jsx
      LakeResultCard.jsx
      SpeciesGrid.jsx
      ExpandableSpeciesCard.jsx
    data/
      fishImages.js
      mockApiResponses.js
  public/
    fish/
    fish images/
  vite.config.js
  tailwind.config.js
  eslint.config.js
```

### UI/UX Highlights

The interface is designed to feel polished and product-ready, with:

- Full-screen aquatic hero experience
- Animated underwater background with bubbles, fish silhouettes, light rays, mist, and water sheen
- Responsive card layouts
- Smooth route transitions
- Staggered list animations
- Expandable species cards
- Lazy-loaded fish imagery
- Accessible search input labels
- Escape-key support for closing expanded species cards
- Reduced-motion handling through Framer Motion and CSS media queries
- Clear loading and retry states

## Backend

The backend is an Express 5 API written as ES modules.

### Backend Technologies

- Node.js
- Express 5
- CORS
- dotenv
- Open-Meteo APIs
- Google Gemini via `@google/genai`

### Backend Structure

```txt
backend/
  server.js
  server/
    server.js
    lib/
      ai.js
      geo.js
      scoring.js
      waters.js
      weather.js
  temp-test-ai.mjs
  temp-test-geo.mjs
  temp-test-scoring.mjs
  temp-test-weather.mjs
```

## API Endpoints

### `POST /api/nearby-waters`

Finds nearby fishing waters for a searched location.

Request:

```json
{
  "location": "Guelph"
}
```

Response includes:

- Normalized location
- Coordinates
- Current weather
- Closest waters
- Distance in kilometers
- Water metadata
- Species count

### `GET /api/water/:id`

Returns detailed intelligence for a specific water.

Response includes:

- Water metadata
- Current weather at that water
- Ranked species scores
- Difficulty labels
- Reasons
- Recommended methods
- Short explanations

### `POST /api/fish-tip`

Generates a short tactical fishing tip for a selected water and species.

Request includes:

- Water object
- Species result object
- Weather object

If `GEMINI_API_KEY` is configured, the backend uses Gemini. If not, it returns a deterministic fallback tip.

## Integrations

### Open-Meteo Geocoding API

Used to resolve user-entered locations into latitude and longitude.

The backend applies Ontario-focused search behavior by appending `Ontario Canada` when the user has not already included Ontario or Canada in the query. It also prefers Ontario results when multiple matches are returned.

### Open-Meteo Forecast API

Used to retrieve current weather conditions, including:

- Temperature
- Apparent temperature
- Humidity
- Precipitation
- Rain
- Showers
- Snowfall
- Cloud cover
- Mean sea level pressure
- Surface pressure
- Wind speed
- Wind direction
- Wind gusts
- Weather code description

### Google Gemini

Used for optional AI-generated fishing tips.

The backend currently targets:

```txt
gemini-2.5-flash
```

Gemini output is cleaned before returning to the frontend to avoid exposing numeric score language or internal scoring details.

## Recommendation & Scoring System

The recommendation engine is implemented in `backend/server/lib/scoring.js`.

Each species begins with a base score and receives modifiers based on real fishing-relevant factors.

### Scoring Inputs

- Species baseline difficulty
- Current month
- Time of day
- Current temperature
- Water type
- Habitat tags
- Fishing pressure level

### Scoring Factors

The system evaluates:

- Seasonal windows  
  Example: salmon improve during September and October runs.
- Temperature fit  
  Example: trout benefit from cooler conditions, while bass and carp generally improve in warmer conditions.
- Time of day  
  Example: walleye improve during low-light windows, while catfish benefit from evening and night periods.
- Habitat suitability  
  Example: shallow weedy habitat benefits bass and pike, while Great Lakes tributary tags strongly support salmon opportunities.
- Fishing pressure  
  Lower pressure provides a small boost, while high and very high pressure reduce opportunity.

### Output

Each species receives:

- A score clamped from `0` to `100`
- A difficulty label
- Up to three important reasons
- Recommended methods
- A short explanation
- A fallback tactical tip

The frontend intentionally presents difficulty labels instead of raw score-first UI, keeping the experience approachable for beginners while preserving explainability.

## Dataset

The project includes a curated Ontario fishing dataset in `backend/server/lib/waters.js`.

Current dataset coverage:

- **155 waters**
- **100 region labels**
- **16 fish species**

Species include:

- Largemouth Bass
- Smallmouth Bass
- Northern Pike
- Walleye
- Muskellunge
- Panfish
- Longnose Gar
- Common Carp
- Channel Catfish
- Lake Trout
- Brook Trout
- Rainbow Trout
- Brown Trout
- Chinook Salmon
- Coho Salmon
- Atlantic Salmon

Each water entry can include:

- ID
- Name
- Type
- Region
- Latitude and longitude
- Species list
- Pressure level
- Accessibility
- Habitat and context tags
- Source note

The dataset is curated for the prototype and should be verified against official sources such as Ontario Fish ON-Line before production use.

## Installation

Clone the repository and install dependencies separately for the frontend and backend.

```bash
git clone <repository-url>
cd Angling-Intelligence
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Setup

### Backend

Create a `.env` file in the `backend/` directory.

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

`GEMINI_API_KEY` is optional. Without it, the backend still works and returns fallback fishing tips.

### Frontend

The frontend can run without an environment file during local development because Vite proxies `/api` requests to the backend.

For deployed or separated environments, configure:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## Local Development

Run the backend:

```bash
cd backend
npm run dev
```

The backend runs on:

```txt
http://localhost:3000
```

Run the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs through Vite, typically at:

```txt
http://localhost:5173
```

The Vite development server proxies `/api` requests to `http://localhost:3000`.

## Build

Build the frontend:

```bash
cd frontend
npm run build
```

Preview the production frontend build:

```bash
npm run preview
```

Start the backend:

```bash
cd backend
npm start
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

## Deployment Notes

The repository does not currently include platform-specific deployment configuration such as `vercel.json`, `netlify.toml`, `render.yaml`, or a `Procfile`.

Recommended deployment approach:

- Deploy the frontend as a Vite static site.
- Deploy the backend as a Node/Express service.
- Set `VITE_API_BASE_URL` in the frontend environment when the API is hosted separately.
- Set `PORT` and optionally `GEMINI_API_KEY` in the backend environment.

## Screenshots

Add screenshots or demo GIFs here.

```txt
/screenshots/landing-page.png
/screenshots/results-page.png
/screenshots/water-detail-page.png
/screenshots/species-expanded-card.png
```

Suggested views:

- Landing page with Ontario search
- Nearby waters results
- Weather banner and water cards
- Water detail page
- Expanded species intelligence card
- Gemini tip generation state

## What Stands Out

Angling Intelligence is technically stronger than a typical static hackathon demo because it combines:

- Real API integrations
- Location-aware search
- Current weather context
- A structured domain model
- Explainable scoring logic
- AI enhancement with graceful fallback behavior
- A polished, responsive frontend
- Purpose-built UX for anglers rather than generic dashboard UI

The project balances deterministic recommendation logic with generative AI, using AI where it adds value while keeping the core ranking system explainable and testable.

## Limitations

Current limitations include:

- The water dataset is curated and should be validated before production use.
- Weather data uses current conditions rather than multi-day forecasting.
- The app does not include fishing regulations, seasons, limits, or licensing rules.
- There is no user account system or saved trip planning.
- There is no persistence layer or database.
- Fish scoring is rule-based and not trained on catch reports.
- The frontend relies on static fish image assets.
- Temporary backend test scripts are present, but there is no formal automated test suite.

## Roadmap

Potential future improvements:

- Official Ontario Fish ON-Line integration
- Fishing regulation and season awareness
- Forecast-based trip planning
- Map-based water exploration
- Saved favorite waters
- User trip logs and catch history
- Community catch reports
- Confidence intervals for recommendations
- Species-specific seasonal calendars
- Boat launch and shore access metadata
- Database-backed water and species data
- Automated backend and frontend test coverage
- Deployment configuration for a production hosting platform

## Team

Built by:

```txt
Arya Rahimian
Isaac Shaheem
```

## License

No license file is currently included in the repository.

Add a license before distributing, publishing, or accepting external contributions.
