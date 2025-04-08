import {format, parseISO} from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz';
import thermometerIcon from '../assets/icons/thermometer-icon.svg';
import windIcon from '../assets/icons/wind-icon.svg';
import precipitationProbIcon from '../assets/icons/precipitation-probability-icon.svg';
import {getWindDirection, appendElements, createAddClassAddTextAppend} from './helperFunctions.js'
import {iconsManager, displayAppropriateAQIconAndGetCategory} from './assets-manager.js'
import {checkLikes} from './likeFunctions.js'

export {displayHours, displayDays, displayBasicDetails, updateTimeDisplay, timeIntervalId, displayAQIDetails}

let timeIntervalId;

function updateTimeDisplay(timezone) {
    const formattedTime = formatInTimeZone(new Date(), timezone, 'EEEE, MMMM d, yyyy, hh:mm:ss a');
    document.querySelector('.time').innerHTML = formattedTime;
}

async function displayBasicDetails(weather) {
    let tempUnit = '°F';
    let speedUnit = 'mph';
    if (localStorage.getItem('unitGroup') == 'metric') {tempUnit = '°C'; speedUnit = ' kmph'}
    document.querySelector('.basic-info').style.display = 'block'
    document.querySelector('.hours-days').style.display = 'block'
    if (document.querySelector('div.error-message')) {document.querySelector('div.error-message').remove();}
    if (document.querySelectorAll('.twinkle-star')) {
        document.querySelectorAll('.twinkle-star').forEach(star => {
            star.style.display = 'none';
        });
    }
    let timezone = weather.timezone
    console.log(weather);
    appendElements('.weather-condition', weather.currentConditions.conditions)
    appendElements('.weather-desc', weather.description)
    appendElements('.location', weather.resolvedAddress)
    appendElements('.coordinates', weather.latitude + ', ' + weather.longitude)
    appendElements('.temp', weather.currentConditions.temp + ' '  + tempUnit)
    appendElements('.max', weather.days[0].feelslikemax + ' '  + tempUnit)
    appendElements('.min', weather.days[0].feelslikemin + ' '  + tempUnit)
    appendElements('.feels-like', 'Feels like ' + weather.currentConditions.feelslike + ' '  + tempUnit)
    appendElements('.humidity', 'Humidity')
    appendElements('.humidity-value', + weather.currentConditions.humidity + '%');
    appendElements('.wind', 'Wind');
    appendElements('.wind-value', `${weather.currentConditions.windspeed} ${speedUnit} ${getWindDirection(weather.currentConditions.winddir)}`);
    appendElements('.sunrise', 'Sunrise')
    appendElements('.sunrise-value', weather.currentConditions.sunrise)
    appendElements('.sunset', 'Sunset')
    appendElements('.sunset-value', weather.currentConditions.sunset)
    appendElements('.uv-index', 'UV-Index')
    appendElements('.uv-index-value', weather.currentConditions.uvindex)
    appendElements('.precipitation-chances', 'Precipitation')
    appendElements('.precipitation-chances-value', weather.currentConditions.precipprob + '%')
    if (weather.alerts[0] && weather.alerts[0].description != 'There are currently no active warnings or risks.') {
        document.querySelector('.alert').style.display = 'flex'
        appendElements('.alert', ' ' + weather.alerts[0].event)
    }
    else {document.querySelector('.alert').style.display = 'none'}
    
    // Clear the existing interval if it exists
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
    }

    // Start a new interval to update the time
    timeIntervalId = setInterval(() => updateTimeDisplay(timezone), 1000);

    const [lat, lon] = document.querySelector('.coordinates').textContent.split(', ')
    if (checkLikes(document.querySelector('.location').textContent, lat, lon)) {
        document.querySelector('.favorites').style.display = 'none' 
        document.querySelector('.like-filled-icon').style.display = 'block'
    }

    else if (!checkLikes(document.querySelector('.location').textContent, lat, lon)) {
        document.querySelector('.favorites').style.display = 'block' 
        document.querySelector('.like-filled-icon').style.display = 'none'
    }

}

function displayAQIDetails(aqi) {
    const aqiQualitativeData = displayAppropriateAQIconAndGetCategory(aqi);
    document.querySelector('.aqi-value').innerHTML = `${aqiQualitativeData}: ${aqi}`
}

function displayHours(weather) {
    let tempUnit = '°F';
    let speedUnit = 'mph';
    if (localStorage.getItem('unitGroup') == 'metric') {tempUnit = '°C'; speedUnit = ' kmph'}
    const hourWeather = document.createElement('div');
    hourWeather.classList.add('hour-weather');

    // Format time to 12-hour format with AM/PM
    const [hour] = weather.datetime.split(':');
    const formattedHour = `${(parseInt(hour) % 12 || 12)}:00 ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`;
    createAddClassAddTextAppend('div', 'hour-time', formattedHour, hourWeather);

    // Create and append the weather icon
    const iconDiv = document.createElement('div')
    iconDiv.classList.add('icon-div')
    const icon = document.createElement('img');
    const iconName = weather.icon; // e.g., 'clear-day', 'rain'
    icon.src = iconsManager[iconName] || defaultIcon; // Fallback to a default icon if not found
    icon.alt = iconName;
    icon.classList.add('weather-icon')
    iconDiv.appendChild(icon);
    hourWeather.appendChild(iconDiv)

    createAddClassAddTextAppend('div', 'hour-weather-desc', weather.conditions, hourWeather);
    createAddClassAddTextAppend('div', 'hour-temp', `<span><img src="${thermometerIcon}" alt=""></span>${weather.temp} ${tempUnit}`, hourWeather);
    createAddClassAddTextAppend('div', 'hour-precip-prob', `<span><img src="${precipitationProbIcon}" alt=""></span>${weather.precipprob}%`, hourWeather);
    createAddClassAddTextAppend('div', 'hour-wind-speed', `<span><img src="${windIcon}" alt=""></span>${weather.windspeed} ${speedUnit} ${getWindDirection(weather.winddir)}`, hourWeather);

    document.querySelector('.by-hours').appendChild(hourWeather);
}

function displayDays(weather) {
    let tempUnit = '°F';
    let speedUnit = 'mph';
    if (localStorage.getItem('unitGroup') == 'metric') {tempUnit = '°C'; speedUnit = ' kmph'}
    const dayWeather = document.createElement('div');
    dayWeather.classList.add('day-weather');

    // Using the utility function to create and append elements
    createAddClassAddTextAppend('div', 'day-time', format(parseISO(weather.datetime), 'EEEE'), dayWeather);
    createAddClassAddTextAppend('div', 'day-date', format(parseISO(weather.datetime), 'EEEE, MMMM d, yyyy'), dayWeather);

    // Create and append the weather icon
    const icon = document.createElement('img');
    const iconName = weather.icon; // e.g., 'clear-day', 'rain'
    icon.src = iconsManager[iconName] || defaultIcon; // Fallback to a default icon if not found
    icon.alt = iconName;
    icon.classList.add('weather-icon')
    dayWeather.appendChild(icon);

    createAddClassAddTextAppend('div', 'day-weather-desc', weather.conditions, dayWeather);

    // Creating temperature elements
    const dayTemp = document.createElement('div');
    dayTemp.classList.add('day-temp');

    createAddClassAddTextAppend('div', 'day-avg-temp', `<span><img src="${thermometerIcon}" alt=""></span>${weather.temp} ${tempUnit}`, dayTemp);
    createAddClassAddTextAppend('div', 'day-high-temp', `<div class="hi">Hi</div>${weather.tempmax} ${tempUnit}`, dayTemp);
    createAddClassAddTextAppend('div', 'day-low-temp', `<div class="lo">Lo</div>${weather.tempmin} ${tempUnit}`, dayTemp);

    dayWeather.appendChild(dayTemp);

    // Creating wind and precipitation elements
    const windAndRain = document.createElement('div');
    windAndRain.classList.add('wind-and-rain');

    createAddClassAddTextAppend('div', 'day-precip-prob', `<span><img src="${precipitationProbIcon}" alt=""></span>${weather.precipprob}%`, windAndRain);
    createAddClassAddTextAppend('div', 'day-wind-speed', `<span><img src="${windIcon}" alt="weather-icon"></span><span>${weather.windspeed} ${speedUnit} ${getWindDirection(weather.winddir)}</span>`, windAndRain);

    dayWeather.appendChild(windAndRain);

    // Appending the complete dayWeather to the container
    document.querySelector('.by-days').appendChild(dayWeather);
}
