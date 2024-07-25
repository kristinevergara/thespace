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
                    let timeOfDayMessage = '';

                    if (hours >= 6 && hours < 12) {
                        timeOfDayMessage = 'Good Morning';
                    } else if (hours >= 12 && hours < 18) {
                        timeOfDayMessage = 'Good Afternoon';
                    } else if (hours >= 18 && hours < 21) {
                        timeOfDayMessage = 'Good Evening';
                    } else {
                        timeOfDayMessage = 'Good Night';
                    }

                    welcomeMessage.innerHTML = `${timeOfDayMessage}, Welcome to The Space`;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });
    }

    let isDragging = false;
    let startX, startY;
    let rotateX = 0, rotateY = 0;

    const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        startX = e.clientX;
        startY = e.clientY;
    };

    const onMouseUp = () => {
        isDragging = false;
        cube.style.cursor = 'grab';
    };

    cube.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Update time in California
    function updateRainbowArch() {
        const now = new Date();
        const californiaOffset = -7; // California Time Offset (PDT or PST)
        const californiaTime = new Date(now.getTime() + (californiaOffset * 60 * 60 * 1000));

        const hours = californiaTime.getHours().toString().padStart(2, '0');
        const minutes = californiaTime.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        const rainbowArch = document.querySelector('.rainbow-arch');
        rainbowArch.innerHTML = `<div class="time-display">${timeString}</div>`;
    }

    updateRainbowArch();
    setInterval(updateRainbowArch, 60000); // Update every minute
});
