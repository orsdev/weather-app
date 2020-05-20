const fetch = require('cross-fetch');

const getWeatherReport = (location = 'Nigeria', callback) => {

 const apiKey = '439f18174885511ec718789ffeefeafd';
 const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`;

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