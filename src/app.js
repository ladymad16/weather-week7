function displayTemp(response) {
  console.log(response.data);
  let temperatureMain = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city-name");
  let conditionElement = document.querySelector(".condition");
  temperatureMain.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].main;
}
let cityName = "charlotte";
let apiKey = "1eefbb06c86a0d46a195a5f586c20304";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
