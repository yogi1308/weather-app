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

import defaultBg from '../assets/weather-images/default_bg.jpg'
import cloudCover from '../assets/weather-images/Cloud_Cover.png'
import clearConditionsThroughtTheDay from '../assets/weather-images/clear_conditions_throughout_the_day.png'
import clearingInTheAfternoon from '../assets/weather-images/clearing_in _the_afternoon.png'
import becomingCloudyInTheAfternoon from '../assets/weather-images/becoming_cloudy_in_the_afternoon.png'
import coolingDown from '../assets/weather-images/cooling_down.png'
import dewPoint from '../assets/weather-images/Dew_Point.png'
import morningRain from '../assets/weather-images/morning_rain.png'
import morningRainOrSnow from '../assets/weather-images/morning_rain_or_snow.png'
import nightRain from '../assets/weather-images/night_rain.png'
import nightRainOrSnow from '../assets/weather-images/night_mix_of_rain_and_snow.png'
import morningSnow from '../assets/weather-images/morning_snow.png'
import nightSnow from '../assets/weather-images/night_snow.png'
import storm from '../assets/weather-images/storm.png'
import heavySnow from '../assets/weather-images/heavy_snow.png'
import heavyRain from '../assets/weather-images/heavy_rain.png'
import fog from '../assets/weather-images/fog.png'
import tornado from '../assets/weather-images/tornado.png'
import hail from '../assets/weather-images/hail_showers.png'
import diamondDust from '../assets/weather-images/diamond_dust.png'
import partiallyClouded from '../assets/weather-images/partially_clouded.png'
import dustStorm from '../assets/weather-images/dust_storm.png'
import partiallyCloudedNight from '../assets/weather-images/partially_clouded_night.png'    
import clearNight from '../assets/weather-images/clear_night.png'

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
        case 'Partially cloudy' : // Replace with partiallyClouded - partiallyClouded, partly cloudy throughout the day
            styleSetter(partiallyClouded, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'clear conditions throughout the day' : // Clear
            styleSetter(clearConditionsThroughtTheDay, 'rgba(236, 228, 228, 0.2)', 'rgba(236, 228, 228, 0.2)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'clearing in the afternoon' :
            styleSetter(clearingInTheAfternoon, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Cloud Cover' : // Sky Coverage Decreasing, Sky Coverage Increasing, Overcast
            styleSetter(cloudCover, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'becoming cloudy in the afternoon' :
            styleSetter(becomingCloudyInTheAfternoon, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'cooling down' :
            styleSetter(coolingDown, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Dew Point' :
            styleSetter(dewPoint, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'rain' : // Chance Precipitation (%), Precipitation, Precipitation Cover, a chance of rain throughout the day, morning rain, rain in the morning and afternoon
        // a chance of rain, rain clearing later, a chance of rain, rain, early morning rain, late afternoon rain, afternoon rain
        // Light Freezing Drizzle/Freezing Rain, Light Freezing Rain, Drizzle, Precipitation In Vicinity, Rain, Light Rain, Light Drizzle, Light Drizzle/Rain, Freezing Drizzle/Freezing Rain
            styleSetter(morningRain, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'rain or snow' : // a chance of rain or snow throughout the day, morning rain or snow, rain or snow in the morning and afternoon, a chance of rain or snow
        // rain or snow clearing later, rain or snow, early morning snow or rain, late afternoon rain or snow, afternoon rain or snow, Heavy Rain And Snow, Light Rain And Snow
        // Snow And Rain Showers
            styleSetter(morningRainOrSnow, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'snow' : // Snow, a chance of snow throughout the day, morning snow, snow in the morning and afternoon, a chance of snow, snow clearing later, 
        // a chance of snow, snow, Snow Depth, early morning snow, late afternoon snow, afternoon snow, Ice, Snow, Snow Showers, Light Snow
            styleSetter(morningSnow, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'storm' : // storms possible, strong storms possible, Lightning Without Thunder, Thunderstorm, Thunderstorm Without Precipitation
            styleSetter(storm, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Heavy Snow' : // Blowing Or Drifting Snow, Heavy Snow
            styleSetter(heavySnow, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Heavy Freezing Drizzle/Freezing Rain' : // Heavy Freezing Rain, Rain Showers, Heavy Rain, Heavy Drizzle, Heavy Drizzle/Rain
            styleSetter(heavyRain, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'fog' : // Freezing Fog, Mist, Smoke Or Haze
            styleSetter(fog, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'tornado' : // Funnel Cloud/Tornado, Squalls
            styleSetter(tornado, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'hail' : // Hail Showers, Hail
            styleSetter(hail, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Diamond Dust' :
            styleSetter(diamondDust, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        case 'Dust Storm' :
            styleSetter(dustStorm, 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.1)', 'rgba(236, 228, 228, 0.4)', 'rgba(236, 228, 228, 0.8)');
            break;
        default : // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Estimated precipitation, Heat Index, Relative Humidity, desc, Latitude & Longitude
        // Maximum Temperature, Minimum Temperature, multiple days, no rain expected, cloudy skies throughout the day, Sea Level Pressure
        //similar temperatures continuing, Sky cover, %s., %s with %s., %s and %s with %s, Solar Energy, Solar Radiation, Mean Station Distance,
        // Contributing Stations, Sunshine, Temperature, %s with %s., %s., today, tomorrow, Sky Unchanged, Visibility, warming up, Wind direction,
        // Wind Direction, Weather Type, Wind Gust, Wind Chill, Wind Speed
            styleSetter(defaultBg, 'rgb(250, 246, 246)', 'rgb(255, 255, 255)', 'rgb(253, 252, 252)', 'hsla(0, 0.00%, 100.00%, 0.80)');
            break;
    }
}
