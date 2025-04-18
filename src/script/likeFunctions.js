import {getWeatherUsingCoords, getAQI} from './api.js'
import {showLoader, displayAllDetails} from './helperFunctions.js'

export {addToFavorites, checkLikes, showLikedLocations}
let favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

class FavoritesLocation {
    constructor(name, lat, lon) {
        this.name = name;
        this.latitude = lat;
        this.longitude = lon;
    }
}

function getFavoritesList() {
    return favoritesList;
}

function addToFavoritesList(name, lat, lon) {
    const newLocation = new FavoritesLocation(name, lat, lon);
    favoritesList.push(newLocation);
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
}

function removeFromFavoritesList(name, lat, lon) {
    favoritesList = favoritesList.filter(item =>
        !(item.name === name && item.latitude === lat && item.longitude === lon)
    );
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
}


function addToFavorites() {
    const unfilled = document.querySelector('.favorites');
    const filled = document.querySelector('.like-filled-icon');

    if (unfilled.style.display == 'block' || filled.style.display == 'none') {
        unfilled.style.display = 'none' 
        filled.style.display = 'block'
        const [lat, lon] = document.querySelector('.coordinates').textContent.split(', ')
        addToFavoritesList(document.querySelector('.location').textContent, lat, lon)
    }

    else if (unfilled.style.display == 'none' || filled.style.display == 'block') {
        unfilled.style.display = 'block' 
        filled.style.display = 'none'
        const [lat, lon] = document.querySelector('.coordinates').textContent.split(', ')
        removeFromFavoritesList(document.querySelector('.location').textContent, lat, lon)
    }
}

function checkLikes(location, lat, lon) {
    return favoritesList.some(item =>item.name === location &&item.latitude === lat &&item.longitude === lon);
}

function showLikedLocations() {
    document.querySelector('.likes-or-change-units').close();

    const unorderedList = document.querySelector('.favorite-locations-ul');
    unorderedList.innerHTML = '';

    if (favoritesList.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Your liked locations will be displayed here';
        unorderedList.appendChild(emptyMessage);
    } else {
        favoritesList.forEach(location => {
            const listItem = document.createElement('li');
            const listItemName = document.createElement('div')
            const listItemCoords = document.createElement('div')
            listItemName.textContent = location.name;
            listItemCoords.textContent = location.latitude + ', ' + location.longitude;
            listItem.appendChild(listItemName)
            listItem.appendChild(listItemCoords)
            unorderedList.appendChild(listItem)
            listItem.addEventListener('click', async () => {
                showLoader()
                const weather = await getWeatherUsingCoords(location.latitude, location.longitude, location.name)
                const aqi = await getAQI(location.latitude, location.longitude);
                displayAllDetails(weather, aqi)
                document.querySelector('.favorite-locations').close();
                localStorage.setItem('mostRecent', JSON.stringify({ name: location.name, lat: location.latitude, lon: location.longitude }));
            })
        });
    }

    document.querySelector('.favorite-locations').showModal();
}


  