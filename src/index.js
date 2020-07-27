
let now = new Date();
let days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();

function formatDate(date) {
  let todayDate = document.querySelector("#date");
  todayDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
}
formatDate(now);

let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes <10) {
  currentMinutes = `0${currentMinutes}`
}

function formatTime(date) {
  let timeNow = document.querySelector("#time");
  timeNow.innerHTML = `${currentHours}:${currentMinutes}`;
}

formatTime(now);

////////

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute(
    "alt", response.data.weather[0].description);
celsiusTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "e97a29dafab1111956594c069c61f40c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function citySearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city");
  search(cityInputElement.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fas fa-seedling"></i>${
    cityInputElement.value
  } Weather<i class="fas fa-seedling"></i>`;
}

function showfahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", citySearch);

let fahrenheitlink=document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showfahrenheitTemp);

let celsiuslink=document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showcelsiusTemp);

search("Toronto");