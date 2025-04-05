import {format} from 'date-fns'
export {getWindDirection, appendElements, createAddClassAddTextAppend, getDateTime, styleSetter}

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