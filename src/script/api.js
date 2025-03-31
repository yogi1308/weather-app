export {getWeather}


// let weather = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=W2FDGJ2MLL2LU727Y6D8PWFW5', {mode: 'cors'})
// weather = await weather.json()
// console.log(weather);


const key = 'W2FDGJ2MLL2LU727Y6D8PWFW5'
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const city = 'london'

async function getWeather() {
    const url = baseURL + city + '?key=' + key
    let weather = await fetch(url, {mode: 'cors'})
    weather = await weather.json()
    console.log(weather);
}