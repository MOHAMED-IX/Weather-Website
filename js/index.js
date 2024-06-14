const search = document.getElementById("search");
const todayWeekDayMarkUp = document.getElementById("todayWeekDayMarkUp");
const todayMonthDayMarkUp = document.getElementById("todayMonthDayMarkUp");
const cityLocation = document.getElementById("cityLocation");
const currentDegree = document.getElementById("currentDegree");
const todayWeatherCondition = document.getElementById("todayWeatherCondition");
const todayWeatherIcon = document.getElementById("todayWeatherIcon");
const humidityToday = document.getElementById("humidityToday");
const windToday = document.getElementById("windToday");
const directionToday = document.getElementById("directionToday");
const tomorrowWeekDayMarkUp = document.getElementById("tomorrowWeekDayMarkUp");
const tomorrowWeatherIcon = document.getElementById("tomorrowWeatherIcon");
const tomorrowDegreeMax = document.getElementById("tomorrowDegreeMax");
const tomorrowDegreeMin = document.getElementById("tomorrowDegreeMin");
const tomorrowWeatherCondition = document.getElementById("tomorrowWeatherCondition");
const afterTomorrowWeekDayMarkUp = document.getElementById("afterTomorrowWeekDayMarkUp");
const afterTomorrowWeatherIcon = document.getElementById("afterTomorrowWeatherIcon");
const afterTomorrowDegreeMax = document.getElementById("afterTomorrowDegreeMax");
const afterTomorrowDegreeMin = document.getElementById("afterTomorrowDegreeMin");
const afterTomorrowWeatherCondition = document.getElementById("afterTomorrowWeatherCondition");


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);
    // console.log(position.coords.latitude, " latitude");
    // console.log(position.coords.longitude, " longitude");
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    getWeatherData(`${lat}, ${lng}`);
  })
}
else {
  console.log("geolocation not supported");
}


async function getWeatherData(query) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1a14dbda11844af891e141544241106&q=${query}&days=3`);
  let data = await response.json();
  // console.log(response);
  console.log(data);
  displayDayWeather(data);
  displayTomorrowWeather(data);
  displayAfterTomorrowWeather(data);
}

search.addEventListener("input", function (e) {
  // console.log(e.target.value);
  getWeatherData(e.target.value);
});

function displayDayWeather(data) {
  // console.log(data , 'from displayDayWeather');
  // console.log(data.current.last_updated);
  const todayDate = data.current.last_updated;
  let date = new Date(todayDate);
  // console.log(date.getDate());
  // console.log(date.getMonth()+1);
  // console.log(date.getFullYear());
  const todayWeekDay = date.toLocaleString(`en-US`, { weekday: 'long' });
  todayWeekDayMarkUp.innerHTML = todayWeekDay;
  // console.log(todayWeekDay , 'todayWeekDay');
  const todayMonthDay = date.getDate();
  const todayMonth = date.toLocaleString(`en-US`, { month: 'long' });
  todayMonthDayMarkUp.innerHTML = `${todayMonthDay} ${todayMonth}`;
  // console.log(todayMonthDay , 'todayMonthDay');
  // console.log(todayMonth , 'todayMonth');
  const cityWeather = data.location.name;
  cityLocation.innerHTML = cityWeather;
  const currentWeatherDegree = data.current.temp_c;
  currentDegree.innerHTML = currentWeatherDegree;
  const todayCondition = data.current.condition.text;
  todayWeatherCondition.innerHTML = todayCondition;
  todayWeatherIcon.setAttribute("src", `https://${data.current.condition.icon}`);
  const humidityTodayText = data.current.humidity;
  humidityToday.innerHTML = `${humidityTodayText}%`;
  const windTodayText = data.current.wind_kph;
  windToday.innerHTML = `${windTodayText}km/h`;
  const directionTodayText = data.current.wind_dir;
  directionToday.innerHTML = directionTodayText;
}

function displayTomorrowWeather({ forecast }) {

  // console.log(forecast);

  tomorrowWeekDayMarkUp.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString(`en-US`, { weekday: 'long' });

  tomorrowWeatherIcon.setAttribute("src", `https://${forecast.forecastday[1].day.condition.icon}`);
  tomorrowDegreeMax.innerHTML = `${forecast.forecastday[1].day.maxtemp_c}°C`;
  tomorrowDegreeMin.innerHTML = `${forecast.forecastday[1].day.mintemp_c}°C`;
  tomorrowWeatherCondition.innerHTML = forecast.forecastday[1].day.condition.text;
}

function displayAfterTomorrowWeather({ forecast }) {
  afterTomorrowWeekDayMarkUp.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString(`en-US`, { weekday: 'long' });

  afterTomorrowWeatherIcon.setAttribute("src", `https://${forecast.forecastday[2].day.condition.icon}`);
  afterTomorrowDegreeMax.innerHTML = `${forecast.forecastday[2].day.maxtemp_c}°C`;
  afterTomorrowDegreeMin.innerHTML = `${forecast.forecastday[2].day.mintemp_c}°C`;
  afterTomorrowWeatherCondition.innerHTML = forecast.forecastday[2].day.condition.text;
}




