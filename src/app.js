function displayTemp(response) {
  let temperatureMain = document.querySelector(".temperature");
  temperatureMain.innerHTML = Math.round(response.data.main.temp);
}
let cityName = "charlotte";
let apiKey = "1eefbb06c86a0d46a195a5f586c20304";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
