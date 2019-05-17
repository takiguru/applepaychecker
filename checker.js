//Configuration
const retailURL =
  "https://cors-anywhere.herokuapp.com/https://smp-device-content.apple.com/static/region/v2/config.json";
const betaURL =
  "https://cors-anywhere.herokuapp.com/https://smp-device-content.apple.com/static/region/v2/config-beta.json";

async function fetchAppleConfiguration(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        Origin: "https://smp-device-content.apple.com"
      }
    });
    return await resp.json();
  } catch (err) {
    throw new Error("Configuration fetch failed:" + err.toString());
  }
}

async function fetchCountryCode() {
  try {
    let resp = await fetch("https://ipinfo.io/json");
    resp = await resp.json();
    return resp.country;
  } catch (err) {
    throw new Error("Ip fetch failed" + err.toString());
  }
}

(async () => {
  const retailConfiguration = await fetchAppleConfiguration(retailURL);
  const betaConfiguration = await fetchAppleConfiguration(betaURL);
  const countryCode = await fetchCountryCode();
  const retailElement = document.getElementById("enabledRetail");
  const betaElement = document.getElementById("enabledBeta");
  const regionElement = document.getElementById("region");
  const dataContainer = document.getElementById("data-container");
  const loadingContainer = document.getElementById("loading-container");
  regionElement.innerHTML = `Your country code: ${countryCode}`;
  if (retailConfiguration.SupportedRegions[countryCode]) {
    retailElement.style.color = "green";
    retailElement.innerHTML = "YES :)";
  }
  if (betaConfiguration.SupportedRegions[countryCode]) {
    betaElement.style.color = "green";
    betaElement.innerHTML = "YES :)";
  }
  loadingContainer.style.display = "none";
  dataContainer.style.display = "block";
})();
