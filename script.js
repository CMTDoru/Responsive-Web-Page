function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function fetchWeather(position) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data.main || !data.main.temp) {
        console.error("Invalid weather data:", data);
        return;
      }
      const temperature = data.main.temp;
      changeBannerTextColor(temperature);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function changeBannerTextColor(temperature) {
  const bannerText = document.getElementById("bannerText");

  if (temperature <= 10) {
    bannerText.style.color = "blue"; // Cooler temperatures
  } else if (temperature > 10 && temperature <= 25) {
    bannerText.style.color = "gray"; // Moderate temperatures
  } else {
    bannerText.style.color = "red"; // Warmer temperatures
  }
}

function closeBanner() {
  var bannerButton = document.getElementById("bannerButton");
  bannerButton.addEventListener("click", function () {
    var banner = document.getElementById("banner");
    banner.remove();
  });
}

function preventLogoCopy() {
  var logo = document.getElementById("logo");
  logo.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  closeBanner();
  getUserLocation();
  preventLogoCopy();
});
