
const formEventListener = () => {
 const form = document.querySelector('form');
 form.addEventListener('submit', getWeatherData);
};

const getWeatherData = (e) => {
 e.preventDefault();
 const input = document.querySelector('input');

 if (input.value) {

  fetch('http://localhost:3000/weather?location=' + input.value)
   .then(function (response) {
    return response.json();
   })
   .then(function (data) {
    const weatherDiv = document.querySelector('.weather-data');
    let html;

    if (data.degree && data.forecast && data.location) {

     html = `
      <ul>
   <li><strong>Temperature</strong><span>${data.degree}</span></li>
   <li><strong>Forecast</strong><span>${data.forecast}</span></li>
   <li><strong>Location</strong><span>${data.location}</span></li>
  </ul>`;
    };

    if (data.code == '404' && data.message) {
     html = `<p>${data.message}`;
    };

    if (data.code == 'HTTPFAILED' && data.message) {
     html = `<p>${data.message}`;
    };

    weatherDiv.innerHTML = html;

   }).catch(function (error) {
    console.log('client fetch error', error)
   })

 }
}

formEventListener();
