//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getCitybyCoords, getWeather, getWeatherUsingCoords} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails} from './populateDOM.js'
import {manageError, addListeners, hideLoader, showLoader} from './helperFunctions.js'

export {displayWeatherByHours, displayWeatherByDays}
console.log('Hello World');

let unitGroup = localStorage.getItem('unitGroup') || 'imperial';

export function getUnitGroup() {
    return unitGroup;
}

export function setUnitGroup(newUnitGroup) {
    unitGroup = newUnitGroup;
}

(async () => {
    showLoader();
  
    const mostRecent = localStorage.getItem('mostRecent');
    if (mostRecent) {
      try {
        const { name, lat, lon } = JSON.parse(mostRecent);
        const weather = await getWeatherUsingCoords(lat, lon, name);
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        addListeners();
        mainCardImageAndOtherStylesManager(
          weather.currentConditions.conditions,
          weather.currentConditions.datetime,
          weather.currentConditions.sunrise,
          weather.currentConditions.sunset
        );
        hideLoader();
        return;
      } catch (error) {
        console.warn('Failed to load mostRecent data. Falling back to geolocation.', error);
      }
    }
  
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      console.log('Geolocation successful:', position);
  
      const { latitude, longitude } = position.coords;
      const location = await getCitybyCoords(latitude, longitude);
      const locationName = `${location[0].city}, ${location[0].country}`;
  
      // Save mostRecent
      localStorage.setItem(
        'mostRecent',
        JSON.stringify({ name: locationName, lat: latitude, lon: longitude })
      );
  
      const weather = await getWeatherUsingCoords(latitude, longitude, locationName);
      displayBasicDetails(weather);
      displayWeatherByHours(weather);
      displayWeatherByDays(weather);
      addListeners();
      mainCardImageAndOtherStylesManager(
        weather.currentConditions.conditions,
        weather.currentConditions.datetime,
        weather.currentConditions.sunrise,
        weather.currentConditions.sunset
      );
      hideLoader();
    } catch (error) {
      console.warn('Geolocation failed or permission denied:', error);
  
      const weather = await getWeather('Paris');
      weather.resolvedAddress = 'Paris, France';
  
      // Save fallback as mostRecent
      localStorage.setItem(
        'mostRecent',
        JSON.stringify({ name: 'Paris, France', lat: weather.latitude, lon: weather.longitude })
      );
  
      displayBasicDetails(weather);
      displayWeatherByHours(weather);
      displayWeatherByDays(weather);
      mainCardImageAndOtherStylesManager(
        weather.currentConditions.conditions,
        weather.currentConditions.datetime,
        weather.currentConditions.sunrise,
        weather.currentConditions.sunset
      );
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
