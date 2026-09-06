const cities = [
  ["北京", "Beijing", "中国", "东亚", 39.9042, 116.4074],
  ["上海", "Shanghai", "中国", "东亚", 31.2304, 121.4737],
  ["广州", "Guangzhou", "中国", "东亚", 23.1291, 113.2644],
  ["深圳", "Shenzhen", "中国", "东亚", 22.5431, 114.0579],
  ["成都", "Chengdu", "中国", "东亚", 30.5728, 104.0668],
  ["重庆", "Chongqing", "中国", "东亚", 29.563, 106.5516],
  ["杭州", "Hangzhou", "中国", "东亚", 30.2741, 120.1551],
  ["香港", "Hong Kong", "中国", "东亚", 22.3193, 114.1694],
  ["澳门", "Macau", "中国", "东亚", 22.1987, 113.5439],
  ["台北", "Taipei", "中国", "东亚", 25.033, 121.5654],
  ["东京", "Tokyo", "日本", "东亚", 35.6762, 139.6503],
  ["大阪", "Osaka", "日本", "东亚", 34.6937, 135.5023],
  ["首尔", "Seoul", "韩国", "东亚", 37.5665, 126.978],
  ["釜山", "Busan", "韩国", "东亚", 35.1796, 129.0756],
  ["吉隆坡", "Kuala Lumpur", "马来西亚", "东南亚", 3.139, 101.6869],
  ["新加坡", "Singapore", "新加坡", "东南亚", 1.3521, 103.8198],
  ["曼谷", "Bangkok", "泰国", "东南亚", 13.7563, 100.5018],
  ["清迈", "Chiang Mai", "泰国", "东南亚", 18.7883, 98.9853],
  ["河内", "Hanoi", "越南", "东南亚", 21.0278, 105.8342],
  ["胡志明市", "Ho Chi Minh City", "越南", "东南亚", 10.8231, 106.6297],
  ["雅加达", "Jakarta", "印度尼西亚", "东南亚", -6.2088, 106.8456],
  ["巴厘岛", "Bali", "印度尼西亚", "东南亚", -8.4095, 115.1889],
  ["马尼拉", "Manila", "菲律宾", "东南亚", 14.5995, 120.9842],
  ["金边", "Phnom Penh", "柬埔寨", "东南亚", 11.5564, 104.9282],
  ["万象", "Vientiane", "老挝", "东南亚", 17.9757, 102.6331],
  ["仰光", "Yangon", "缅甸", "东南亚", 16.8409, 96.1735],
  ["新德里", "New Delhi", "印度", "南亚", 28.6139, 77.209],
  ["孟买", "Mumbai", "印度", "南亚", 19.076, 72.8777],
  ["加尔各答", "Kolkata", "印度", "南亚", 22.5726, 88.3639],
  ["加德满都", "Kathmandu", "尼泊尔", "南亚", 27.7172, 85.324],
  ["迪拜", "Dubai", "阿联酋", "中东", 25.2048, 55.2708],
  ["阿布扎比", "Abu Dhabi", "阿联酋", "中东", 24.4539, 54.3773],
  ["多哈", "Doha", "卡塔尔", "中东", 25.2854, 51.531],
  ["利雅得", "Riyadh", "沙特阿拉伯", "中东", 24.7136, 46.6753],
  ["伊斯坦布尔", "Istanbul", "土耳其", "中东", 41.0082, 28.9784],
  ["特拉维夫", "Tel Aviv", "以色列", "中东", 32.0853, 34.7818],
  ["伦敦", "London", "英国", "欧洲", 51.5074, -0.1278],
  ["巴黎", "Paris", "法国", "欧洲", 48.8566, 2.3522],
  ["柏林", "Berlin", "德国", "欧洲", 52.52, 13.405],
  ["慕尼黑", "Munich", "德国", "欧洲", 48.1351, 11.582],
  ["罗马", "Rome", "意大利", "欧洲", 41.9028, 12.4964],
  ["米兰", "Milan", "意大利", "欧洲", 45.4642, 9.19],
  ["马德里", "Madrid", "西班牙", "欧洲", 40.4168, -3.7038],
  ["巴塞罗那", "Barcelona", "西班牙", "欧洲", 41.3874, 2.1686],
  ["阿姆斯特丹", "Amsterdam", "荷兰", "欧洲", 52.3676, 4.9041],
  ["布鲁塞尔", "Brussels", "比利时", "欧洲", 50.8503, 4.3517],
  ["苏黎世", "Zurich", "瑞士", "欧洲", 47.3769, 8.5417],
  ["日内瓦", "Geneva", "瑞士", "欧洲", 46.2044, 6.1432],
  ["维也纳", "Vienna", "奥地利", "欧洲", 48.2082, 16.3738],
  ["布拉格", "Prague", "捷克", "欧洲", 50.0755, 14.4378],
  ["雅典", "Athens", "希腊", "欧洲", 37.9838, 23.7275],
  ["哥本哈根", "Copenhagen", "丹麦", "欧洲", 55.6761, 12.5683],
  ["斯德哥尔摩", "Stockholm", "瑞典", "欧洲", 59.3293, 18.0686],
  ["奥斯陆", "Oslo", "挪威", "欧洲", 59.9139, 10.7522],
  ["赫尔辛基", "Helsinki", "芬兰", "欧洲", 60.1699, 24.9384],
  ["里斯本", "Lisbon", "葡萄牙", "欧洲", 38.7223, -9.1393],
  ["都柏林", "Dublin", "爱尔兰", "欧洲", 53.3498, -6.2603],
  ["莫斯科", "Moscow", "俄罗斯", "欧洲", 55.7558, 37.6173],
  ["纽约", "New York", "美国", "北美洲", 40.7128, -74.006],
  ["洛杉矶", "Los Angeles", "美国", "北美洲", 34.0522, -118.2437],
  ["旧金山", "San Francisco", "美国", "北美洲", 37.7749, -122.4194],
  ["芝加哥", "Chicago", "美国", "北美洲", 41.8781, -87.6298],
  ["华盛顿", "Washington DC", "美国", "北美洲", 38.9072, -77.0369],
  ["拉斯维加斯", "Las Vegas", "美国", "北美洲", 36.1699, -115.1398],
  ["迈阿密", "Miami", "美国", "北美洲", 25.7617, -80.1918],
  ["西雅图", "Seattle", "美国", "北美洲", 47.6062, -122.3321],
  ["波士顿", "Boston", "美国", "北美洲", 42.3601, -71.0589],
  ["檀香山", "Honolulu", "美国", "北美洲", 21.3099, -157.8581],
  ["多伦多", "Toronto", "加拿大", "北美洲", 43.6532, -79.3832],
  ["温哥华", "Vancouver", "加拿大", "北美洲", 49.2827, -123.1207],
  ["蒙特利尔", "Montreal", "加拿大", "北美洲", 45.5019, -73.5674],
  ["墨西哥城", "Mexico City", "墨西哥", "北美洲", 19.4326, -99.1332],
  ["圣保罗", "Sao Paulo", "巴西", "南美洲", -23.5505, -46.6333],
  ["里约热内卢", "Rio de Janeiro", "巴西", "南美洲", -22.9068, -43.1729],
  ["布宜诺斯艾利斯", "Buenos Aires", "阿根廷", "南美洲", -34.6037, -58.3816],
  ["圣地亚哥", "Santiago", "智利", "南美洲", -33.4489, -70.6693],
  ["利马", "Lima", "秘鲁", "南美洲", -12.0464, -77.0428],
  ["波哥大", "Bogota", "哥伦比亚", "南美洲", 4.711, -74.0721],
  ["悉尼", "Sydney", "澳大利亚", "大洋洲", -33.8688, 151.2093],
  ["墨尔本", "Melbourne", "澳大利亚", "大洋洲", -37.8136, 144.9631],
  ["布里斯班", "Brisbane", "澳大利亚", "大洋洲", -27.4698, 153.0251],
  ["珀斯", "Perth", "澳大利亚", "大洋洲", -31.9505, 115.8605],
  ["奥克兰", "Auckland", "新西兰", "大洋洲", -36.8509, 174.7645],
  ["开罗", "Cairo", "埃及", "非洲", 30.0444, 31.2357],
  ["约翰内斯堡", "Johannesburg", "南非", "非洲", -26.2041, 28.0473],
  ["开普敦", "Cape Town", "南非", "非洲", -33.9249, 18.4241],
  ["内罗毕", "Nairobi", "肯尼亚", "非洲", -1.2921, 36.8219],
  ["卡萨布兰卡", "Casablanca", "摩洛哥", "非洲", 33.5731, -7.5898],
  ["拉各斯", "Lagos", "尼日利亚", "非洲", 6.5244, 3.3792]
].map(([name, english, country, region, lat, lng]) => ({ name, english, country, region, lat, lng }));

const regionOrder = ["全部", "东亚", "东南亚", "南亚", "中东", "欧洲", "北美洲", "南美洲", "大洋洲", "非洲"];
const searchInput = document.querySelector("#search");
const regionContainer = document.querySelector("#regions");
const cityList = document.querySelector("#city-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const formatButton = document.querySelector("#copy-format");

let selectedRegion = "全部";
let copyOrder = "latlng";
let toastTimer;

const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const formatNumber = (value) => Number(value).toFixed(4);

function coordinates(city) {
  const lat = formatNumber(city.lat);
  const lng = formatNumber(city.lng);
  return copyOrder === "latlng" ? `${lat}, ${lng}` : `${lng}, ${lat}`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text, cityName) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  showToast(`已复制 ${cityName}：${text}`);
}

function renderRegions() {
  regionContainer.innerHTML = regionOrder.map((region) => `
    <button class="region-button${region === selectedRegion ? " active" : ""}" type="button" data-region="${region}">
      ${region}
    </button>
  `).join("");
}

function filteredCities() {
  const query = normalize(searchInput.value.trim());
  return cities.filter((city) => {
    const inRegion = selectedRegion === "全部" || city.region === selectedRegion;
    const haystack = normalize(`${city.name} ${city.english} ${city.country} ${city.region}`);
    return inRegion && (!query || haystack.includes(query));
  });
}

function renderCities() {
  const visibleCities = filteredCities();
  resultCount.textContent = visibleCities.length;
  emptyState.hidden = visibleCities.length !== 0;
  cityList.hidden = visibleCities.length === 0;
  cityList.innerHTML = visibleCities.map((city) => `
    <article class="city-card" tabindex="0" role="button" data-city="${city.name}" aria-label="复制${city.name}经纬度">
      <div class="city-top">
        <div>
          <h2>${city.name}</h2>
          <div class="english">${city.english}</div>
        </div>
        <div class="copy-icon" aria-hidden="true">⧉</div>
      </div>
      <div class="country">${city.country} · ${city.region}</div>
      <div class="coords">${coordinates(city)}</div>
    </article>
  `).join("");
}

function copyCityFromCard(card) {
  const city = cities.find((item) => item.name === card.dataset.city);
  if (city) copyText(coordinates(city), city.name);
}

regionContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-region]");
  if (!button) return;
  selectedRegion = button.dataset.region;
  renderRegions();
  renderCities();
});

searchInput.addEventListener("input", renderCities);

cityList.addEventListener("click", (event) => {
  const card = event.target.closest(".city-card");
  if (card) copyCityFromCard(card);
});

cityList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".city-card");
  if (!card) return;
  event.preventDefault();
  copyCityFromCard(card);
});

formatButton.addEventListener("click", () => {
  copyOrder = copyOrder === "latlng" ? "lnglat" : "latlng";
  formatButton.textContent = copyOrder === "latlng" ? "格式：纬度, 经度" : "格式：经度, 纬度";
  renderCities();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    renderCities();
  }
});

renderRegions();
renderCities();
