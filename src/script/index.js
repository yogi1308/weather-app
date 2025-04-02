import '../styles/styles.css';
import {getWeather} from './api.js'
console.log('Hello World');

getWeather()
displayBasicDetails()
displayWeatherByHours()
// document.querySelector('button').addEventListener('click', getWeather)


async function displayBasicDetails() {
    const basicDetailsDiv = document.querySelector('.basic-weather-details')
    let weather = await getWeather()
    console.log(weather);
    appendElements('.weather-description', weather.currentConditions.conditions)
    appendElements('.location', weather.resolvedAddress)
    appendElements('.temp', weather.currentConditions.temp + '°F')
    appendElements('.date', weather.days[0].datetime.split('-').reverse().join(' / '));
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

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    childDiv.innerHTML = text
}

function displayHours() {
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
    time.textContent = '12:00 AM'
    temp.textContent = '72°F'
    hourWeatherDescription.textContent = 'Partially Cloudy'
    precipitationProb.textContent = '0%'
    windSpeed.textContent = '0 mph'
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

function displayDays() {
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
    time.textContent = '12:00 AM'
    temp.textContent = '72°F'
    hourWeatherDescription.textContent = 'Partially Cloudy'
    precipitationProb.textContent = '0%'
    windSpeed.textContent = '0 mph'
    icon.src = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/icons/clear-day.png'
    hourWeather.appendChild(time)
    hourWeather.appendChild(temp)
    hourWeather.appendChild(icon)
    hourWeather.appendChild(hourWeatherDescription)
    hourWeather.appendChild(precipitationProb)
    hourWeather.appendChild(windSpeed)
    const hourlyWeatherDiv = document.querySelector('.by-days')
    hourlyWeatherDiv.appendChild(hourWeather)
}

async function displayWeatherByHours() {
    const hourlyWeatherDiv = document.querySelector('.hourly-weather')
    let weather = await getWeather()
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



    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
    displayDays()
}
