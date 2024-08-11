function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}℃`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="Weather icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "11d97ctd3be7f23f95141o2bae80ac44";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  getForecast(city);  // Call the forecast function with the city parameter
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
 let apiKey = "11d97ctd3be7f23f95141o2bae80ac44";
 let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = ""; 

  response.data.daily.slice(0, 5).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let options = { weekday: 'short' };
    let dayName = date.toLocaleDateString(undefined, options);
    
    forecastHtml +=
    `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${dayName}</div> 
      <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt="Forecast icon" />
      </div>  
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}℃</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}℃</div>
      </div>  
    </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial search
searchCity("London");

