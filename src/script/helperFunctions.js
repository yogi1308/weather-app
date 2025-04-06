import {format} from 'date-fns'
import clearNight from '../assets/weather-images/clear_night.png'

export {getWindDirection, appendElements, createAddClassAddTextAppend, getDateTime, styleSetter, manageError, displayCitySuggestions}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    childDiv.innerHTML += text
}

function createAddClassAddTextAppend(element, className, text, appendTo) {
    const newElement = document.createElement(element);
    newElement.classList.add(className);
    newElement.innerHTML = text;
    appendTo.appendChild(newElement);
}

function getDateTime() {
    return new Date();
}



function styleSetter(mainCardBg, hourWeatherBg, dayWeatherBg, scrollbarThumbBg, scrollbarThumbHoverBg) {
    document.querySelector('.basic-weather-details').style.backgroundImage = `url(${mainCardBg})`;
    document.querySelector('body').style.background = `url(${mainCardBg})`;
    document.querySelector('body').style.backgroundSize = 'cover';
    document.querySelectorAll('div.hour-weather').forEach(hour => {hour.style.backgroundColor = hourWeatherBg;});
    document.querySelectorAll('div.day-weather').forEach(day => {day.style.backgroundColor = dayWeatherBg;});
    
    const style = document.createElement('style');
    document.head.appendChild(style);

    style.innerHTML = `
        ::-webkit-scrollbar {
            width: 5px; 
            height: 5px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: ${scrollbarThumbBg}; 
            border-radius: 20px; 
        }
        ::-webkit-scrollbar-thumb:hover {
            background: ${scrollbarThumbHoverBg}; 
        }
    `;
}

function displayCitySuggestions(suggestions) {
    if (suggestions != undefined) {
        const searchContainerDiv = document.querySelector('div.search-container');
        const suggestionsDiv = document.querySelector('.suggestions-container');
        const suggestionsList = document.getElementById('suggestions');
        suggestionsList.innerHTML = ''; // Clear previous suggestions
        suggestions.forEach((city) => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = `${city.name}, ${city.country}`;
            suggestionItem.addEventListener('click', () => {
                // document.querySelector('#city').value = `${city.name}, ${city.country}`;
                // suggestionsList.innerHTML = ''; // Clear suggestions after selection
            });
            suggestionsList.appendChild(suggestionItem);
        }
        );
        suggestionsDiv.appendChild(suggestionsList);
        suggestionsDiv.style.display = 'block'; // Show suggestions
        suggestionsDiv.style.top = `${document.querySelector('.header').offsetHeight}px`
        suggestionsDiv.style.left = '1rem'
        suggestionsDiv.style.width = `${document.querySelector('.search-container').offsetWidth}px`;
        suggestionsDiv.style.border = '1.75px solid #ccc';
        suggestionsDiv.style.borderTop = 'none'
        suggestionsDiv.style.borderBottomLeftRadius = '1rem'
        suggestionsDiv.style.borderBottomRightRadius = '1rem'

        searchContainerDiv.style.borderRadius = '0px'
        searchContainerDiv.style.borderTopLeftRadius = '1rem'
        searchContainerDiv.style.borderTopRightRadius = '1rem'
        searchContainerDiv.style.borderBottom = 'none'
    }
}



function manageError() {
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