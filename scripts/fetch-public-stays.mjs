import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const cityPattern = /^\s*\["([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)", (-?[\d.]+), (-?[\d.]+)\],?$/gm;
const cities = [...source.matchAll(cityPattern)].map((match) => ({
  name: match[1],
  english: match[2],
  country: match[3],
  region: match[4],
  lat: Number(match[5]),
  lng: Number(match[6])
}));

if (!cities.length) throw new Error("No cities found in app.js");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const radians = (degrees) => degrees * Math.PI / 180;

function distanceKm(a, b) {
  const earthRadius = 6371;
  const dLat = radians(b.lat - a.lat);
  const dLng = radians(b.lng - a.lng);
  const lat1 = radians(a.lat);
  const lat2 = radians(b.lat);
  const value = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(value));
}

function usefulAddress(result) {
  const address = result.address || {};
  return Boolean(result.name && (address.road || address.pedestrian || address.neighbourhood));
}

function score(city, result) {
  const address = result.address || {};
  const distance = distanceKm(city, { lat: Number(result.lat), lng: Number(result.lon) });
  return (address.postcode ? 35 : 0)
    + (address.house_number ? 18 : 0)
    + (address.road || address.pedestrian ? 12 : 0)
    + Math.min(Number(result.importance || 0) * 20, 12)
    - Math.min(distance, 100) * 2.2;
}

function compactAddress(result) {
  const address = result.address || {};
  const parts = [
    address.house_number,
    address.road || address.pedestrian,
    address.neighbourhood || address.quarter || address.suburb,
    address.city || address.town || address.municipality,
    address.state || address.region,
    address.country
  ].filter(Boolean);
  return [...new Set(parts)].join("，");
}

async function fetchPlace(city) {
  const spread = city.name === "巴厘岛" ? 0.75 : 0.32;
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "10",
    q: "hotel",
    viewbox: `${city.lng - spread},${city.lat + spread},${city.lng + spread},${city.lat - spread}`,
    bounded: "1",
    "accept-language": "zh,en"
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { "User-Agent": "CityCoordinatesSite/1.0 (https://github.com/Oldleeo/city-coordinates)" }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const results = (await response.json())
    .filter((item) => item.category === "tourism" && item.type === "hotel" && usefulAddress(item))
    .sort((a, b) => score(city, b) - score(city, a));
  const result = results[0];
  if (!result) return null;
  const hasNoUniversalPostcode = ["香港", "澳门", "迪拜", "阿布扎比"].includes(city.name);
  return {
    name: result.name,
    address: compactAddress(result),
    postcode: hasNoUniversalPostcode ? "不适用（当地无通用邮编）" : (result.address?.postcode || "未收录"),
    lat: Number(result.lat),
    lng: Number(result.lon),
    source: `https://www.openstreetmap.org/${result.osm_type}/${result.osm_id}`
  };
}

const places = {};
for (const [index, city] of cities.entries()) {
  try {
    places[city.name] = await fetchPlace(city);
    process.stdout.write(`${String(index + 1).padStart(2, "0")}/${cities.length} ${city.name}: ${places[city.name]?.name || "fallback"}\n`);
  } catch (error) {
    places[city.name] = null;
    process.stderr.write(`${city.name}: ${error.message}\n`);
  }
  await sleep(1150);
}

const output = `// Generated from OpenStreetMap/Nominatim public accommodation data.\nwindow.publicPlaces = ${JSON.stringify(places, null, 2)};\n`;
writeFileSync(new URL("../public-places.js", import.meta.url), output);
