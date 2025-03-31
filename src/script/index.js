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
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    childDiv.textContent = text
}
