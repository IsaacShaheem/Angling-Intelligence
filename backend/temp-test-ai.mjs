import { generateFishTip } from "./server/lib/ai.js";

const water = {
  name: "Lake Ontario",
};

const speciesResult = {
  species: "Smallmouth Bass",
  score: 78,
  difficulty: "Beginner-friendly",
  reasons: [
    "mild water temperature",
    "good cloud cover",
    "active feeding conditions",
  ],
};

const weather = {
  description: "partly cloudy",
  temperature: {
    value: 18,
  },
};

const tip = await generateFishTip({
  water,
  speciesResult,
  weather,
});

console.log("AI Fishing Tip:");
console.log(tip);
