window.addEventListener('load', () => {
    const body = document.body;

    const hours = new Date().getHours();
    let weatherClass = '';

    if (hours >= 6 && hours < 12) {
        weatherClass = 'sunny';
    } else if (hours >= 12 && hours < 18) {
        weatherClass = 'cloudy';
    } else if (hours >= 18 && hours < 21) {
        weatherClass = 'sunset';
    } else if (hours >= 21 || hours < 6) {
        weatherClass = 'moonlit';
    }

    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather', weatherClass);
    body.appendChild(weatherDiv);
});
