import { geocodeLocation, getCurrentWeather } from "./server/lib/weather.js";

const location = await geocodeLocation("Guelph");

console.log("Coordinates for Guelph:");
console.log(`Latitude: ${location.lat}`);
console.log(`Longitude: ${location.lon}`);

const weather = await getCurrentWeather(location.lat, location.lon);

console.log("Current weather:");
console.log(weather);
