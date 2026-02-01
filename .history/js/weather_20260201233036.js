//My API key 56d08a907c0260865bb8f620502bfcbf
const WEATHER_API_KEY = "56d08a907c0260865bb8f620502bfcbf";

//Target my button and search input for city
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Create function to ask for weather app
async function fetchWeather(city) {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}`,
    );

    console.log(apiResponse);
  } catch (error) {
    console.error(error.message);
  }
}

//Search for city
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();

  fetchWeather(city);
});
