import { SPECIES_PROFILES } from "./waters.js";

const BASE_SPECIES_SCORES = {
  Panfish: 80,
  "Common Carp": 65,
  "Largemouth Bass": 60,
  "Smallmouth Bass": 60,
  "Northern Pike": 60,
  "Channel Catfish": 55,
  Walleye: 48,
  "Rainbow Trout": 42,
  "Brown Trout": 42,
  "Brook Trout": 40,
  "Lake Trout": 38,
  "Chinook Salmon": 35,
  "Coho Salmon": 35,
  "Longnose Gar": 30,
  Muskellunge: 22,
  "Atlantic Salmon": 20,
};

export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

export function getTimeOfDay() {
  return getTimeOfDayFromDate(new Date());
}

export function getDifficultyLabel(score) {
  if (score >= 80) {
    return "Easy";
  }

  if (score >= 60) {
    return "Medium";
  }

  if (score >= 40) {
    return "Hard";
  }

  return "Very Hard";
}

export function scoreSpecies(species, weather, water) {
  const baseScore = BASE_SPECIES_SCORES[species] || 30;
  const date = getDateFromWeather(weather);
  const month = date.getMonth() + 1;
  const timeOfDay = getTimeOfDayFromDate(date);
  const temperature = getTemperature(weather);
  const habitats = getWaterHabitats(water);

  const modifiers = [
    getMonthModifier(species, month),
    getTemperatureModifier(species, temperature),
    getTimeModifier(species, timeOfDay, temperature),
    getWaterSuitabilityModifier(species, habitats),
    getPressureModifier(species, water),
    getWeatherModifier(species, weather),
  ];

  const totalModifier = modifiers.reduce((total, modifier) => {
    return total + modifier.value;
  }, 0);

  const score = clampScore(baseScore + totalModifier);

  return {
    species,
    score,
    difficulty: getDifficultyLabel(score),
    reasons: getImportantReasons(modifiers),
    methods: getRecommendedMethods(species),
    shortExplanation: getShortExplanation(species, score),
    aiTip: getAiTip(species, water),
  };
}

export function scoreAllSpecies(water, weather) {
  const speciesList = water.species || [];

  return speciesList
    .map((species) => {
      return scoreSpecies(species, weather, water);
    })
    .sort((a, b) => {
      return b.score - a.score;
    });
}

function getMonthModifier(species, month) {
  if (isBass(species)) {
    if (month >= 5 && month <= 9) {
      return makeModifier(8, "Bass are more active from May to September.");
    }

    if (month === 12 || month <= 2) {
      return makeModifier(-10, "Bass are usually less active in winter.");
    }
  }

  if (species === "Northern Pike") {
    if ([4, 5, 9, 10, 11].includes(month)) {
      return makeModifier(8, "Pike often fish well in spring and fall.");
    }

    if (month >= 6 && month <= 8) {
      return makeModifier(3, "Pike can still be active in summer.");
    }

    if (month === 12 || month <= 2) {
      return makeModifier(-7, "Pike opportunities are usually tougher in winter.");
    }
  }

  if (species === "Walleye") {
    if ([4, 5, 6, 9, 10, 11].includes(month)) {
      return makeModifier(8, "Walleye often improve in spring and fall.");
    }

    if (month === 12 || month <= 2) {
      return makeModifier(-4, "Walleye can be less predictable in winter.");
    }
  }

  if (isTrout(species)) {
    if ([3, 4, 5, 10, 11].includes(month)) {
      return makeModifier(8, "Trout often respond well to cooler months.");
    }

    if (month >= 7 && month <= 8) {
      return makeModifier(-10, "Hot summer periods can make trout tougher.");
    }
  }

  if (isSalmon(species)) {
    if (month === 9 || month === 10) {
      return makeModifier(14, "Salmon runs are strongest in September and October.");
    }

    if (month === 8 || month === 11) {
      return makeModifier(6, "Salmon opportunities can build around the run season.");
    }

    return makeModifier(-8, "Salmon are weaker outside major run periods.");
  }

  if (species === "Muskellunge") {
    if (month >= 8 && month <= 11) {
      return makeModifier(10, "Muskie fishing is often best in late summer and fall.");
    }

    if (month === 12 || month <= 3) {
      return makeModifier(-8, "Muskie are naturally difficult in the coldest months.");
    }
  }

  if (species === "Panfish") {
    if (month === 12 || month <= 2) {
      return makeModifier(1, "Panfish remain available through winter when conditions are fishable.");
    }

    return makeModifier(4, "Panfish opportunities are fairly stable year-round.");
  }

  if (species === "Common Carp" || species === "Channel Catfish") {
    if (month >= 5 && month <= 9) {
      return makeModifier(6, "Warm months usually help this species.");
    }

    if (month === 12 || month <= 2) {
      return makeModifier(-6, "Cold months can make this species less active.");
    }
  }

  return makeModifier(0, "Month is neutral for this species.");
}

function getTemperatureModifier(species, temperature) {
  if (temperature === null) {
    return makeModifier(0, "Temperature data was not available.");
  }

  if (isBass(species)) {
    if (temperature >= 18 && temperature <= 27) {
      return makeModifier(7, "Warm temperatures often help bass activity.");
    }

    if (temperature > 30) {
      return makeModifier(-5, "Extreme summer heat can slow bass activity.");
    }

    if (temperature < 8) {
      return makeModifier(-6, "Cold water usually makes bass tougher.");
    }
  }

  if (isTrout(species)) {
    if (temperature >= 3 && temperature <= 16) {
      return makeModifier(8, "Cool temperatures usually help trout.");
    }

    if (temperature >= 20 && temperature < 24) {
      return makeModifier(-8, "Warm temperatures can push trout into tougher patterns.");
    }

    if (temperature >= 24) {
      return makeModifier(-16, "Hot temperatures can make trout much tougher.");
    }
  }

  if (isSalmon(species)) {
    if (temperature >= 6 && temperature <= 18) {
      return makeModifier(6, "Cooler conditions often help salmonids.");
    }

    if (temperature >= 20 && temperature < 24) {
      return makeModifier(-6, "Warm conditions can make salmonid opportunities less reliable.");
    }

    if (temperature >= 24) {
      return makeModifier(-12, "Hot weather can reduce salmonid activity.");
    }
  }

  if (species === "Northern Pike") {
    if (temperature >= 6 && temperature <= 20) {
      return makeModifier(6, "Moderate temperatures often help pike.");
    }

    if (temperature > 20 && temperature < 28) {
      return makeModifier(-3, "Warmer water can push pike into slower or deeper patterns.");
    }

    if (temperature >= 28) {
      return makeModifier(-9, "Extreme heat can make pike less active.");
    }
  }

  if (species === "Walleye") {
    if (temperature >= 6 && temperature <= 18) {
      return makeModifier(4, "Cool to moderate temperatures can help walleye.");
    }

    if (temperature >= 24) {
      return makeModifier(-8, "Hot temperatures can make walleye harder to pattern.");
    }
  }

  if (species === "Muskellunge") {
    if (temperature >= 10 && temperature <= 22) {
      return makeModifier(3, "Moderate temperatures can slightly help muskie opportunities.");
    }

    if (temperature < 5 || temperature >= 27) {
      return makeModifier(-7, "Very cold or hot temperatures make muskie opportunities tougher.");
    }
  }

  if (species === "Channel Catfish") {
    if (temperature >= 18) {
      return makeModifier(7, "Warm weather often helps catfish.");
    }

    if (temperature < 8) {
      return makeModifier(-5, "Cold conditions can slow catfish activity.");
    }
  }

  if (species === "Panfish") {
    if (temperature >= 8 && temperature <= 28) {
      return makeModifier(4, "Panfish handle a wide range of fishable temperatures.");
    }

    if (temperature < 3 || temperature > 31) {
      return makeModifier(-6, "Extreme temperatures can reduce panfish activity.");
    }
  }

  if (species === "Common Carp" || species === "Longnose Gar") {
    if (temperature >= 16 && temperature <= 28) {
      return makeModifier(5, "Warm temperatures are generally helpful.");
    }

    if (temperature < 5) {
      return makeModifier(-5, "Cold temperatures can reduce activity.");
    }
  }

  return makeModifier(0, "Temperature is neutral for this species.");
}

function getTimeModifier(species, timeOfDay, temperature) {
  if (isBass(species)) {
    if (timeOfDay === "morning" || timeOfDay === "evening") {
      return makeModifier(5, "Bass often feed better in morning and evening.");
    }

    if (timeOfDay === "afternoon" && temperature !== null && temperature >= 28) {
      return makeModifier(-4, "Hot afternoons can slow bass activity.");
    }
  }

  if (species === "Walleye") {
    if (timeOfDay === "morning" || timeOfDay === "evening" || timeOfDay === "night") {
      return makeModifier(7, "Walleye often improve during low-light periods.");
    }
  }

  if (species === "Channel Catfish") {
    if (timeOfDay === "evening" || timeOfDay === "night") {
      return makeModifier(8, "Catfish often feed better in evening and night.");
    }
  }

  if (species === "Muskellunge") {
    if (timeOfDay === "morning" || timeOfDay === "evening") {
      return makeModifier(4, "Low light can slightly help muskie opportunities.");
    }
  }

  return makeModifier(0, "Time of day is neutral for this species.");
}

function getWaterSuitabilityModifier(species, habitats) {
  if (isBass(species)) {
    if (habitats.includes("shallow_weedy") || habitats.includes("reservoir")) {
      return makeModifier(8, "This water has habitat that suits bass.");
    }
  }

  if (species === "Northern Pike") {
    if (habitats.includes("shallow_weedy")) {
      return makeModifier(8, "Shallow weedy habitat is good for pike.");
    }
  }

  if (isTrout(species)) {
    if (habitats.includes("deep_cold") || habitats.includes("river")) {
      return makeModifier(8, "Cold or river habitat suits trout.");
    }
  }

  if (isSalmon(species)) {
    if (habitats.includes("great_lake_tributary")) {
      return makeModifier(12, "Great Lake tributary habitat strongly suits salmon runs.");
    }

    if (habitats.includes("river") || habitats.includes("urban_harbour")) {
      return makeModifier(4, "This water can support seasonal salmon opportunities.");
    }
  }

  if (species === "Panfish") {
    if (habitats.includes("urban_harbour") || habitats.includes("shallow_weedy")) {
      return makeModifier(7, "Harbour or shallow habitat often suits panfish.");
    }
  }

  if (species === "Common Carp") {
    if (habitats.includes("urban_harbour") || habitats.includes("shallow_weedy")) {
      return makeModifier(6, "Harbour or shallow habitat often suits this species.");
    }
  }

  if (species === "Channel Catfish") {
    if (habitats.includes("river") || habitats.includes("reservoir")) {
      return makeModifier(6, "River or reservoir habitat can suit catfish.");
    }
  }

  if (species === "Muskellunge") {
    if (habitats.includes("river") || habitats.includes("reservoir") || habitats.includes("shallow_weedy")) {
      return makeModifier(5, "This larger-water habitat can suit muskie.");
    }
  }

  return makeModifier(0, "Water type is neutral for this species.");
}

function getPressureModifier(species, water) {
  const pressureLevel = normalizePressure(water && water.pressureLevel);

  if (pressureLevel === "low") {
    if (species === "Panfish") {
      return makeModifier(4, "Lower fishing pressure gives panfish a small opportunity boost.");
    }

    return makeModifier(5, "Lower fishing pressure gives a small opportunity boost.");
  }

  if (pressureLevel === "high") {
    if (species === "Panfish") {
      return makeModifier(-2, "High fishing pressure only slightly reduces panfish opportunity.");
    }

    if (species === "Northern Pike") {
      return makeModifier(-8, "High fishing pressure makes pike less predictable.");
    }

    if (species === "Walleye" || isTrout(species) || isSalmon(species)) {
      return makeModifier(-10, "High fishing pressure makes this species harder to pattern.");
    }

    if (species === "Muskellunge") {
      return makeModifier(-12, "High fishing pressure makes muskie opportunities much tougher.");
    }

    return makeModifier(-7, "High fishing pressure reduces opportunity.");
  }

  return makeModifier(0, "Medium fishing pressure is neutral.");
}

function getWeatherModifier(species, weather) {
  const description = ((weather && weather.description) || "").toLowerCase();
  const cloudCover = getCloudCover(weather);
  const isBright =
    description.includes("clear") ||
    description.includes("sunny") ||
    (cloudCover !== null && cloudCover <= 25);

  if (!isBright) {
    return makeModifier(0, "Weather brightness is neutral.");
  }

  if (species === "Panfish") {
    return makeModifier(0, "Bright conditions are usually manageable for panfish.");
  }

  if (species === "Northern Pike") {
    return makeModifier(-6, "Very clear or bright conditions can make pike less aggressive.");
  }

  if (species === "Walleye") {
    return makeModifier(-7, "Bright conditions can make walleye harder to target.");
  }

  if (isTrout(species) || isSalmon(species)) {
    return makeModifier(-4, "Bright conditions can make salmonids more cautious.");
  }

  if (species === "Muskellunge") {
    return makeModifier(-5, "Bright conditions can make muskie follows harder to convert.");
  }

  return makeModifier(0, "Weather brightness is neutral.");
}

function getWaterHabitats(water) {
  const type = ((water && water.type) || "").toLowerCase();
  const tags = ((water && water.tags) || []).map((tag) => {
    return tag.toLowerCase();
  });
  const text = [type, ...tags].join(" ");
  const habitats = [];

  if (
    text.includes("warmwater") ||
    text.includes("weedy") ||
    text.includes("wetland") ||
    text.includes("shallow") ||
    text.includes("bay") ||
    text.includes("lagoon")
  ) {
    habitats.push("shallow_weedy");
  }

  if (text.includes("coldwater") || text.includes("deep") || text.includes("great lake")) {
    habitats.push("deep_cold");
  }

  if (
    text.includes("river") ||
    text.includes("creek") ||
    text.includes("canal") ||
    text.includes("tributary")
  ) {
    habitats.push("river");
  }

  if (text.includes("reservoir")) {
    habitats.push("reservoir");
  }

  if (
    text.includes("lake-ontario-tributary") ||
    text.includes("lake-huron-tributary") ||
    text.includes("georgian-bay-tributary") ||
    text.includes("seasonal-run")
  ) {
    habitats.push("great_lake_tributary");
  }

  if (
    text.includes("urban-harbour") ||
    text.includes("urban harbour") ||
    (text.includes("urban") && text.includes("harbour")) ||
    text.includes("harbour")
  ) {
    habitats.push("urban_harbour");
  }

  return habitats;
}

function getImportantReasons(modifiers) {
  return modifiers
    .filter((modifier) => {
      return modifier.value !== 0;
    })
    .sort((a, b) => {
      return Math.abs(b.value) - Math.abs(a.value);
    })
    .slice(0, 3)
    .map((modifier) => {
      const sign = modifier.value > 0 ? "+" : "";
      return `${sign}${modifier.value}: ${modifier.reason}`;
    });
}

function getDateFromWeather(weather) {
  if (weather && weather.time) {
    return new Date(weather.time);
  }

  return new Date();
}

function getTimeOfDayFromDate(date) {
  const hour = date.getHours();

  if (hour >= 5 && hour <= 11) {
    return "morning";
  }

  if (hour >= 12 && hour <= 16) {
    return "afternoon";
  }

  if (hour >= 17 && hour <= 20) {
    return "evening";
  }

  return "night";
}

function getTemperature(weather) {
  if (
    weather &&
    weather.temperature &&
    typeof weather.temperature.value === "number"
  ) {
    return weather.temperature.value;
  }

  return null;
}

function getCloudCover(weather) {
  if (
    weather &&
    weather.cloudCover &&
    typeof weather.cloudCover.value === "number"
  ) {
    return weather.cloudCover.value;
  }

  return null;
}

function getRecommendedMethods(species) {
  const methods = SPECIES_PROFILES[species]?.recommendedMethods;

  if (!methods) {
    return [];
  }

  return methods
    .replace(/^Use /, "")
    .replace(/^Try /, "")
    .replace(/^Cast /, "")
    .replace(/^Throw /, "")
    .replace(/^Fish /, "")
    .split(/,|\bor\b/)
    .map((method) => {
      return method.trim().replace(/\.$/, "");
    })
    .filter(Boolean)
    .slice(0, 4);
}

function getShortExplanation(species, score) {
  const profile = SPECIES_PROFILES[species];
  const note = profile?.note || "Use current conditions and local structure to decide whether this species is worth targeting.";

  return `${species} are rated ${score}/100 today. ${note}`;
}

function getAiTip(species, water) {
  const profile = SPECIES_PROFILES[species];
  const preferredConditions = profile?.preferredConditions;

  if (preferredConditions) {
    return `Look for ${preferredConditions.toLowerCase()} At ${water.name}, adjust your presentation speed until fish respond.`;
  }

  return `Focus on the strongest structure around ${water.name} and adjust depth before changing locations.`;
}

function normalizePressure(pressureLevel) {
  if (pressureLevel === "low") {
    return "low";
  }

  if (pressureLevel === "high" || pressureLevel === "veryHigh") {
    return "high";
  }

  return "medium";
}

function isBass(species) {
  return species === "Largemouth Bass" || species === "Smallmouth Bass";
}

function isTrout(species) {
  return (
    species === "Rainbow Trout" ||
    species === "Brown Trout" ||
    species === "Brook Trout" ||
    species === "Lake Trout"
  );
}

function isSalmon(species) {
  return (
    species === "Chinook Salmon" ||
    species === "Coho Salmon" ||
    species === "Atlantic Salmon"
  );
}

function makeModifier(value, reason) {
  return {
    value,
    reason,
  };
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}
