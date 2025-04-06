export {getWeather, getCitiesSuggestion}

const key = 'W2FDGJ2MLL2LU727Y6D8PWFW5' // W2FDGJ2MLL2LU727Y6D8PWFW5, 96QA75TCRT7MJRC6AV596A8Q8 , 5J2S3WKKZUD2H6MGVCPY938LS
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

async function getWeather() {
    let city = document.querySelector('#city').value || 'Tempe'
    let url = baseURL + city + '?key=' + key
    let weather = await fetch(url, {mode: 'cors'})
    weather = await weather.json()
    return weather
}

let input = document.querySelector('#city').value

async function getCitiesSuggestion(input) {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5&sort=-population`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '59dc0471f0msh3ba24d63586a914p105c54jsnbb7a4ccec894',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.data); // Top 5 matching cities, sorted by population
      return data.data;
    } catch (error) {
      console.error(error);
    }
}









