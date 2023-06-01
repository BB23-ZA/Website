// Define API key for OpenWeatherMap
const apiKey = "603748b18388a14bca4446e9fb2e9f0d";

// Get references to DOM elements
const locationInput = document.getElementById("location");
const weatherDiv = document.getElementById("weather");

// Function to get weather data from OpenWeatherMap API
function getWeather() {
	// Remove the button after click
  document.querySelector('button').remove();
  
  const location = locationInput.value.trim();
  
  // Validate the location input
  if (location.length === 0) {
    alert("Please enter a location");
    return;
  }

  // Construct the API URL for the weather data
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  // Fetch weather data from OpenWeatherMap API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display weather data in HTML
      const weatherHtml = `
        <h2>${data.name}</h2>
        <p>Current temperature: ${Math.round(data.main.temp - 273.15)}&deg;C</p>
        <p>Weather description: ${data.weather[0].description}</p>
      `;
      weatherDiv.innerHTML = weatherHtml;
    })
    .catch(error => {
      console.error("Unable to get weather data", error);
      weatherDiv.innerHTML = "<p>Unable to get weather data</p>";
    });
}

// Add event listener for location input to show autocomplete options
locationInput.addEventListener("input", function() {
  const location = this.value.trim();
  if (location.length === 0) {
    return;
  }

  // Construct the API URL for the location search
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;

  // Fetch location data from OpenWeatherMap API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display autocomplete options in HTML
      const optionsHtml = data.map(loc => `
        <div class="option" onclick="selectOption('${loc.name}')">
          ${loc.name}, ${loc.country}
        </div>
      `).join("");
      this.nextElementSibling.innerHTML = optionsHtml;
    })
    .catch(error => {
      console.error("Unable to get location data", error);
    });
});

// Function to select an autocomplete option and fill in the location input
function selectOption(option) {
  locationInput.value = option;
  locationInput.nextElementSibling.innerHTML = "";
}