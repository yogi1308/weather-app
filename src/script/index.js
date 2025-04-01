import '../styles/styles.css';
import {getWeather} from './api.js'
console.log('Hello World');

getWeather()
displayBasicDetails()
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
    appendElements('.humidity', 'Humidity: ' + weather.currentConditions.humidity + '%')
    appendElements('.wind', `Wind: ${weather.currentConditions.windspeed} mph ${getWindDirection(weather.currentConditions.winddir)}`);
    appendElements('.sunrise', 'Sunrise: ' + weather.currentConditions.sunrise)
    appendElements('.sunset', 'Sunset: ' + weather.currentConditions.sunset)
    appendElements('.uv-index', 'UV-Index: ' + weather.currentConditions.uvindex)
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    childDiv.textContent = text
}
