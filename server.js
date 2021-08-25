const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherData = require('./data/weather.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
//allows us to let our front end talk to our back end.

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  //create a variable to save query parameters from request body from react

  const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  //searches for the city where the city_name matches the search query

  if (cityObject){
    const weatherArray = cityObject.data.map(day => new Forecast(day.valid_date, day.weather.description));
    response.status(200).send(weatherArray);
  } else {
    response.status(500).send('no city found');
  }
  //passes in the found city (cityObject) and if it exists, it will construct a new instance of forecast which returns the info we need.  If the city isn't fouund from our find method above, it will return an error message.
});

class Forecast{
  //create properties for class (Forecast)
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
};
//functional class that changes the shape of the city object data, by giving it date and description properties.

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
