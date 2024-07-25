window.addEventListener('load', () => {
    const body = document.body;
    const cube = document.querySelector('.cube');
    const welcomeMessage = document.getElementById('welcome-message');

    // Get geolocation and fetch weather
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Use a free weather API like OpenWeatherMap
            const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(weatherApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.weather || !data.weather[0]) {
                        throw new Error('Weather data is not available');
                    }
                    
                    const weatherId = data.weather[0].id;
                    let weatherClass = '';

                    if (weatherId >= 200 && weatherId < 300) {
                        weatherClass = 'rainny';
                    } else if (weatherId >= 300 && weatherId < 600) {
                        weatherClass = 'rainny';
                    } else if (weatherId >= 600 && weatherId < 700) {
                        weatherClass = 'cloudy';
                    } else if (weatherId >= 700 && weatherId < 800) {
                        weatherClass = 'cloudy';
                    } else if (weatherId === 800) {
                        const hours = new Date().getHours();
                        if (hours >= 6 && hours < 18) {
                            weatherClass = 'sun';
                        } else {
                            weatherClass = 'moon';
                        }
                    } else if (weatherId > 800 && weatherId < 900) {
                        weatherClass = 'cloudy';
                    }

                    const weatherDiv = document.createElement('div');
                    weatherDiv.classList.add('weather', weatherClass);
                    body.appendChild(weatherDiv);

                    const hours = new Date().getHours();
