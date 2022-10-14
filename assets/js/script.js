// Global variables
// search history as an empty array
var searchHistory = "";
// weather api root url
// api key
var APIKey = "5b96b8fe04286fa15699ca8d32934665";

// DOM element references
// search form
// search input
var searchInput = $('#city-search-input')
// container/section for today's weather
var todaysWeatherEl = $("#todays-weather")
// container/section for the forecast
var weeklyForecastEl = $("#week-forecast")
// search history container

// Function to display the search history list.
function renderSearchHistory() {
  // empty the search history container
  // loop through the history array creating a button for each item
  // append to the search history container
}

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // push search term into search history array

  // set search history array to local storage
  renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
  // get search history item from local storage

  // set search history array equal to what you got from local storage
  renderSearchHistory();
}

// Function to display the CURRENT weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {
  // Store response data from our fetch request in variables
  // temperature, wind speed, etc.
  // document.create the elements you'll want to put this information in
  // append those elements somewhere
  // give them their appropriate content
  var temp = weather.main.temp
  var wind = weather.wind.speed
  var humidity = weather.main.humidity
  var todaysDate = moment(weather.dt_txt).format("M/D/YY")

  var cardBodyEl = todaysWeatherEl.find(".card-body")
  cardBodyEl.empty()
  cardBodyEl.append(`<h2>${city} (${todaysDate}) <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" /></h2>`)
  cardBodyEl.append(`<p>Temp: ${temp}°F</p>`)
  cardBodyEl.append(`<p>Wind: ${wind} MPH</p>`)
  cardBodyEl.append(`<p>Humidity: ${humidity} %</p>`)
}

// Function to display a FORECAST card given an object (from our renderForecast function) from open weather api
// daily forecast.
function renderForecastCard(forecast) {

    if(moment(forecast.dt_txt).hour() !== 12) {
        return
    }

    var card = $(`<div class="card text-white bg-dark" style="max-width: 15%"><div class="card-body"></div></div>`)
    var cardBodyEl = card.find(".card-body")

    var temp = forecast.main.temp
    var wind = forecast.wind.speed
    var humidity = forecast.main.humidity
    var todaysDate = moment(forecast.dt_txt).format("M/D/YY")
  
    cardBodyEl.append(`<h3>${todaysDate}</h3>`)
    cardBodyEl.append(`<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />`)
    cardBodyEl.append(`<p>Temp: ${temp}°F</p>`)
    cardBodyEl.append(`<p>Wind: ${wind} MPH</p>`)
    cardBodyEl.append(`<p>Humidity: ${humidity} %</p>`)

    weeklyForecastEl.append(card)

  // variables for data from api
  // temp, windspeed, etc.
  // Create elements for a card
  // append
  // Add content to elements
  // append to forecast section
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast) {
    weeklyForecastEl.empty()
  for (var i = 0; i < dailyForecast.length; i++) {
    // send the data to our renderForecast function as an argument
    renderForecastCard(dailyForecast[i]);
  }
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.list[0]);
  renderForecast(data.list);
}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
function fetchWeather(location) {

  // api url
  var requestURL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.longi}&appid=${APIKey}&units=imperial`

  // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => renderItems(location.name, data));
}

function fetchCoords(search) {

  // api url
  var requestURL =
  `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${APIKey}`

  // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => fetchWeather(data[0]));

  // variable for you api url
  // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)
}

function handleSearchHistoryClick(e) {
  // grab whatever city is is they clicked
  fetchCoords(search);
}

initSearchHistory();
// click event to run the handleFormSubmit
// click event to run the handleSearchHistoryClick

$("#city-search-button").click(function() {

    // Don't continue if there is nothing in the search form
    if (!searchInput.val()) {
        return;
    }

    var search = searchInput.val().trim();
    fetchCoords(search);
    searchInput.value = "";
})
