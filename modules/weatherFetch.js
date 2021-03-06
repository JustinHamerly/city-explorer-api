const axios = require('axios');
const cache = require('../cache');

async function getWeather (request, response) {
  const weatherKey = process.env.WEATHER_API_KEY;
  let lat = request.query.lat;
  let lon = request.query.lon;

  const wKey = 'weatherLAT'+lat+'LON'+lon;

  // console.log((new Date(Date.now())).toDateString());

  let weatherAPI_URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}&days=5&format=json`;

  if (cache[wKey] && (Date.now() - cache[wKey].timestamp < 500000)){
    console.log('weather Cache hit');
  } else {
    console.log('weather Cache miss');
    try{
      cache[wKey] = {};
      cache[wKey].timestamp = Date.now();
      cache[wKey].data = await axios.get(weatherAPI_URL);
    } catch (error) {
      cache[wKey] = undefined;
    }
  }

  try{
    let weatherResponse = cache[wKey].data;
    const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
    // const weatherArray = cityObject.data.map(day => new Forecast(day.valid_date, day.weather.description, day.min_temp, day.max+temp));
    response.status(200).send(weatherArr);
  } catch (error) {
    response.status(500).send('no city found');
  }
  //passes in the found city (cityObject) and if it exists, it will construct a new instance of forecast which returns the info we need.  If the city isn't fouund from our find method above, it will return an error message.
}

class Forecast{
  //create properties for class (Forecast)
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;
    this.minTemp = day.min_temp;
    this.maxTemp = day.max_temp;
  }
}
//class that changes the shape of the city object data, by giving it date and description properties.

module.exports = {getWeather: getWeather};
