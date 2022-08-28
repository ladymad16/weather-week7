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

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  let temperatureMain = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city-name");
  let conditionElement = document.querySelector(".condition");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let countryName = document.querySelector("#country-name");
  let dateElement = document.querySelector(".date");
  let timeElement = document.querySelector(".time");
  let iconElement = document.querySelector("#weather-icon");
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
}

function search(city) {
  let apiKey = "1eefbb06c86a0d46a195a5f586c20304";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  search(citySearch.value);
  console.log(citySearch.value);
}
search("New York");
//

let form = document.querySelector(".input-group-text");
form.addEventListener("submit", searchCity);
