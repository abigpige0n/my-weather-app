function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fas fa-seedling"></i>${
    searchInput.value
  } Weather<i class="fas fa-seedling"></i>`;
}

let clickSearch = document.querySelector("#search-bar");
clickSearch.addEventListener("submit", searchWeather);

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
let currentMinutes = now.getMinutes();

function formatTime(date) {
  let timeNow = document.querySelector("#time");
  timeNow.innerHTML = `${currentHours}:${currentMinutes}`;
}

formatTime(now);

////////

function showTemp(response) {
  document.querySelector("#search-text-input").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "e97a29dafab1111956594c069c61f40c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", citySearch);
