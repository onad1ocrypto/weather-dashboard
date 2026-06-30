const apiKey = '88d9cdfa4c038ceea17b41cff04c45b4'; 

function updateTime() {
    document.getElementById('datetime').innerText = new Date().toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

function handleEnter(event) { if (event.key === "Enter") getWeather(); }

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name!");
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temp').innerText = `Temp: ${data.main.temp}°C`;
            document.getElementById('desc').innerText = data.weather[0].description;
            
            const iconCode = data.weather[0].icon;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weatherIcon').style.display = "block";

            // Deteksi Tema
            const body = document.body;
            body.className = ''; // Reset class
            if (iconCode.includes('n')) body.classList.add('night');
            else if (data.weather[0].main.includes('Rain')) body.classList.add('rainy');
            else if (data.weather[0].main.includes('Clear')) body.classList.add('sunny');
            else body.classList.add('default');
        })
        .catch(err => alert("City not found!"));
}
