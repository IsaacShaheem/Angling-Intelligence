const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

export async function geocodeLocation(location) {
  const url = new URL(GEOCODING_API_URL);
  url.searchParams.set("name", location);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not geocode location.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No location found for "${location}".`);
  }

  const result = data.results[0];

  return {
    name: result.name,
    country: result.country,
    region: result.admin1 || null,
    lat: result.latitude,
    lon: result.longitude,
  };
}

export async function getCurrentWeather(lat, lon) {
  const url = new URL(FORECAST_API_URL);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(",")
  );
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not get current weather.");
  }

  const data = await response.json();
  const current = data.current;
  const units = data.current_units || {};

  if (!current) {
    throw new Error("No current weather data was returned.");
  }

  return {
    time: current.time,
    temperature: {
      value: current.temperature_2m,
      unit: units.temperature_2m,
    },
    feelsLike: {
      value: current.apparent_temperature,
      unit: units.apparent_temperature,
    },
    humidity: {
      value: current.relative_humidity_2m,
      unit: units.relative_humidity_2m,
    },
    precipitation: {
      value: current.precipitation,
      unit: units.precipitation,
    },
    rain: {
      value: current.rain,
      unit: units.rain,
    },
    showers: {
      value: current.showers,
      unit: units.showers,
    },
    snowfall: {
      value: current.snowfall,
      unit: units.snowfall,
    },
    cloudCover: {
      value: current.cloud_cover,
      unit: units.cloud_cover,
    },
    pressure: {
      meanSeaLevel: {
        value: current.pressure_msl,
        unit: units.pressure_msl,
      },
      surface: {
        value: current.surface_pressure,
        unit: units.surface_pressure,
      },
    },
    wind: {
      speed: {
        value: current.wind_speed_10m,
        unit: units.wind_speed_10m,
      },
      direction: {
        value: current.wind_direction_10m,
        unit: units.wind_direction_10m,
      },
      gusts: {
        value: current.wind_gusts_10m,
        unit: units.wind_gusts_10m,
      },
    },
    weatherCode: current.weather_code,
    description: getWeatherDescription(current.weather_code),
  };
}

export function getSeason(date = new Date()) {
  const month = date.getMonth() + 1;

  if (month === 12 || month === 1 || month === 2) {
    return "winter";
  }

  if (month >= 3 && month <= 5) {
    return "spring";
  }

  if (month >= 6 && month <= 8) {
    return "summer";
  }

  return "fall";
}

function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return descriptions[weatherCode] || "Unknown";
}
