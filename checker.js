//Configuration
const retailURL =
  "https://smp-device-content.apple.com/static/region/v2/config.json";
const betaURL =
  "https://smp-device-content.apple.com/static/region/v2/config-beta.json";

async function fetchJson(url) {
  return await fetch(url);
}

(async () => {
  const retailConfiguration = await fetchJson(retailURL);
  const betaConfiguration = await fetchJson(betaURL);
  console.log(retailConfiguration, betaConfiguration);
})();
