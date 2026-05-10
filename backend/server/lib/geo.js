import { WATERS } from "./waters.js";

export function distanceKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const latDifference = degreesToRadians(lat2 - lat1);
  const lonDifference = degreesToRadians(lon2 - lon1);

  const startLat = degreesToRadians(lat1);
  const endLat = degreesToRadians(lat2);

  const a =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(startLat) *
      Math.cos(endLat) *
      Math.sin(lonDifference / 2) *
      Math.sin(lonDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function getClosestWaters(userLat, userLon, limit = 5) {
  const watersWithDistance = WATERS.map((water) => {
    return {
      ...water,
      distanceKm: distanceKm(userLat, userLon, water.lat, water.lon),
    };
  });

  watersWithDistance.sort((a, b) => {
    return a.distanceKm - b.distanceKm;
  });

  return watersWithDistance.slice(0, limit);
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
