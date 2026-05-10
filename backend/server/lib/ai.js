import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(__dirname, "../../.env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

function fallbackFishTip({ water, speciesResult, weather }) {
  const species = speciesResult?.species || "this fish";
  const waterName = water?.name || "this water";
  const description = weather?.description || "the current conditions";
  const temperature = weather?.temperature?.value;
  const reasons = Array.isArray(speciesResult?.reasons)
    ? speciesResult.reasons.join(", ")
    : speciesResult?.reasons;
  const reasonText = reasons || "the available fishing factors";
  const temperatureText =
    temperature === undefined || temperature === null ? "" : ` around ${temperature}`;

  return `${species} at ${waterName} could be worth a try with ${description}${temperatureText}. The outlook is shaped by ${reasonText}, so keep it simple with a worm, small jig, or slow retrieve and treat it as a useful starting point rather than a sure thing.`;
}

export async function generateFishTip({ water, speciesResult, weather }) {
  if (!GEMINI_API_KEY) {
    return fallbackFishTip({ water, speciesResult, weather });
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const reasons = Array.isArray(speciesResult.reasons)
    ? speciesResult.reasons.join(", ")
    : speciesResult.reasons;

  const prompt = `
Write a short beginner-friendly fishing explanation/tip.

Rules:
- Return only the tip text.
- Write 2-3 natural sentences.
- Mention the species.
- Mention the selected water.
- Mention current conditions briefly.
- Explain whether the fishing outlook seems promising or challenging using the reasons.
- Include 1-2 simple bait or method suggestions.
- Do not guarantee a catch.
- Do not mention numeric scores.
- Do not mention backend scoring systems or app scoring.
- Do not sound overly robotic.

Fishing details:
- Water: ${water.name}
- Species: ${speciesResult.species}
- Difficulty: ${speciesResult.difficulty}
- Reasons: ${reasons}
- Weather: ${weather.description}
- Temperature: ${weather.temperature.value}
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return response.text?.trim() || fallbackFishTip({ water, speciesResult, weather });
  } catch {
    return fallbackFishTip({ water, speciesResult, weather });
  }
}
