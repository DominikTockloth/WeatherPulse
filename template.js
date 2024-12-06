function showDetailCard(iconUrl, temperature, weather, city, country, windSpeed, humidity, pressure) {
    return `
       <div class="card-content">
                <div class="temperature"><img id="weatherIcon" src="${iconUrl}"><span class="temp">${temperature} &deg;C</span></div>
                <span class="city">${city}, ${country}</span>
                <div class="date-time"><span>Freitag 06.12.2024 </span> <span>8:45 Uhr</span></div>
                <div class="wind-humidity">
                    <div class="blue"><span class="fs-20">Wind speed</span><span class="fs-17">${windSpeed} km/h</span></div>
                    <div class="green"><span class="fs-20">Luftdruck</span><span class="fs-17">${humidity} </span></div>
                </div>
                <div class="index"><span class="fs-20">Luftdruck</span> <span class="fs-20"> ${pressure} hPa</span></div>
                <div class="weather">${weather}, Overcast</div>
            </div>
    `;
}