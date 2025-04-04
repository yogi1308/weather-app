import clearDayIcon from '../assets/icons/animated/clear-day.svg'
import clearNightIcon from '../assets/icons/animated/clear-day.svg'
import fogIcon from "../assets/icons/animated/fog.svg"
import hailIcon from "../assets/icons/animated/hail.svg"
import cloudyIcon from "../assets/icons/animated/cloudy.svg"
import partlyCloudyDayIcon from "../assets/icons/animated/cloudy-3-day.svg"
import partlyCloudyNightIcon from "../assets/icons/animated/cloudy-3-night.svg"
import rainSnowShowersNightIcon from "../assets/icons/animated/rain-and-snow-mix.svg"
import rainSnowShowersDayIcon from "../assets/icons/animated/rain-and-snow-mix.svg"
import rainIcon from "../assets/icons/animated/rainy-3.svg"
import snowShowersNightIcon from "../assets/icons/animated/snowy-3-night.svg"
import showersDayIcon from "../assets/icons/animated/rainy-3-day.svg"
import showersNightIcon from "../assets/icons/animated/rainy-3-night.svg"
import sleetIcon from "../assets/icons/animated/rain-and-sleet-mix.svg"
import snowIcon from "../assets/icons/animated/snowy-3.svg"
import snowShowersDayIcon from "../assets/icons/animated/snowy-3-day.svg"
import thunderShowersDayIcon from "../assets/icons/animated/isolated-thunderstorms-day.svg"
import thunderShowersNightIcon from "../assets/icons/animated/isolated-thunderstorms-night.svg"
import thunderIcon from "../assets/icons/animated/thunderstorms.svg"
import thunderRainIcon from "../assets/icons/animated/thunderstorms.svg"
import windIcon from "../assets/icons/animated/wind.svg"
import rainSnowIcon from "../assets/icons/animated/rain-and-snow-mix.svg"

import cloudCover from '../assets/weather-images/Cloud_Cover.png'

import {styleSetter} from './helperFunctions.js'

export {iconsManager, mainCardImageAndOtherStylesManager}

const iconsManager = {
    'clear-day' : clearDayIcon, 
    'clear-night' : clearNightIcon,
    'fog' : fogIcon,
    'hail' : hailIcon,
    'cloudy' : cloudyIcon,
    'partly-cloudy-day' : partlyCloudyDayIcon,
    'partly-cloudy-night' : partlyCloudyNightIcon,
    'rain-snow-showers-night' : rainSnowShowersNightIcon,
    'snow-showers-night' : snowShowersNightIcon,
    'rain' : rainIcon,
    'rain-snow-icon' : rainSnowIcon,
    'rain-snow-showers-day' : rainSnowShowersDayIcon,
    'rain-snow-showers-night' : rainSnowShowersNightIcon,
    'snow-showers-night' : rainSnowShowersNightIcon,
    'showers-day' : showersDayIcon,
    'showers-night' : showersNightIcon,
    'sleet' : sleetIcon,
    'snow' : snowIcon,
    'snow-showers-day' : snowShowersDayIcon,
    'thunder-showers-day' : thunderShowersDayIcon,
    'thunder-showers-night' : thunderShowersNightIcon,
    'thunder' : thunderIcon,
    'thunder-rain' : thunderRainIcon,
    'wind' : windIcon
}

function mainCardImageAndOtherStylesManager(condition) {
    switch (condition) {
        case 'Partially cloudy' :
            styleSetter(cloudCover, 'linear-gradient(to bottom, black, gray)', 'rgba(237, 9, 9, 0.25)', 'rgba(250, 6, 6, 0.25)', 'rgb(237, 9, 9)', 'rgb(250, 6, 6)');
            break;

    }
}
