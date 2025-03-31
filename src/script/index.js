import '../styles/styles.css';
import {getWeather} from './api.js'
console.log('Hello World');

getWeather()
document.querySelector('button').addEventListener('click', getWeather)

