const API_Key = '32255758bc4c69c59bfae3102872384c';
const limit = 6;
const input = document.getElementById('input');

// Listener for input, to get current location if value is empty
input.addEventListener('input', () => {
    const inputValue = input.value.trim();
    if (inputValue === '') {
        getCurrentLocation();
    }
});

// Using geolocation api, to get current location
function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_Key}`;
        fetchWeatherData(lat, lon);
        fetchForecastData(lat, lon);
    }, function (error) {
        console.error("Fehler beim Abrufen des Standorts:", error);
    });
}


// Fetches the data from api
async function fetchWeatherData(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        // Get specific data from response
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperature = data.main.temp;
        const roundedTemperature = Math.round(temperature);
        const weather = data.weather[0].main;
        const city = data.name;
        const country = data.sys.country
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        document.getElementById('container').innerHTML = showDetailCard(iconUrl, roundedTemperature, weather, city, country, windSpeed, humidity, pressure);
        updateBackgroundImage(weather);
        updateDateTime();

    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:",)
    }
}

// This function fetches the forecast data and displays the cards for 5 days 
async function fetchForecastData(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        const forecastContainer = document.getElementById('forecastContainer');
        const dailyForecasts = data.list.filter((forecast) =>     // Gets filtered by daytime(3 p.m.)
            forecast.dt_txt.includes('15:00:00')
        );
        dailyForecasts.shift();    // Current date exclude
        forecastContainer.innerHTML = '';
        dailyForecasts.forEach((forecast) => {   //Generates cards for next 4 days
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            const date = new Date(forecast.dt * 1000);
            const options = { weekday: 'long' };
            const dayName = date.toLocaleDateString('en-EN', options);
            const temperature = Math.round(forecast.main.temp);
            forecastContainer.innerHTML += showForecastCards(dayName, iconUrl, temperature);
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Vorhersagedaten:", error);
    }
}

/**********************  Function to fetch weather data by city name in search input ********************/
async function searchForLocation() {
    const inputValue = document.getElementById('input').value.trim();
    if (!inputValue) {// Prevent empty searches
        getCurrentLocation();
    } 
    // API URLs for current weather and forecast
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_Key}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${API_Key}&units=metric`;
    try {
        // Fetch both data concurrently
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);
        // Check for errors
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error(`Error fetching data: Current Weather: ${currentWeatherResponse.status}, Forecast: ${forecastResponse.status}`);
        }
        // Parse JSON responses
        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        // Extract latitude and longitude from current weather data
        const lat = currentWeatherData.coord.lat;
        const lon = currentWeatherData.coord.lon;
        // Process and display current weather
        fetchWeatherData(lat, lon);
        // Process and display forecast
        fetchForecastData(lat, lon);
    } catch (error) {
        console.error('Error fetching weather or forecast data:', error);
    }
}

/**********************  End of search location funtion   ***********************************************/
// Updates the background image of webpage by current weather
function updateBackgroundImage(weatherCondition) {
    const div = document.getElementById('main');
    switch (weatherCondition) {
        case 'Clear':
            div.style.backgroundImage = 'url(img/sunny.jpg)';
            break;
        case 'Rain':
            div.style.backgroundImage = 'url(img/rainy.jpg)';
            break;
        case 'Clouds':
            div.style.backgroundImage = 'url(img/cloudy.jpg)';
            break;
        case 'Snow':
            div.style.backgroundImage = 'url(img/snowy.jpg)';
            break;
        case 'Thunderstorm':
            div.style.backgroundImage = 'url(img/lightning.jpg)';
            break;
        case 'Mist':
        case 'Fog':
            div.style.backgroundImage = 'url(img/foggy.jpg)';
            break;
        default:
            div.style.backgroundImage = "url('img/default.jpg')";
            break;
    }
}





