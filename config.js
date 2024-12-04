const API_Key = '32255758bc4c69c59bfae3102872384c';
const limit = 10;


// Geolocation API verwenden, um den aktuellen Standort zu bekommen
navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;  // Breitengrad
    const lon = position.coords.longitude; // Längengrad

    // URL mit den aktuellen Koordinaten
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_Key}`;

    // Die Daten abrufen
    fetchData(url);
    fetchWeatherData(lat, lon);
    fetchForecastData(lat, lon);
}, function (error) {
    console.error("Fehler beim Abrufen des Standorts:", error);
});

// Funktion zum Abrufen der Daten von der API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Erhaltene Daten:", data);
    } catch (error) {
        console.error("Fehler beim Abrufen der API:", error);
    }
}

async function fetchWeatherData(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Wetterdaten:", data);

        // Beispiel: Zugriff auf bestimmte Daten
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        console.log(`Aktuelle Temperatur: ${temperature}°C`);
        console.log(`Wetterbeschreibung: ${weatherDescription}`);

    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:",)
    }
}

async function fetchForecastData(lat, lon) {
    const API_Key = '32255758bc4c69c59bfae3102872384c';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`;

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Vorhersagedaten:", data);

        // Beispiel: Zugriff auf Vorhersagedaten für jeden Tag
        data.list.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000); // Umwandlung von Unix-Zeitstempel
            const temperature = forecast.main.temp;
            const weatherDescription = forecast.weather[0].description;
            console.log(`${date.toLocaleDateString()} - Temperatur: ${temperature}°C, Wetter: ${weatherDescription}`);
        });

    } catch (error) {
        console.error("Fehler beim Abrufen der Vorhersagedaten:", error);
    }
}





