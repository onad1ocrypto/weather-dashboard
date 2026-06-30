const apiKey = '88d9cdfa4c038ceea17b41cff04c45b4'; 

// Fungsi jam realtime
function updateTime() {
    const now = new Date();
    document.getElementById('datetime').innerText = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime(); 

// Fungsi ambil cuaca
function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name!");
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temp').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('desc').innerText = `Condition: ${data.weather[0].description}`;
        })
        .catch(error => alert(error.message));
}