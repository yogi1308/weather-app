import {format, parseISO} from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz';
import thermometerIcon from '../assets/icons/thermometer-icon.svg';
import windIcon from '../assets/icons/wind-icon.svg';
import precipitationProbIcon from '../assets/icons/precipitation-probability-icon.svg';
import weatherAlertIcon from '../assets/icons/weather-alert.svg';
import {getWindDirection, appendElements, createAddClassAddTextAppend, getDateTime} from './helperFunctions.js'
import {getWeather} from './api.js'
import {iconsManager, mainCardImageAndOtherStylesManager} from './assets-manager.js'

export {displayHours, displayDays, displayBasicDetails, updateTimeDisplay}

function updateTimeDisplay(timezone) {
    const formattedTime = formatInTimeZone(new Date(), timezone, 'hh:mm:ss a');
    document.querySelector('.time').innerHTML = '&nbsp;' + formattedTime;
}

function displayBasicDetails(weather) {
    let timezone = weather.timezone
    console.log(weather);
    appendElements('.weather-condition', weather.currentConditions.conditions)
    appendElements('.weather-desc', weather.description)
    appendElements('.location', weather.resolvedAddress)
    appendElements('.temp', weather.currentConditions.temp + '°F')
    appendElements('.date', format(getDateTime(), 'EEEE, MMMM d, yyyy') + ', ');
    appendElements('.max', weather.days[0].feelslikemax + '°F')
    appendElements('.min', weather.days[0].feelslikemin + '°F')
    appendElements('.feels-like', 'Feels like ' + weather.currentConditions.feelslike + '°F')
    appendElements('.humidity', 'Humidity')
    appendElements('.humidity-value', + weather.currentConditions.humidity + '%');
    appendElements('.wind', 'Wind');
    appendElements('.wind-value', `${weather.currentConditions.windspeed} mph ${getWindDirection(weather.currentConditions.winddir)}`);
    appendElements('.sunrise', 'Sunrise')
    appendElements('.sunrise-value', weather.currentConditions.sunrise)
    appendElements('.sunset', 'Sunset')
    appendElements('.sunset-value', weather.currentConditions.sunset)
    appendElements('.uv-index', 'UV-Index')
    appendElements('.uv-index-value', weather.currentConditions.uvindex)
    appendElements('.precipitation-chances', 'Precipitation')
    appendElements('.precipitation-chances-value', weather.currentConditions.precipprob + '%')
    if (weather.alerts[0]) {appendElements('.alert', `<span><img src="${weatherAlertIcon}" alt="Alert: "></span>` + weather.alerts[0].event)}
    setInterval(() => updateTimeDisplay(timezone), 1000);
}

function displayHours(weather) {
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
    createAddClassAddTextAppend('div', 'hour-temp', `<span><img src="${thermometerIcon}" alt=""></span>${weather.temp}°F`, hourWeather);
    createAddClassAddTextAppend('div', 'hour-precip-prob', `<span><img src="${precipitationProbIcon}" alt=""></span>${weather.precipprob}%`, hourWeather);
    createAddClassAddTextAppend('div', 'hour-wind-speed', `<span><img src="${windIcon}" alt=""></span>${weather.windspeed} mph ${getWindDirection(weather.winddir)}`, hourWeather);

    document.querySelector('.by-hours').appendChild(hourWeather);
}

function displayDays(weather) {
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

    createAddClassAddTextAppend('div', 'day-avg-temp', `<span><img src="${thermometerIcon}" alt=""></span>${weather.temp}°F`, dayTemp);
    createAddClassAddTextAppend('div', 'day-high-temp', `<span></span><div class="hi">Hi</div></span>${weather.tempmax}°F`, dayTemp);
    createAddClassAddTextAppend('div', 'day-low-temp', `<span></span><div class="lo">Lo</div></span>${weather.tempmin}°F`, dayTemp);

    dayWeather.appendChild(dayTemp);

    // Creating wind and precipitation elements
    const windAndRain = document.createElement('div');
    windAndRain.classList.add('wind-and-rain');

    createAddClassAddTextAppend('div', 'day-precip-prob', `<span><img src="${precipitationProbIcon}" alt=""></span>${weather.precipprob}%`, windAndRain);
    createAddClassAddTextAppend('div', 'day-wind-speed', `<span><img src="${windIcon}" alt="weather-icon"></span><span>${weather.windspeed} mph ${getWindDirection(weather.winddir)}</span>`, windAndRain);

    dayWeather.appendChild(windAndRain);

    // Appending the complete dayWeather to the container
    document.querySelector('.by-days').appendChild(dayWeather);
}
