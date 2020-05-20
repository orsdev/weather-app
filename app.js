const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherReport = require('./src/utils/weatherReport');


const app = express();

//Define paths for express config
const publicPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

//Setup handlebars engine and view location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
 res.render('index');
});

app.get('/About', (req, res) => {
 res.render('about');
});

app.get('/weather', (req, res) => {

 if (!req.query.location) {
  return;
 }

 weatherReport(req.query.location, (result) => {

  if (result.code == '404' && result.message) {
   return res.send(result);
  };

  if (result.code == 'HTTPFAILED' && result.message) {
   return res.send(result);
  };

  //convert kelvin to celcius
  const getKelvin = result.main.temp;
  const toCelcius = Math.floor(getKelvin - 273.15);

  return res.send(
   {
    degree: toCelcius,
    forecast: result.weather[0].description,
    location: result.name
   }
  );
 });
});

app.get('*', (req, res) => {
 res.render('404');
});


app.listen(3000, () => {
 console.log('server is running on port 3000');
});
