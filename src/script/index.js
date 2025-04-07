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
    document.querySelector('.by-hours').innerHTML = '';
  
    let hoursShown = 0;
  
    for (let i = 0; i < weather.days.length; i++) {
      const day = weather.days[i];
  
      for (let j = 0; j < day.hours.length; j++) {
        const hourData = day.hours[j];
        const currentEpoch = Math.floor(Date.now() / 1000);
  
        // Only include future hours (from the current time onwards)
        if (hourData.datetimeEpoch >= currentEpoch) {
          displayHours(hourData);
          hoursShown++;
  
          if (hoursShown === 24) return; // or change to 48 if needed
        }
      }
    }
  }
  
function displayWeatherByDays(weather) {
  document.querySelector('.by-days').innerHTML = '';
    for (let i = 1; i < 15; i++) { 
        displayDays(weather.days[i])
    }
}
