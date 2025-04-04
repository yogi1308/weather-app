//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getWeather} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails, updateTimeDisplay} from './populateDOM.js'
console.log('Hello World');

(async () => {
    await displayBasicDetails();
    await displayWeatherByHours();
    await displayWeatherByDays();
    
    // Once all functions are done, call mainCardImageAndOtherStylesManager
    const weather = await getWeather();
    mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
})();

async function displayWeatherByHours() {
    const now = new Date();
    let weather = await getWeather()
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

async function displayWeatherByDays() {
    let weather = await getWeather()
    for (let i = 1; i < 15; i++) { 
        displayDays(weather.days[i])
    }
}
