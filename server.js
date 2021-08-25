const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherData = require('./data/weather.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/weather', (request, response) => {
  //create a variable to save query parameters from request body from react
  // let cityName = request.query.searchQuery;
  // let lat = request.query.location.lat;
  let {searchQuery} = request.query;
  console.log(request.query);

  const city = weatherData.find(city => city.city_name === searchQuery);

  if (city){
    const weatherArray = city.data.map(day => new Forecast(day));
    response.status(200).send(weatherArray);
  } else {
    response.status(500).send('no city found');
  }
});

function Forecast(day){
  //create props for class (Forecast)
  this.date = day.valid_date;
  this.description = day.weather.description;
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
