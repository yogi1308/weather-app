//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getWeather} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails, updateTimeDisplay} from './populateDOM.js'
console.log('Hello World');

(async () => {
    let weather = await getWeather()
    displayBasicDetails(weather);
    displayWeatherByHours(weather);
    displayWeatherByDays(weather);
    mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
})();

function displayWeatherByHours(weather) {
    const now = new Date();
    const currentHour = now.getHours();

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
    for (let i = 1; i < 15; i++) { 
        displayDays(weather.days[i])
    }
}
