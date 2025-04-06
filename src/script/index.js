//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getCitybyCoords, getWeather, getWeatherUsingCoords} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails} from './populateDOM.js'
import {manageError, addListeners, hideLoader, showLoader} from './helperFunctions.js'

export {displayWeatherByHours, displayWeatherByDays}
console.log('Hello World');

(async () => {
    showLoader()
    try {
        console.log('Hello World');

        // Attempt to get the user's current position
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        console.log('Geolocation successful:', position);

        // Extract latitude and longitude
        const { latitude, longitude } = position.coords;

        // Fetch weather using the obtained coordinates
        const location = await getCitybyCoords(latitude, longitude);
        const locationName = `${location[0].city}, ${location[0].country}`;
        const weather = await getWeatherUsingCoords(latitude, longitude, locationName);

        // Display weather details
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        addListeners();
        mainCardImageAndOtherStylesManager(weather.currentConditions.conditions)
        hideLoader()
    } catch (error) {
        console.warn('Geolocation failed or permission denied:', error);

        // Fetch weather for Paris
        const weather = await getWeather('Paris');
        weather.resolvedAddress = 'Paris, France';

        // Display weather details for Paris
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
        addListeners();
        hideLoader();
    }
})();



function displayWeatherByHours(weather) {
    const now = new Date();
    const currentHour = now.getHours();
    document.querySelector('.by-hours').innerHTML = '';

    for (let i = 1; i <= 24; i++) { 
        // Calculate the overall hour index starting from current hour.
        const overallHour = currentHour + i;
        // Determine which day to use: 0 for today, 1 for tomorrow, etc.
        const dayIndex = Math.floor(overallHour / 24);
        // Get the hour index for the day (0-23).
        const hourIndex = overallHour % 24;
        displayHours(weather.days[dayIndex].hours[hourIndex])
    }
}

function displayWeatherByDays(weather) {
  document.querySelector('.by-days').innerHTML = '';
    for (let i = 1; i < 15; i++) { 
        displayDays(weather.days[i])
    }
}
