//My API key 56d08a907c0260865bb8f620502bfcbf
const WEATHER_API_KEY = "56d08a907c0260865bb8f620502bfcbf";

//Target my button and search input for city
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Target The innerHTMLs for manipulation
const cityName = document.querySelector(".city-name");
const countryName = document.getElementById("country-name");

//Create function to ask for weather app
async function fetchWeather(city) {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`,
    );

    const apiData = await apiResponse.json();
    console.log(apiData);

    //Get the API the weather API endpoints
    const city = apiData.city;
    const country = apiData.country;
    const weatherDataDisplay = apiData.list[0];

    const cityDate = apiData.list[0];

    //Display the country in UI
    cityName.textContent = `${city}`;
    console.log(city.name);
    console.log(city.country);

    //Display the date of the city
    const currentDateTime = cityDate.dt * 1000;
    const date = new Date(currentDateTime);
    const timeZone = apiData.city.timezone * 1000;
    const localDate = Date.now();

    console.log(
      date.toLocaleDateString("en-GB", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    );

    console.log(localDate.toLocaleString("en-GB"));

    console.log(apiData.list[0].main.temp);
    console.log(apiData.list[0].weather[0].description);
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
