import {format} from 'date-fns'
export {getWindDirection, appendElements, createAddClassAddTextAppend, getDateTime}

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