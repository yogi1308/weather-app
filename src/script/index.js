import '../styles/styles.css';
import {getWeather} from './api.js'
import {displayHours, displayDays, displayBasicDetails} from './populateDOM.js'
console.log('Hello World');

(() => {
    displayBasicDetails();
    displayWeatherByHours();
    displayWeatherByDays();
})();

async function displayWeatherByHours() {
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
    displayHours()
}

async function displayWeatherByDays() {
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
}
