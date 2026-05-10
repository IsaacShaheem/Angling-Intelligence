import { scoreSpecies, scoreAllSpecies } from "./server/lib/scoring.js";

const warmSummerWeather = {
  time: "2026-07-10T19:00",
  temperature: {
    value: 24,
    unit: "°C",
  },
};

const hotSummerWeather = {
  time: "2026-07-10T14:00",
  temperature: {
    value: 29,
    unit: "°C",
  },
};

const fallRunWeather = {
  time: "2026-09-20T18:00",
  temperature: {
    value: 12,
    unit: "°C",
  },
};

const warmSummerReservoir = {
  name: "Sample Warm Summer Reservoir",
  type: "Reservoir",
  tags: ["reservoir", "warmwater", "shore-access"],
  pressureLevel: "medium",
  species: ["Panfish", "Largemouth Bass", "Smallmouth Bass", "Channel Catfish"],
};

const troutLake = {
  name: "Sample Trout Lake",
  type: "Lake",
  tags: ["coldwater", "deep-lake"],
  pressureLevel: "medium",
  species: ["Rainbow Trout", "Brown Trout", "Brook Trout", "Lake Trout"],
};

const salmonTributary = {
  name: "Sample Salmon Tributary",
  type: "River",
  tags: ["lake-ontario-tributary", "seasonal-run", "river"],
  pressureLevel: "high",
  species: ["Chinook Salmon", "Coho Salmon", "Rainbow Trout", "Brown Trout"],
};

const urbanHarbour = {
  name: "Sample Urban Harbour",
  type: "Harbour",
  tags: ["urban-harbour", "warmwater", "shore-access"],
  pressureLevel: "veryHigh",
  species: ["Common Carp", "Panfish", "Northern Pike", "Largemouth Bass"],
};

printSingleScore(
  "Warm summer reservoir bass score",
  scoreSpecies("Largemouth Bass", warmSummerWeather, warmSummerReservoir)
);

printAllScores(
  "Warm summer reservoir all species",
  scoreAllSpecies(warmSummerReservoir, warmSummerWeather)
);

printSingleScore(
  "Hot summer trout lake score",
  scoreSpecies("Rainbow Trout", hotSummerWeather, troutLake)
);

printAllScores("Trout lake all species", scoreAllSpecies(troutLake, hotSummerWeather));

printSingleScore(
  "Fall salmon tributary score",
  scoreSpecies("Chinook Salmon", fallRunWeather, salmonTributary)
);

printAllScores(
  "Salmon tributary all species",
  scoreAllSpecies(salmonTributary, fallRunWeather)
);

printSingleScore(
  "Urban harbour carp score",
  scoreSpecies("Common Carp", warmSummerWeather, urbanHarbour)
);

printAllScores("Urban harbour all species", scoreAllSpecies(urbanHarbour, warmSummerWeather));

function printSingleScore(title, result) {
  console.log(`\n${title}`);
  console.log("------------------------------");
  printScore(result);
}

function printAllScores(title, results) {
  console.log(`\n${title}`);
  console.log("------------------------------");

  results.forEach((result) => {
    printScore(result);
  });
}

function printScore(result) {
  console.log(`${result.species}: ${result.score} (${result.difficulty})`);

  result.reasons.forEach((reason) => {
    console.log(`  - ${reason}`);
  });
}
