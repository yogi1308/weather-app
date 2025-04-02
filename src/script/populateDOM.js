import {format, parseISO} from 'date-fns'
import {getWindDirection, appendElements} from './helperFunctions.js'
import {getWeather} from './api.js'

export {displayHours, displayDays, displayBasicDetails, updateTimeDisplay}

const now = new Date();

function updateTimeDisplay() {
    const now = new Date();
    const formattedTime = format(now, 'hh:mm:ss a'); // e.g., "12:00:00 AM"
    document.querySelector('.time').innerHTML = '&nbsp' + formattedTime;
}

async function displayBasicDetails() {
    let weather = await getWeather()
    console.log(weather);
    appendElements('.weather-description', weather.currentConditions.conditions)
    appendElements('.location', weather.resolvedAddress)
    appendElements('.temp', weather.currentConditions.temp + '°F')
    appendElements('.date', format(now, 'EEEE, MMMM d, yyyy') + ', ');
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
}

function displayHours(weather) {
    const hourWeather = document.createElement('div')
    hourWeather.classList.add('hour-weather')
    const time = document.createElement('div')
    time.classList.add('hour-time')
    const temp = document.createElement('div')
    temp.classList.add('hour-temp')
    const hourWeatherDescription = document.createElement('div')
    hourWeatherDescription.classList.add('hour-weather-desc')
    const precipitationProb = document.createElement('div')
    precipitationProb.classList.add('hour-precip-prob')
    const windSpeed = document.createElement('div')
    windSpeed.classList.add('hour-wind-speed')
    const icon = document.createElement('img')
    time.textContent = `${(parseInt(weather.datetime.split(':')[0]) % 12 || 12)}:00 ${parseInt(weather.datetime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`;
    temp.textContent = weather.temp + '°F'
    hourWeatherDescription.textContent = weather.conditions
    precipitationProb.textContent = weather.precipprob + '%'
    windSpeed.textContent = `${weather.windspeed} mph ${getWindDirection(weather.winddir)}`
    icon.src = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/icons/clear-day.png'
    hourWeather.appendChild(time)
    hourWeather.appendChild(temp)
    hourWeather.appendChild(icon)
    hourWeather.appendChild(hourWeatherDescription)
    hourWeather.appendChild(precipitationProb)
    hourWeather.appendChild(windSpeed)
    const hourlyWeatherDiv = document.querySelector('.by-hours')
    hourlyWeatherDiv.appendChild(hourWeather)
}

function displayDays(weather) {
    const dayWeather = document.createElement('div')
    dayWeather.classList.add('day-weather')
    const dayTime = document.createElement('div')
    dayTime.classList.add('day-time')
    const dayDate = document.createElement('div')
    dayDate.classList.add('day-date')
    const dayTemp = document.createElement('div')
    dayTemp.classList.add('day-temp')
    const dayAvgTemp = document.createElement('div')
    dayAvgTemp.classList.add('day-avg-temp')
    const dayHighTemp = document.createElement('div')
    dayHighTemp.classList.add('day-high-temp')
    const dayLowTemp = document.createElement('div')
    dayLowTemp.classList.add('day-low-temp')
    const dayWeatherDescription = document.createElement('div')
    dayWeatherDescription.classList.add('day-weather-desc')
    const dayPrecipitationProb = document.createElement('div')
    dayPrecipitationProb.classList.add('hour-precip-prob')
    const dayWindSpeed = document.createElement('div')
    dayWindSpeed.classList.add('hour-wind-speed')
    const icon = document.createElement('img')
    dayDate.textContent = format(weather.datetime, 'EEEE, MMMM d, yyyy')
    dayAvgTemp.textContent = weather.temp + '°F'
    dayHighTemp.textContent = weather.tempmax + '°F'
    dayLowTemp.textContent = weather.tempmin + '°F'
    dayTime.textContent = format(parseISO(weather.datetime), 'EEEE')
    dayWeatherDescription.textContent = weather.conditions
    dayPrecipitationProb.textContent = weather.precipprob + '%'
    dayWindSpeed.textContent = `${weather.windspeed} mph ${getWindDirection(weather.winddir)}`
    icon.src = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/icons/clear-day.png'
    dayTemp.appendChild(dayAvgTemp)
    dayTemp.appendChild(dayHighTemp)
    dayTemp.appendChild(dayLowTemp)
    dayWeather.appendChild(dayTime)
    dayWeather.appendChild(dayDate)
    dayWeather.appendChild(dayTemp)
    dayWeather.appendChild(icon)
    dayWeather.appendChild(dayWeatherDescription)
    dayWeather.appendChild(dayPrecipitationProb)
    dayWeather.appendChild(dayWindSpeed)
    const hourlyWeatherDiv = document.querySelector('.by-days')
    hourlyWeatherDiv.appendChild(dayWeather)
}