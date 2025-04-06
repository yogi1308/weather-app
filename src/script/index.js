//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getWeather} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails} from './populateDOM.js'
import {manageError, addListeners} from './helperFunctions.js'

export {displayWeatherByHours, displayWeatherByDays}
console.log('Hello World');

(async () => {
    try {
        console.log('Hello World');
        let weather = await getWeather('Tempe')
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
        addListeners();
    }
    catch (error) {
        console.log(error)
        manageError() 
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
