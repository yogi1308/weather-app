import {format} from 'date-fns'
import {getWeatherUsingCoords, getWeather, getCitybyCoords, getCitiesSuggestion} from './api.js'
import {displayBasicDetails, timeIntervalId} from './populateDOM.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayWeatherByHours, displayWeatherByDays, getUnitGroup, setUnitGroup} from './index.js'
import clearNight from '../assets/weather-images/clear_night.png'

export {getWindDirection, appendElements, createAddClassAddTextAppend, getDateTime, styleSetter, manageError, displayCitySuggestions, clearCitySuggestions, handleKeyPress, addListeners, showLoader, hideLoader}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}

function appendElements(child, text) {
    const childDiv = document.querySelector(child)
    // Iterate through child nodes and preserve <span> elements
    Array.from(childDiv.childNodes).forEach(node => {
        if (node.tagName !== 'SPAN') {
            childDiv.removeChild(node); // Remove non-<span> elements
        }
    });

    // Append the new text as a text node
    const textNode = document.createTextNode(text);
    childDiv.appendChild(textNode);
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
            suggestionItem.addEventListener('click', async () => {
                const location = suggestionItem.textContent;
                const latitude = suggestions.find(item => item.name === city.name && item.country === city.country).latitude;
                const longitude = suggestions.find(item => item.name === city.name && item.country === city.country).longitude;
                console.log(latitude, longitude, location)
                clearCitySuggestions()
                try {
                    showLoader()
                    let weather = await getWeatherUsingCoords(latitude, longitude, location)
                    displayBasicDetails(weather);
                    displayWeatherByHours(weather);
                    displayWeatherByDays(weather);
                    mainCardImageAndOtherStylesManager(weather.currentConditions.conditions)
                    hideLoader()
                    document.querySelector('#city').value = '';
                }
                catch (error) {
                    console.log(error)
                    manageError();
                    hideLoader()
                }
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
    else {clearCitySuggestions()}
}

function clearCitySuggestions() {
    const suggestionsDiv = document.querySelector('.suggestions-container');
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    suggestionsDiv.style.display = 'none'; // Hide suggestions
    const searchContainerDiv = document.querySelector('div.search-container');
    searchContainerDiv.style.borderRadius = '1rem'
    searchContainerDiv.style.borderBottom = '1.75px solid #ccc'
}

async function handleKeyPress() {
    try {
            showLoader()
            console.log(document.querySelector('#city').value.trim())
            let weather = await getWeather(document.querySelector('#city').value.trim())
            console.log(document.querySelector('#city').value.trim())
            let location = await getCitybyCoords(weather.latitude, weather.longitude)
            location = `${location[0].city}, ${location[0].country}`
            weather.resolvedAddress = location
            displayBasicDetails(weather);
            displayWeatherByHours(weather);
            displayWeatherByDays(weather);
            mainCardImageAndOtherStylesManager(weather.currentConditions.conditions)
            hideLoader()
            clearCitySuggestions()
            document.querySelector('#city').value = '';
        }
        catch (error) {
            console.log(error)
            manageError()
            clearCitySuggestions()
            hideLoader()
        }

}

function addListeners() {
    document.querySelector('#city').addEventListener('input', async (event) => {
    const query = event.target.value.trim();

    if (query.length > 2) { // Fetch suggestions only if input length > 2
        const suggestions = await getCitiesSuggestion(query);
        displayCitySuggestions(suggestions);
    } 
    else {
        clearCitySuggestions();
    }
    })
    document.querySelector('#city').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleKeyPress();
        }
    })
    document.querySelector('#content > div.header > div.search-container > button').addEventListener('click', () => {
        handleKeyPress();
    })

    document.querySelector('.settings').addEventListener('click', changeUnits)
}

function manageError() {
    // Clear the existing interval if it exists
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
    }
    const basicWeatherDetailsDiv = document.querySelector('.basic-weather-details');
    document.querySelector('.basic-info').style.display = 'none'
    basicWeatherDetailsDiv.style.backgroundImage = `url(${clearNight})`;

    document.querySelector('.hours-days').style.display = 'none'

    const bodyDiv = document.querySelector('body');
    bodyDiv.style.backgroundImage = `url(${clearNight})`;

    if (!document.querySelector('div.error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.innerHTML = '<h3>Weather data not found</h3> <p> Please check the city name </p>';
        errorMessage.style.color = 'white';
        errorMessage.style.fontSize = '1.5rem';
        basicWeatherDetailsDiv.appendChild(errorMessage);
    }

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
    
    if (document.querySelectorAll('.twinkle-star').length === 0) {
        // Add stars to upper half only
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.classList.add('twinkle-star');
            star.style.top = `${Math.random() * 50}%`; // only upper 50% vertically
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            basicWeatherDetailsDiv.appendChild(star);
        }
    }
}   

function showLoader() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    loader.style.display = 'flex';
    content.style.display = 'none';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.background = 'black';
}



function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    const body = document.querySelector('body');
    body.style.display = 'block';
    body.style.height = 'auto';
    body.style.width = 'auto';
}

async function changeUnits() {
    console.log('Units changed');
    document.querySelectorAll('div.day-wind-speed').forEach(temp => {
        const spans = temp.querySelectorAll('span');
        if (spans.length < 2) return; // Make sure there’s text to update
    
        const textSpan = spans[1]; // Get the <span> containing the wind value text
        const originalText = textSpan.textContent;
        const windValue = extractNumber(originalText);
        const direction = extractWindDirection(originalText);
    
        let speedUnit, convertedSpeed;
    
        if (getUnitGroup() === 'metric') {
            // Switching to imperial
            speedUnit = 'mph';
            convertedSpeed = kmphToMph(windValue);
        } else {
            // Switching to metric
            speedUnit = 'kmph';
            convertedSpeed = mphToKmph(windValue);
        }
    
        textSpan.textContent = `${convertedSpeed} ${speedUnit} ${direction}`;
    });
    const currentUnitGroup = getUnitGroup();
    if (currentUnitGroup === 'metric') {
        let hourCounter = 1
        let hourWindCounter = 1
        setUnitGroup('imperial');
        let tempUnit = '°F';
        let speedUnit = 'mph';
        appendElements('.temp', celsiusToFahrenheit(extractNumber(document.querySelector('.temp').textContent)) + tempUnit)
        appendElements('.max', celsiusToFahrenheit(extractNumber(document.querySelector('.max').textContent)) + tempUnit)
        appendElements('.min', celsiusToFahrenheit(extractNumber(document.querySelector('.min').textContent)) + tempUnit)
        appendElements('.feels-like', 'Feels like ' + celsiusToFahrenheit(extractNumber(document.querySelector('.feels-like').textContent)) + tempUnit)
        appendElements('.wind-value', `${kmphToMph(extractNumber(document.querySelector('.wind-value').textContent))} ${speedUnit} ${extractWindDirection(document.querySelector('.wind-value').textContent)}`)
        document.querySelectorAll('div.hour-temp').forEach(temp => {
            let selector = `#content > div.main > div.hours-days > div.by-hours > div:nth-child(${hourCounter}) > div.hour-temp`
            appendElements(selector, celsiusToFahrenheit(extractNumber(temp.textContent)) + ' '  + tempUnit)
            ++hourCounter
        })
        document.querySelectorAll('div.hour-wind-speed').forEach(temp => {
            let selector = `#content > div.main > div.hours-days > div.by-hours > div:nth-child(${hourWindCounter}) > div.hour-wind-speed`
            appendElements(selector, kmphToMph(extractNumber(temp.textContent)) + ' '  + speedUnit + ' ' + extractWindDirection(temp.textContent))
            ++hourWindCounter
        })
        document.querySelectorAll('div.day-low-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = celsiusToFahrenheit(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
        document.querySelectorAll('div.day-high-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = celsiusToFahrenheit(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
        document.querySelectorAll('div.day-avg-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = celsiusToFahrenheit(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
    } else {
        let hourCounter = 1
        let hourWindCounter = 1
        let loTempCounter = 1
        setUnitGroup('metric');
        let tempUnit = '°C';
        let speedUnit = 'kmph';
        appendElements('.temp', fahrenheitToCelsius(extractNumber(document.querySelector('.temp').textContent)) + ' '  + tempUnit)
        appendElements('.max', fahrenheitToCelsius(extractNumber(document.querySelector('.max').textContent)) + ' '  + tempUnit)
        appendElements('.min', fahrenheitToCelsius(extractNumber(document.querySelector('.min').textContent)) + ' '  + tempUnit)
        appendElements('.feels-like', 'Feels like ' + fahrenheitToCelsius(extractNumber(document.querySelector('.feels-like').textContent)) + ' '  + tempUnit)
        appendElements('.wind-value', `${mphToKmph(extractNumber(document.querySelector('.wind-value').textContent))} ${speedUnit} ${extractWindDirection(document.querySelector('.wind-value').textContent)}`)
        document.querySelectorAll('div.hour-temp').forEach(temp => {
            let selector = `#content > div.main > div.hours-days > div.by-hours > div:nth-child(${hourCounter}) > div.hour-temp`
            appendElements(selector, fahrenheitToCelsius(extractNumber(temp.textContent)) + ' '  + tempUnit)
            ++hourCounter
        })
        document.querySelectorAll('div.hour-wind-speed').forEach(temp => {
            let selector = `#content > div.main > div.hours-days > div.by-hours > div:nth-child(${hourWindCounter}) > div.hour-wind-speed`
            appendElements(selector, mphToKmph(extractNumber(temp.textContent)) + ' ' + speedUnit  + ' ' + extractWindDirection(temp.textContent))
            ++hourWindCounter
        })
        document.querySelectorAll('div.day-low-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = fahrenheitToCelsius(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
        document.querySelectorAll('div.day-high-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = fahrenheitToCelsius(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
        document.querySelectorAll('div.day-avg-temp').forEach(tempDiv => {
            const tempTextNode = Array.from(tempDiv.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
            );
        
            if (tempTextNode) {
                tempTextNode.nodeValue = fahrenheitToCelsius(extractNumber(tempTextNode.nodeValue)) + ' ' + tempUnit;
            }
        });
    }
    console.log(`Unit group is now: ${getUnitGroup()}`);
    
}

function mphToKmph(mph) {
    return +(mph * 1.60934).toFixed(1);
}
  
function kmphToMph(kmph) {
    return +(kmph / 1.60934).toFixed(1);
}

function fahrenheitToCelsius(f) {
    return +((f - 32) * 5 / 9).toFixed(1);
}
  
function celsiusToFahrenheit(c) {
    return +((c * 9 / 5) + 32).toFixed(1);
}

function extractNumber(input) {
    const str = String(input); // ensures it's a string
    const match = str.match(/-?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
}
  
function extractWindDirection(input) {
    console.log(input)
    const str = String(input);
    const match = str.match(/[A-Z]{1,3}$/);
    return match ? match[0] : '';
}
  
// #content > div.main > div.hours-days > div.by-hours > div:nth-child(3) > div.hour-temp
    