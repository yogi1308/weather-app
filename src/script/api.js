export {getWeather}
// let weather = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=W2FDGJ2MLL2LU727Y6D8PWFW5', {mode: 'cors'})
// weather = await weather.json()
// console.log(weather);


const key = '96QA75TCRT7MJRC6AV596A8Q8' // W2FDGJ2MLL2LU727Y6D8PWFW5, 96QA75TCRT7MJRC6AV596A8Q8
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

async function getWeather() {
    let city = document.querySelector('#city').value || 'Tempe'
    let url = baseURL + city + '?key=' + key
    let weather = await fetch(url, {mode: 'cors'})
    weather = await weather.json()
    return weather
}