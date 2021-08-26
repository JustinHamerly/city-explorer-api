const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const weatherData = require('./data/weather.json');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
//allows us to let our front end talk to our back end.

app.get('/movies', async (request, response) => {
  let searchQuery = 'seattle';
  const movieKey = process.env.MOVIE_API_KEY;
  let movieAPI_URL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;
  let movieResponse = await axios.get(movieAPI_URL);
  console.log(movieResponse);
  response.status(200).send(movieResponse);
  // try{
  //   let movieResponse = await axios.get(movieAPI_URL);
  //   console.log(movieResponse.results);
  //   // const movieArr = movieResponse.data.data.map(day => new Forecast(day));
    // response.status(200).send('hello');
  // } catch (error) {
  //   response.status(500).send('no movies :(');
  // }
})

app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  //create a variable to save query parameters from request body from react
  const weatherKey = process.env.WEATHER_API_KEY;
  let weatherAPI_URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}&days=5&format=json`;
  // const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  //searches for the city where the city_name matches the search query

  try{
    let weatherResponse = await axios.get(weatherAPI_URL);
    const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
    // const weatherArray = cityObject.data.map(day => new Forecast(day.valid_date, day.weather.description, day.min_temp, day.max+temp));
    response.status(200).send(weatherArr);
  } catch (error) {
    response.status(500).send('no city found');
  }
  //passes in the found city (cityObject) and if it exists, it will construct a new instance of forecast which returns the info we need.  If the city isn't fouund from our find method above, it will return an error message.
});

class Forecast{
  //create properties for class (Forecast)
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;
    this.minTemp = day.min_temp;
    this.maxTemp = day.max_temp;
  }
};
//functional class that changes the shape of the city object data, by giving it date and description properties.

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
