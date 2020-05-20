const fetch = require('cross-fetch');

require('dotenv').config();

const getWeatherReport = (location = 'Nigeria', callback) => {

 const apiKey = process.env.WEATHER_KEY;
 const url = `${process.env.WEATHER_API}/?q=${encodeURIComponent(location)}&appid=${apiKey}`;

 fetch(url)
  .then((response) => {
   return response.json();
  })
  .then((response) => {
   if (response.cod === '404'
    && response.message) {
    callback({
     code: '404',
     message: 'Location not found. Try another location.'
    })
   } else {
    callback(response);
   }
  })
  .catch((error) => {
   callback({
    code: 'HTTPFAILED',
    message: 'Something went wrong. Please try again.'
   });
  })
};

module.exports = getWeatherReport;