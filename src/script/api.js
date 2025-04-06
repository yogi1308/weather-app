export {getWeather, getCitiesSuggestion, getWeatherUsingCoords, getCitybyCoords}

async function getWeather(city) {
    const key = '96QA75TCRT7MJRC6AV596A8Q8' // W2FDGJ2MLL2LU727Y6D8PWFW5, 96QA75TCRT7MJRC6AV596A8Q8 , 5J2S3WKKZUD2H6MGVCPY938LS
    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    let url = baseURL + city + '?key=' + key
    let weather = await fetch(url, {mode: 'cors'})
    weather = await weather.json()
    console.log(weather)
    return weather
}

async function getWeatherUsingCoords(lat, lon, location) {
    const key = 'W2FDGJ2MLL2LU727Y6D8PWFW5' // W2FDGJ2MLL2LU727Y6D8PWFW5, 96QA75TCRT7MJRC6AV596A8Q8 , 5J2S3WKKZUD2H6MGVCPY938LS
    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    let url = baseURL + lat + ',' + lon + '?key=' + key
    let weather = await fetch(url, {mode: 'cors'})
    weather = await weather.json()
    weather.resolvedAddress = location
    console.log(weather)
    return weather
}

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

function toIso6709(lat, lon) {
    const format = (num) => (num >= 0 ? '+' : '') + num.toFixed(4);
    return `${format(lat)}${format(lon)}`;
}

async function getCitybyCoords(lat, lon) {
    const isoLocation = toIso6709(lat, lon);
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${isoLocation}/nearbyCities?limit=1&distanceUnit=KM`;
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bc58400e33msh41f29479f6f2ba1p1d0d87jsn0fae8d8e5037', // 59dc0471f0msh3ba24d63586a914p105c54jsnbb7a4ccec894, bc58400e33msh41f29479f6f2ba1p1d0d87jsn0fae8d8e5037
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data); // Top 5 matching cities, sorted by population
        return data.data;
    } catch (error) {
        console.error(error);
    }
}









