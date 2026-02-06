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

    const countryDataDisplay = apiData.city;
    const weatherDataDisplay = apiData.list[0];

    const cityDate = apiData.list[0];

    //Display the country
    console.log(countryDataDisplay.name);
    console.log(countryDataDisplay.country);

    //Display the date of the city
    const currentDateTime = cityDate.dt_txt;
    const date = new Date(currentDateTime * 1000);

    console.log(date.toLocaleDateString);

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
