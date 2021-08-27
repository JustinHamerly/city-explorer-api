const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { getWeather } = require('./weatherFetch');
const { getMovies } = require('./movieFetch');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
//allows us to let our front end talk to our back end.

app.get('/movies', getMovies);
app.get('/weather', getWeather);
// app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
