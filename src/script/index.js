//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getWeather, getCitiesSuggestion} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails, updateTimeDisplay} from './populateDOM.js'
import {manageError, displayCitySuggestions} from './helperFunctions.js'
console.log('Hello World');

(async () => {
  // Wrapper function to handle input and call getCitiesSuggestion
  window.getCitiesSuggestion = async function (query) {
    if (query.length > 2) { // Fetch suggestions only if input length > 2
        const suggestions = await getCitiesSuggestion(query);
        displayCitySuggestions(suggestions);
    } else {
        // clearCitySuggestions();
    }
  };
    try {
        let weather = await getWeather()
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
    }
    catch (error) {
      manageError();
    }    
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
