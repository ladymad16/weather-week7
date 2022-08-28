function displayTemp(response) {
  console.log(response.data);
  let temperatureMain = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city-name");
  let conditionElement = document.querySelector(".condition");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  temperatureMain.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} k/hr`;
}
let cityName = "charlotte";
let apiKey = "1eefbb06c86a0d46a195a5f586c20304";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
