import express from "express";
import cors from "cors";
import { geocodeLocation, getCurrentWeather } from "./lib/weather.js";
import { getClosestWaters } from "./lib/geo.js";
import { scoreAllSpecies } from "./lib/scoring.js";
import { generateFishTip } from "./lib/ai.js";
import { WATERS } from "./lib/waters.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/nearby-waters", async (req, res) => {
  try {
    const { location } = req.body;

    if (!location || typeof location !== "string") {
      return res.status(400).json({
        error: "Please provide a location in the request body.",
        example: {
          location: "Guelph",
        },
      });
    }

    let geocodedLocation;

    try {
      geocodedLocation = await geocodeLocation(location);
    } catch {
      return res.status(400).json({
        error: "Location not found",
      });
    }

    const coordinates = {
      lat: geocodedLocation.lat,
      lon: geocodedLocation.lon,
    };

    const weather = await getCurrentWeather(coordinates.lat, coordinates.lon);
    const closestWaters = getClosestWaters(coordinates.lat, coordinates.lon);

    const waters = closestWaters.map((water) => {
      return {
        id: water.id,
        name: water.name,
        type: water.type,
        region: water.region,
        distanceKm: Number(water.distanceKm.toFixed(2)),
        pressureLevel: water.pressureLevel,
        accessibility: water.accessibility,
        tags: water.tags || [],
        speciesCount: water.species.length,
        lat: water.lat,
        lon: water.lon,
      };
    });

    return res.json({
      location: {
        search: location,
        name: geocodedLocation.name,
        region: geocodedLocation.region,
        country: geocodedLocation.country,
      },
      coordinates,
      weather,
      waters,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while finding nearby waters.",
      details: error.message,
    });
  }
});

app.get("/api/water/:id", async (req, res) => {
  try {
    const water = WATERS.find((waterEntry) => {
      return waterEntry.id === req.params.id;
    });

    if (!water) {
      return res.status(404).json({
        error: "Water not found.",
        details: `No water exists with the id "${req.params.id}".`,
      });
    }

    const weather = await getCurrentWeather(water.lat, water.lon);
    const speciesScores = scoreAllSpecies(water, weather).map((speciesResult) => {
      return {
        species: speciesResult.species,
        score: speciesResult.score,
        difficulty: speciesResult.difficulty,
        reasons: speciesResult.reasons,
        methods: speciesResult.methods,
        shortExplanation: speciesResult.shortExplanation,
      };
    });

    return res.json({
      water: {
        id: water.id,
        name: water.name,
        type: water.type,
        region: water.region,
        pressureLevel: water.pressureLevel,
        accessibility: water.accessibility,
        tags: water.tags || [],
        lat: water.lat,
        lon: water.lon,
      },
      weather,
      speciesScores,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while getting this water.",
      details: error.message,
    });
  }
});

app.post("/api/fish-tip", async (req, res) => {
  try {
    const { water, speciesResult, weather } = req.body;

    if (!water || !speciesResult || !weather) {
      return res.status(400).json({
        error: "Please provide water, speciesResult, and weather.",
        example: {
          water: {
            name: "Lake Ontario",
          },
          speciesResult: {
            species: "Smallmouth Bass",
            score: 78,
            difficulty: "Beginner-friendly",
            reasons: ["mild temperature", "good cloud cover"],
          },
          weather: {
            description: "partly cloudy",
            temperature: {
              value: 18,
            },
          },
        },
      });
    }

    const aiTip = await generateFishTip({
      water,
      speciesResult,
      weather,
    });

    return res.json({
      aiTip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while generating this fishing tip.",
      details: error.message,
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Could not start the server.");
  console.error(error.message);
});
