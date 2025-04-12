//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getCitybyCoords, getWeatherUsingCoords, getAQI} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails, displayAQIDetails} from './populateDOM.js'
import {addListeners, hideLoader, showLoader, displayAllDetails, getCurrentTime} from './helperFunctions.js'

export {displayWeatherByHours, displayWeatherByDays}

if (!localStorage.getItem('unitGroup')) {
  localStorage.setItem('unitGroup', 'imperial');
}

(async () => {
    showLoader();
  
    const mostRecent = localStorage.getItem('mostRecent');
    if (mostRecent) {
      try {
        const { name, lat, lon } = JSON.parse(mostRecent);
        const weather = await getWeatherUsingCoords(lat, lon, name);
        const aqi = await getAQI(lat, lon);
        displayBasicDetails(weather);
        displayAQIDetails(aqi.overall_aqi)
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        addListeners();
        mainCardImageAndOtherStylesManager(
          weather.currentConditions.conditions,
          getCurrentTime(weather.timezone),
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
  
      const { latitude, longitude } = position.coords;
      const location = await getCitybyCoords(latitude, longitude);
      const locationName = `${location[0].city}, ${location[0].country}`;
  
      // Save mostRecent
      localStorage.setItem(
        'mostRecent',
        JSON.stringify({ name: locationName, lat: latitude, lon: longitude })
      );
  
      const weather = await getWeatherUsingCoords(latitude, longitude, locationName);
      const aqi = await getAQI(latitude, longitude);
      displayAllDetails(weather, aqi)
    } catch (error) {
      console.warn('Geolocation failed or permission denied:', error);
  
      const weather = await getWeatherUsingCoords('48.8572', '2.34141', 'Paris, France');
      const aqi = await getAQI(weather.latitude, weather.longitude);
  
      // Save fallback as mostRecent
      localStorage.setItem(
        'mostRecent',
        JSON.stringify({ name: 'Paris, France', lat: weather.latitude, lon: weather.longitude })
      );
  
      displayAllDetails(weather, aqi)
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
