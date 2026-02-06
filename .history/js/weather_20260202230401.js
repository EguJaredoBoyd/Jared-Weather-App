//My API key 56d08a907c0260865bb8f620502bfcbf
const WEATHER_API_KEY = "56d08a907c0260865bb8f620502bfcbf";

//Target my button and search input for city
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Create function to ask for weather app
async function fetchWeather(city) {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`,
    );

    const apiData = await apiResponse.json();
    console.log(apiData);
    console.log(apiData.list[0].main.temp);
    console.log(apiData.list[0][0].description);
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
