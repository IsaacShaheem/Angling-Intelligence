import { getClosestWaters } from "./server/lib/geo.js";

const guelphLat = 43.5448;
const guelphLon = -80.2482;

const closestWaters = getClosestWaters(guelphLat, guelphLon);

console.log("Closest waters to Guelph:");

closestWaters.forEach((water, index) => {
  console.log(
    `${index + 1}. ${water.name} - ${water.distanceKm.toFixed(2)} km`
  );
});
