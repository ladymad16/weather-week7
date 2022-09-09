function formatDate() {
  let date = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let num = date.getDate();
  return `${day}, ${month} ${num}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecastHtml = `<div class="card-group" id="forecast-card">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="card"><img
        id="icons" src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h6 class="forecast-card" id="forecast-1">
          ${formatDay(forecastDay.dt)}
        </h6>
        <span class="forecast-max-temp">${Math.round(
          forecastDay.temp.max
        )}°</span> | 
        <span class="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
      </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperatureMain = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city-name");
  let conditionElement = document.querySelector(".condition");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let countryName = document.querySelector("#country-name");
  let dateElement = document.querySelector(".date");
  let timeElement = document.querySelector(".time");
  let iconElement = document.querySelector("#weather-icon");
  metricTemp = response.data.main.temp;
  temperatureMain.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} k/hr`;
  countryName.innerHTML = response.data.sys.country;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  search(citySearch.value);
  console.log(citySearch.value);
}
search("New York");

function showImperialTemp(event) {
  event.preventDefault();
  let imperialTemp = (metricTemp * 9) / 5 + 32;
  let tempElement = document.querySelector(".temperature");
  tempElement.innerHTML = Math.round(imperialTemp);
  metricLink.classList.remove("active");
  imperialLink.classList.add("active");
}

function showMetricTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
  tempElement.innerHTML = Math.round(metricTemp);
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
}

let metricTemp = null;

let form = document.querySelector(".input-group-text");
form.addEventListener("submit", searchCity);

let imperialLink = document.querySelector("#f-link");
imperialLink.addEventListener("click", showImperialTemp);

let metricLink = document.querySelector("#c-link");
metricLink.addEventListener("click", showMetricTemp);
