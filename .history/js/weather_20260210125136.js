//My API key 56d08a907c0260865bb8f620502bfcbf
const WEATHER_API_KEY = "56d08a907c0260865bb8f620502bfcbf";

//Target my button and search input for city
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Target The innerHTMLs for manipulation of time elements
const cityName = document.querySelector(".city-name");
const countryName = document.getElementById("country-name");
const dateTime = document.getElementById("date-time");
const currentTime = document.getElementById("current-time");

//Target the innerHTMLs for manipulation of weather elements
const tempMeasure = document.getElementById("temp-measure");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const weatherPressure = document.getElementById("weather-pressure");
const weatherVisibility = document.getElementById("weather-visibility");
const weatherTempMax = document.getElementById("weather-temp-max");
const weatherTempMin = document.getElementById("weather-temp-min");

//Create function to ask for weather app
async function fetchWeather(city) {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`,
    );

    const apiData = await apiResponse.json();
    console.log(apiData);

    //Get the API weather city endpoints
    const countryCity = apiData.city;
    const cityDate = apiData.list[0];

    //Display the country in UI
    cityName.classList.remove("skeleton", "skeleton-text");
    cityName.textContent = `${city},`;
    countryName.textContent = `${countryCity.country}`;

    //Get the API weather date endpoints
    const currentDateTime = cityDate.dt * 1000;
    const date = new Date(currentDateTime);
    const dateToday = date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    //Get time from new date
    function newDateTime() {
      const utcTime = Date.now();
      const timeZone = apiData.city.timezone;
      const cityTime = utcTime + timeZone * 1000;
      const cityDateTime = new Date(cityTime);

      const hours = cityDateTime.getUTCHours();
      const minutes = cityDateTime.getUTCMinutes();
      const seconds = cityDateTime.getUTCSeconds();

      //Display the date in the UI
      dateTime.textContent = `Today, ${dateToday},`;
      currentTime.textContent = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    newDateTime();

    //Function to get weather details
    function getWeatherForcast() {
      const temperature = Math.round(apiData.list[0].main.temp);
      tempMeasure.textContent = `${temperature}`;

      const description = apiData.list[0].weather[0].description;
      weatherDescription.textContent = `${description}`;

      const getIcon = apiData.list[0].weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${getIcon}@2x.png`;
      weatherIcon.alt = `${description}`;

      const getWindSpeed = apiData.list[0].wind.speed;
      const getWindSpeedKMH = Math.round(getWindSpeed * 3.6);
      windSpeed.textContent = `${getWindSpeedKMH} km/h`;

      const getHumidity = apiData.list[0].main.humidity;
      humidity.textContent = `${getHumidity} %`;

      //Swipe Section
      const pressure = apiData.list[0].main.pressure;
      weatherPressure.textContent = `${pressure} hPa`;

      const visibility = apiData.list[0].visibility / 1000;
      weatherVisibility.textContent = `${visibility} km`;

      const tempMax = Math.round(apiData.list[0].main.temp_max);
      weatherTempMax.textContent = `${tempMax}`;

      const tempMin = Math.round(apiData.list[0].main.temp_min);
      weatherTempMin.textContent = `${tempMin}`;
    }

    getWeatherForcast();

    //Update date every minute
    setInterval(() => {
      newDateTime();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
}

//Search for city
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (!city) return;

  fetchWeather(city);
});
