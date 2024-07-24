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
                .then(response => response.json())
                .then(data => {
                    const weatherId = data.weather[0].id;
                    let weatherClass = '';

                    if (weatherId >= 200 && weatherId < 300) {
                        weatherClass = 'rainy';
                    } else if (weatherId >= 300 && weatherId < 600) {
                        weatherClass = 'rainy';
                    } else if (weatherId >= 600 && weatherId < 700) {
                        weatherClass = 'snowy';
                    } else if (weatherId >= 700 && weatherId < 800) {
                        weatherClass = 'cloudy';
                    } else if (weatherId === 800) {
                        const hours = new Date().getHours();
                        if (hours >= 6 && hours < 18) {
                            weatherClass = 'sunny';
                        } else {
                            weatherClass = 'moonlit';
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
                });
        });
    }

    let isDragging = false;
    let startX, startY;
    let currentX = 20, currentY = -20;

    const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        cube.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    };

    const onMouseUp = () => {
        isDragging = false;
        cube.style.cursor = 'grab';
    };

    cube.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
