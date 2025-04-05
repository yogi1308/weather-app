//weather alerts 
import {format, getHours} from 'date-fns'
import '../styles/styles.css';
import {getWeather} from './api.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayHours, displayDays, displayBasicDetails, updateTimeDisplay} from './populateDOM.js'

import clearNight from '../assets/weather-images/clear_night.png'
console.log('Hello World');

(async () => {
    try {
        let weather = await getWeather()
        displayBasicDetails(weather);
        displayWeatherByHours(weather);
        displayWeatherByDays(weather);
        mainCardImageAndOtherStylesManager(weather.currentConditions.conditions);
    }
    catch (error) {
        const basicWeatherDetailsDiv = document.querySelector('.basic-weather-details');
        basicWeatherDetailsDiv.innerHTML = '';
        basicWeatherDetailsDiv.style.backgroundImage = `url(${clearNight})`;

        const hourAndDaysDiv = document.querySelector('.hours-days');
        hourAndDaysDiv.innerHTML = '';

        const bodyDiv = document.querySelector('body');
        bodyDiv.style.backgroundImage = `url(${clearNight})`;

        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.innerHTML = '<h3>Weather data not found</h3> <p> Please check the city name </p>';
        errorMessage.style.color = 'white';
        errorMessage.style.fontSize = '1.5rem';
        basicWeatherDetailsDiv.appendChild(errorMessage);
    
        // Twinkling star style
        const style = document.createElement('style');
        style.innerHTML = `
          .twinkle-star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: 0.6;
            animation: twinkle 2s infinite;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
          }
        
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        
          /* Hide scrollbars but keep vertical scroll enabled */
          ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
        
          html, body {
            overflow-x: hidden;           /* ⛔ disable horizontal scroll */
            overflow-y: auto;             /* ✅ enable vertical scroll */
            -ms-overflow-style: none;     /* IE and Edge */
            scrollbar-width: none;        /* Firefox */
          }
        `;
        document.head.appendChild(style);
        

    
        // Add stars to upper half only
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('twinkle-star');
            star.style.top = `${Math.random() * 50}%`; // only upper 50% vertically
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            basicWeatherDetailsDiv.appendChild(star);
        }
    }    
})();

function displayWeatherByHours(weather) {
    const now = new Date();
    const currentHour = now.getHours();

    for (let i = 1; i <= 24; i++) { 
        // Calculate the overall hour index starting from current hour.
        const overallHour = currentHour + i;
        // Determine which day to use: 0 for today, 1 for tomorrow, etc.
        const dayIndex = Math.floor(overallHour / 24);
        // Get the hour index for the day (0-23).
        const hourIndex = overallHour % 24;
        displayHours(weather.days[dayIndex].hours[hourIndex])
    }
}

function displayWeatherByDays(weather) {
    for (let i = 1; i < 15; i++) { 
        displayDays(weather.days[i])
    }
}
