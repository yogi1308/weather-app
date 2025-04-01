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
    appendElements('.humidity', 'Humidity ' + weather.currentConditions.humidity + '%')
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    childDiv.textContent = text
}
