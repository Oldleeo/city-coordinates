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

const languageByCountry = {
  "中国": "zh-CN",
  "日本": "ja",
  "韩国": "ko",
  "马来西亚": "ms",
  "新加坡": "en-SG",
  "泰国": "th",
  "越南": "vi",
  "印度尼西亚": "id",
  "菲律宾": "fil",
  "柬埔寨": "km",
  "老挝": "lo",
  "缅甸": "my",
  "印度": "en-IN",
  "尼泊尔": "ne",
  "阿联酋": "ar",
  "卡塔尔": "ar",
  "沙特阿拉伯": "ar",
  "土耳其": "tr",
  "以色列": "he",
  "英国": "en-GB",
  "法国": "fr",
  "德国": "de",
  "意大利": "it",
  "西班牙": "es",
  "荷兰": "nl",
  "比利时": "fr",
  "瑞士": "de",
  "奥地利": "de",
  "捷克": "cs",
  "希腊": "el",
  "丹麦": "da",
  "瑞典": "sv",
  "挪威": "no",
  "芬兰": "fi",
  "葡萄牙": "pt",
  "爱尔兰": "en-IE",
  "俄罗斯": "ru",
  "美国": "en-US",
  "加拿大": "en-CA",
  "墨西哥": "es-MX",
  "巴西": "pt-BR",
  "阿根廷": "es-AR",
  "智利": "es-CL",
  "秘鲁": "es-PE",
  "哥伦比亚": "es-CO",
  "澳大利亚": "en-AU",
  "新西兰": "en-NZ",
  "埃及": "ar",
  "南非": "en-ZA",
  "肯尼亚": "sw",
  "摩洛哥": "fr",
  "尼日利亚": "en-NG"
};

const languageByCity = {
  "香港": "zh-HK",
  "澳门": "zh-MO",
  "台北": "zh-TW",
  "新德里": "hi",
  "孟买": "mr",
  "加尔各答": "bn",
  "布鲁塞尔": "fr-BE",
  "日内瓦": "fr-CH",
  "蒙特利尔": "fr-CA"
};

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
  const localLanguage = languageByCity[city.name] || languageByCountry[city.country] || "en";
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "10",
    q: "hotel",
    viewbox: `${city.lng - spread},${city.lat + spread},${city.lng + spread},${city.lat - spread}`,
    bounded: "1",
    "accept-language": `${localLanguage},en;q=0.65`
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
