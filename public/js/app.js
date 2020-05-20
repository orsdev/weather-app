
const formEventListener = () => {
 const weatherForm = document.querySelector('form');
 weatherForm.addEventListener('submit', getWeatherData);
};

const getWeatherData = (e) => {
 e.preventDefault();
 const input = document.querySelector('input');
 const weatherDiv = document.querySelector('.weather-data');

 if (input.value) {

  fetch('/weather?location=' + input.value)
   .then(function (response) {
    return response.json();
   })
   .then(function (data) {
    let html;

    if (data.degree && data.forecast && data.location) {

     html = `
      <ul>
   <li><strong>Temp</strong><span>${data.degree} degrees Celcius</span></li>
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
    let html = `<p>Something went wrong. Please try again.</p>`;
    weatherDiv.innerHTML = html;
   })

 }
}

formEventListener();
