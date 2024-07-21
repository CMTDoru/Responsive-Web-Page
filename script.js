"use strict";

document.addEventListener("DOMContentLoaded", function () {
  closeBanner();
  getUserLocation();
  preventLogoCopy();
  hamburgerMenu();
});

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function fetchWeather(position) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data.current) {
        console.error("Invalid weather data:", data);
        return;
      }
      const temperature = data.current.temperature_2m;
      changeBannerTextColor(temperature);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function changeBannerTextColor(temperature) {
  const bannerText = document.getElementById("bannerText");

  if (bannerText === null) return;

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
function hamburgerMenu() {
  var burgerIcon = document.getElementById("hamburgerMenu");
  var menu = document.getElementById("menu");

  // Add click event listener to the burger icon
  burgerIcon.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
}
