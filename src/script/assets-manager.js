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
import greenAQI from "../assets/icons/AQ-green-icon.svg"
import orangeAQI from "../assets/icons/AQ-yellow-icon.svg"
import redAQI from "../assets/icons/AQ-red-icon.svg"
import purpleAQI from "../assets/icons/AQ-purple-icon.svg"
import maroonAQI from "../assets/icons/AQ-maroon-icon.svg"
import blackAQI from "../assets/icons/AQ-black-icon.svg"

import defaultBg from '../assets/weather-images/default_bg.jpg';
import defaultNightBg from '../assets/weather-images/default_night.png';
import cloudCover from '../assets/weather-images/Cloud_Cover.png';
import cloudCoverNight from '../assets/weather-images/cloud_cover_night.png';
import clearConditionsThroughtTheDay from '../assets/weather-images/clear_conditions_throughout_the_day.png';
import clearNight from '../assets/weather-images/clear_night.png';
import clearingInTheAfternoon from '../assets/weather-images/clearing_in _the_afternoon.png';
import becomingCloudyInTheAfternoon from '../assets/weather-images/becoming_cloudy_in_the_afternoon.png';
import coolingDown from '../assets/weather-images/cooling_down.png';
import dewPoint from '../assets/weather-images/Dew_Point.png';
import morningRain from '../assets/weather-images/morning_rain.png';
import nightRain from '../assets/weather-images/night_rain.png';
import morningRainOrSnow from '../assets/weather-images/morning_rain_or_snow.png';
import nightRainOrSnow from '../assets/weather-images/night_mix_of_rain_and_snow.png';
import morningSnow from '../assets/weather-images/morning_snow.png';
import nightSnow from '../assets/weather-images/night_snow.png';
import storm from '../assets/weather-images/storm.png';
import stormNight from '../assets/weather-images/storm_night.png';
import heavySnow from '../assets/weather-images/heavy_snow.png';
import heavyRain from '../assets/weather-images/heavy_rain.png';
import fog from '../assets/weather-images/fog.png';
import fogNight from '../assets/weather-images/fog_night.png';
import tornado from '../assets/weather-images/tornado.png';
import tornadoNight from '../assets/weather-images/tornado_night.png';
import hail from '../assets/weather-images/hail_showers.png';
import hailNight from '../assets/weather-images/hail_night.png';
import diamondDust from '../assets/weather-images/diamond_dust.png';
import diamondDustNight from '../assets/weather-images/diamond_dust_night.png';
import partiallyClouded from '../assets/weather-images/partially_clouded.png';
import partiallyCloudedNight from '../assets/weather-images/partially_clouded_night.png';
import dustStorm from '../assets/weather-images/dust_storm.png';
import dustStormNight from '../assets/weather-images/dust_storm_night.png';

import { styleSetter } from './helperFunctions.js';

export { iconsManager, mainCardImageAndOtherStylesManager, displayAppropriateAQIconAndGetCategory};

// --------- Helper Functions ---------

function normalize(condition) {
    return condition.trim().toLowerCase();
  }
  
  function parseTimeStringToEpoch(timeStr) {
    if (!timeStr) return 0;
    const [h, m, s] = timeStr.split(':').map(Number);
    const now = new Date();
    now.setHours(h, m, s, 0);
    return Math.floor(now.getTime() / 1000);
  }
  
  function getTimeOfDay(currentTime, sunriseTime, sunsetTime) {
    const currentEpoch = parseTimeStringToEpoch(currentTime);
    const sunriseEpoch = parseTimeStringToEpoch(sunriseTime);
    const sunsetEpoch = parseTimeStringToEpoch(sunsetTime);
  
    const timeOfDay = (currentEpoch < sunriseEpoch || currentEpoch > sunsetEpoch) ? 'night' : 'day';
    return timeOfDay;
  }

const bgMap = {
  'clear': { day: clearConditionsThroughtTheDay, night: clearNight },
  'partially cloudy': { day: partiallyClouded, night: partiallyCloudedNight },
  'cloud cover': { day: cloudCover, night: cloudCoverNight },
  'clearing in the afternoon': clearingInTheAfternoon,
  'becoming cloudy in the afternoon': becomingCloudyInTheAfternoon,
  'cooling down': coolingDown,
  'dew point': dewPoint,
  'rain': { day: morningRain, night: nightRain },
  'rain or snow': { day: morningRainOrSnow, night: nightRainOrSnow },
  'snow': { day: morningSnow, night: nightSnow },
  'storm': { day: storm, night: stormNight },
  'heavy snow': heavySnow,
  'heavy freezing drizzle/freezing rain': heavyRain,
  'fog': { day: fog, night: fogNight },
  'tornado': { day: tornado, night: tornadoNight },
  'hail': { day: hail, night: hailNight },
  'diamond dust': { day: diamondDust, night: diamondDustNight },
  'dust storm': { day: dustStorm, night: dustStormNight }
};

// Mapping aliases: maps various textual forms to one of our keys in bgMap.
const conditionAliasMap = {
  // Rain variants
  'rainallday': 'rain',
  'rainam': 'rain',
  'rainampm': 'rain',
  'rainchance': 'rain',
  'rainclearinglater': 'rain',
  'raindays': 'rain',
  'raindefinite': 'rain',
  'rainearlyam': 'rain',
  'rainlatepm': 'rain',
  'rainpm': 'rain',
  'type 2': 'rain',
  'type 3': 'rain',
  'type 4': 'rain',
  'type 5': 'rain',
  'type 6': 'rain',
  'type 9': 'rain',
  'type 20': 'rain',
  'type 21': 'rain',
  'type 24': 'rain',
  'type 25': 'rain',
  'type 26': 'rain',
  // Snow variants
  'snowallday': 'snow',
  'snowam': 'snow',
  'snowampm': 'snow',
  'snowchance': 'snow',
  'snowclearinglater': 'snow',
  'snowdays': 'snow',
  'snowdefinite': 'snow',
  'snowdepth': 'snow',
  'snowearlyam': 'snow',
  'snowlatepm': 'snow',
  'snowpm': 'snow',
  'type 17': 'snow',
  'type 31': 'snow',
  'type 33': 'snow',
  'type 34': 'snow',
  'type 35': 'snow',
  // Rain or Snow variants
  'rainsnowallday': 'rain or snow',
  'rainsnowam': 'rain or snow',
  'rainsnowampm': 'rain or snow',
  'rainsnowchance': 'rain or snow',
  'rainsnowclearinglater': 'rain or snow',
  'rainsnowdefinite': 'rain or snow',
  'rainsnowearlyam': 'rain or snow',
  'rainsnowlatepm': 'rain or snow',
  'rainsnowpm': 'rain or snow',
  'type 22': 'rain or snow',
  'type 23': 'rain or snow',
  'type 32': 'rain or snow',
  // Storm variants
  'stormspossible': 'storm',
  'stormsstrong': 'storm',
  'type 18': 'storm',
  'type 36': 'storm',
  'type 37': 'storm',
  'type 38': 'storm',
  // Cloud Cover variants
  'cloudcover': 'cloud cover',
  'overcast': 'cloud cover',
  'type 27': 'cloud cover',
  'type 28': 'cloud cover',
  'type 29': 'cloud cover',
  // Partially cloudy variants
  'partially cloudy': 'partially cloudy',
  'variablecloud': 'partially cloudy',
  'type 42': 'partially cloudy',
  // Clear variants
  'clear': 'clear',
  'type 43': 'clear',
  // Direct mappings
  'clearingpm': 'clearing in the afternoon',
  'cloudierpm': 'becoming cloudy in the afternoon',
  'coolingdown': 'cooling down',
  'dew': 'dew point',
  // Fog
  'fog': 'fog',
  'type 8': 'fog',
  'type 12': 'fog',
  'type 19': 'fog',
  'type 30': 'fog',
  // Hail
  'hail': 'hail',
  'type 16': 'hail',
  'type 40': 'hail',
  // Diamond Dust
  'diamond dust': 'diamond dust',
  'type 39': 'diamond dust',
  // Dust storm
  'dust storm': 'dust storm',
  'type 7': 'dust storm',
  // Tornado
  'tornado': 'tornado',
  'type 15': 'tornado',
  // Heavy freezing drizzle/freezing rain
  'heavy freezing drizzle/freezing rain': 'heavy freezing drizzle/freezing rain',
  'type 10': 'heavy freezing drizzle/freezing rain',
  'type 13': 'heavy freezing drizzle/freezing rain'
};

function mainCardImageAndOtherStylesManager(rawConditions, currentTime, sunriseTime, sunsetTime) {
    const timeOfDay = getTimeOfDay(currentTime, sunriseTime, sunsetTime);
    const normalizedConditions = rawConditions.split(',').map(normalize);
  
    for (const condition of normalizedConditions) {
      const key = conditionAliasMap[condition] || condition;
      const bg = bgMap[key];
  
      if (bg) {
        const image = typeof bg === 'object' ? (bg[timeOfDay] || bg.day) : bg;
        styleSetter(
          image,
          'rgba(236, 228, 228, 0.1)',
          'rgba(236, 228, 228, 0.1)',
          'rgba(236, 228, 228, 0.4)',
          'rgba(236, 228, 228, 0.8)'
        );
        return;
      }
    }
  
    // Fallback background
    const fallback = (timeOfDay === 'night') ? defaultNightBg : defaultBg;
    styleSetter(
      fallback,
      'rgba(250, 246, 246, 0.15)',
      'rgba(255, 255, 255, 0.15)',
      'rgba(253, 252, 252, 0.4)',
      'hsla(0, 0.00%, 100.00%, 0.80)'
    );
  }  
  
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

function displayAppropriateAQIconAndGetCategory(aqi) {
  const aqiIconImg = document.querySelector('.aqi > span > img')
  if (aqi <= 50) {aqiIconImg.src = greenAQI; return "Good"};
  if (aqi <= 100) {aqiIconImg.src = orangeAQI; return "Moderate"};
  if (aqi <= 200) {aqiIconImg.src = redAQI; return "Unhealthy"};
  if (aqi <= 300) {aqiIconImg.src = purpleAQI; return "Very Unhealthy"};
  if (aqi <= 500) {aqiIconImg.src = maroonAQI; return "Hazardous"};
  aqiIconImg.src = blackAQI; return "Extremely Hazardous"
}