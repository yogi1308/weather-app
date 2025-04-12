import {format} from 'date-fns'
import {getWeatherUsingCoords, getWeather, getCitybyCoords, getCitiesSuggestion, getAQI} from './api.js'
import {displayBasicDetails, timeIntervalId, displayAQIDetails} from './populateDOM.js'
import {mainCardImageAndOtherStylesManager} from './assets-manager.js'
import {displayWeatherByHours, displayWeatherByDays, getUnitGroup, setUnitGroup} from './index.js'
import {addToFavorites, showLikedLocations} from './likeFunctions.js'
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
                clearCitySuggestions()
                try {
                    showLoader()
                    let weather = await getWeatherUsingCoords(latitude, longitude, location)
                    const aqi = await getAQI(latitude, longitude);
                    displayAQIDetails(aqi.overall_aqi)
                    displayBasicDetails(weather);
                    displayWeatherByHours(weather);
                    displayWeatherByDays(weather);
                    mainCardImageAndOtherStylesManager(weather.currentConditions.conditions, weather.currentConditions.datetime, weather.currentConditions.sunrise, weather.currentConditions.sunset)
                    hideLoader()
                    document.querySelector('#city').value = '';
                    localStorage.setItem('mostRecent', JSON.stringify({ name: location, lat: latitude, lon: longitude }));
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
            let location = await getCitiesSuggestion(document.querySelector('#city').value.trim())
            const locationName = `${location[0].city}, ${location[0].country}`
            let weather = await getWeatherUsingCoords(location[0].latitude, location[0].longitude, locationName)
            const aqi = await getAQI(location[0].latitude, location[0].longitude);
            displayAQIDetails(aqi.overall_aqi)
            displayBasicDetails(weather);
            displayWeatherByHours(weather);
            displayWeatherByDays(weather);
            mainCardImageAndOtherStylesManager(weather.currentConditions.conditions, weather.currentConditions.datetime, weather.currentConditions.sunrise, weather.currentConditions.sunset)
            hideLoader()
            clearCitySuggestions()
            document.querySelector('#city').value = '';
            localStorage.setItem('mostRecent', JSON.stringify({ name: locationName, lat: location[0].latitude, lon: location[0].longitude }));
        }
        catch (error) {
            console.log(error)
            manageError()
            clearCitySuggestions()
            hideLoader()
        }

}

let cityInterval = null;

function addListeners() {
    let prevCitySearch;
    
    document.querySelector('#city').addEventListener('focus', () => {
        if (cityInterval === null) {
            cityInterval = setInterval(async () => {
              const input = document.querySelector('#city');
              const query = input.value.trim();
          
              if (query.length > 2) {
                const suggestionsContainer = document.querySelector('.suggestions-container');
          
                if (query !== prevCitySearch || suggestionsContainer?.style.display === 'none') {
                  const suggestions = await getCitiesSuggestion(query);
                  displayCitySuggestions(suggestions);
                  prevCitySearch = query;
                }
              } else {
                clearCitySuggestions();
              }
            }, 1200);
          } 
          else {}
          
    });

    document.querySelector('#city').addEventListener('blur', () => {
        setTimeout(() => {
          if (cityInterval !== null) {
            clearInterval(cityInterval);
            cityInterval = null;
          }
          clearCitySuggestions();
        }, 500); // Delay so click events on suggestions can still register
    });     

    document.querySelector('#city').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            showLoader()
            setTimeout(() => {handleKeyPress()}, 1500); // 1.1 second delay
        }
    });
    document.querySelector('#content > div.header > div.search-container > button').addEventListener('click', () => {
        handleKeyPress();
    })

    document.querySelector('.settings').addEventListener('click', showSettingsDialog)
    document.querySelector('.change-units').addEventListener('click', changeUnits)
    document.querySelectorAll('.close-button').forEach(button => {button.addEventListener('click', () => {
        const dialog = button.closest('dialog');
        if (dialog) dialog.close();});
    });

    document.querySelector('.favorites').addEventListener('click', addToFavorites)

    document.querySelector('.like-filled-icon').addEventListener('click', addToFavorites)

    document.querySelector('.show-favorite-locations').addEventListener('click', showLikedLocations)

    document.querySelector('.location-icon').addEventListener('click', showCurrentLocation)
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

    const unfilled = document.querySelector('.favorites');
    const filled = document.querySelector('.like-filled-icon');

    if (unfilled.style.display == 'none' || filled.style.display == 'block') {
        unfilled.style.display = 'block' 
        filled.style.display = 'none'
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

function showSettingsDialog() {
    document.querySelector('.likes-or-change-units').showModal()
    if (localStorage.getItem('unitGroup') == 'metric') {document.querySelector('.change-units').textContent = 'Change Units to Imperial System (°F, mph)'}
    else if (localStorage.getItem('unitGroup') == 'imperial') {document.querySelector('.change-units').textContent = 'Change Units to Metric System (°C, kmph)'}
}

function changeUnits() {
    document.querySelectorAll('div.day-wind-speed').forEach(temp => {
        const spans = temp.querySelectorAll('span');
        if (spans.length < 2) return; // Make sure there’s text to update
    
        const textSpan = spans[1]; // Get the <span> containing the wind value text
        const originalText = textSpan.textContent;
        const windValue = extractNumber(originalText);
        const direction = extractWindDirection(originalText);
    
        let speedUnit, convertedSpeed;
    
        if (localStorage.getItem('unitGroup') === 'metric') {
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
    const currentUnitGroup = localStorage.getItem('unitGroup');
    if (currentUnitGroup === 'metric') {
        let hourCounter = 1
        let hourWindCounter = 1
        localStorage.setItem('unitGroup', 'imperial');
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
        localStorage.setItem('unitGroup', 'metric');
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
    document.querySelector('.likes-or-change-units').close()
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
    const str = String(input);
    const match = str.match(/[A-Z]{1,3}$/);
    return match ? match[0] : '';
}

async function showCurrentLocation() {
    try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          showLoader();
      
          const { latitude, longitude } = position.coords;
          const location = await getCitybyCoords(latitude, longitude);
          const locationName = `${location[0].city}, ${location[0].country}`;
      
          // Save mostRecent
          localStorage.setItem(
            'mostRecent',
            JSON.stringify({ name: locationName, lat: latitude, lon: longitude })
          );
      
          const weather = await getWeatherUsingCoords(latitude, longitude, locationName);
          const aqi = await getAQI(latitude, longitude);
          displayAQIDetails(aqi.overall_aqi)
          displayBasicDetails(weather);
          displayWeatherByHours(weather);
          displayWeatherByDays(weather);
          addListeners();
          mainCardImageAndOtherStylesManager(
            weather.currentConditions.conditions,
            weather.currentConditions.datetime,
            weather.currentConditions.sunrise,
            weather.currentConditions.sunset
          );
          hideLoader();
    }
    catch (error) {
        console.log(error)
        manageError();
        hideLoader()
    }
}