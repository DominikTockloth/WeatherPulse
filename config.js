const API_Key = '32255758bc4c69c59bfae3102872384c';
const limit = 6;

// Geolocation API verwenden, um den aktuellen Standort zu bekommen
navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;  // Breitengrad
    const lon = position.coords.longitude; // Längengrad
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_Key}`;

    fetchWeatherData(lat, lon);
    fetchForecastData(lat, lon);
}, function (error) {
    console.error("Fehler beim Abrufen des Standorts:", error);
});

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
        //Generates cards for next 4 days
        dailyForecasts.forEach((forecast) => {
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
            div.style.backgroundImage = "url('images/default.jpg')";
            break;
    }
}





