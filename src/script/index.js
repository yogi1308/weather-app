import '../styles/styles.css';
console.log('Hello World');
let weather = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=W2FDGJ2MLL2LU727Y6D8PWFW5', {mode: 'cors'})
weather = await weather.json()
console.log(weather);
