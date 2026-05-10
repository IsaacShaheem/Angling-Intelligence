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
  const temperatureText =
    temperature === undefined || temperature === null ? "" : ` around ${temperature}C`;

  return `At ${waterName}, start by casting for ${species} around visible structure, weed edges, points, or shaded cover in ${description}${temperatureText}. Use a simple jig, spinnerbait, spoon, or live bait and slow down with pauses if the fish are not reacting.`;
}

function cleanReason(reason) {
  return String(reason || "").replace(/^[+-]?\d+:\s*/, "").trim();
}

function getReasonContext(reasons) {
  if (Array.isArray(reasons)) {
    return reasons.map((reason) => cleanReason(reason)).filter(Boolean).join("; ");
  }

  return cleanReason(reasons);
}

function cleanGeneratedTip(text) {
  const cleanedText = String(text || "")
    .replace(/\b\d+\s*\/\s*100\b/g, "")
    .replace(/(?:^|\s)[+-]\d+:\s*/g, " ")
    .replace(/(?:^|\s)[+-]\d+\b/g, " ")
    .replace(/\bmodifier values?\b/gi, "details")
    .replace(/\bnumeric scores?\b/gi, "ratings")
    .replace(/\bscore indicates\b/gi, "try")
    .replace(/\s{2,}/g, " ")
    .trim();

  const sentences = cleanedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

  return sentences.slice(0, 2).join(" ").trim();
}

export async function generateFishTip({ water, speciesResult, weather }) {
  if (!GEMINI_API_KEY) {
    return fallbackFishTip({ water, speciesResult, weather });
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const reasonContext = getReasonContext(speciesResult?.reasons);
  const waterName = water?.name || "this water";
  const species = speciesResult?.species || "this fish";
  const difficulty = speciesResult?.difficulty || "Unknown";
  const weatherDescription = weather?.description || "current conditions";
  const temperature = weather?.temperature?.value ?? "unknown";

  const prompt = `
Write a short beginner-friendly fishing tip that is practical and tactical.

Rules:
- Return only the tip text.
- Write exactly 2 concise natural sentences.
- Mention the species.
- Mention the selected water.
- Mention current conditions briefly if useful.
- Focus on actionable advice: where to cast, lure or bait choice, retrieve speed, structure, depth, timing, and weather adjustments.
- Use the reason context only as hidden background; do not repeat those reasons directly.
- Do not guarantee a catch.
- Do not mention numeric scores.
- Do not mention signed modifier values.
- Do not mention backend scoring systems or app scoring.
- Avoid phrases like "The outlook is shaped by", "Conditions are favorable because", or "Score indicates".
- Sound natural, practical, and non-robotic.

Fishing details:
- Water: ${waterName}
- Species: ${species}
- Difficulty: ${difficulty}
- Hidden reason context, do not quote or repeat: ${reasonContext || "No extra context provided"}
- Weather: ${weatherDescription}
- Temperature: ${temperature}
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const tip = cleanGeneratedTip(response.text);

    return tip || fallbackFishTip({ water, speciesResult, weather });
  } catch {
    return fallbackFishTip({ water, speciesResult, weather });
  }
}
