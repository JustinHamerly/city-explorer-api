'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

const { getWeather } = require('./modules/weatherFetch');
const { getMovies } = require('./modules/movieFetch');

app.use(cors());
//allows us to let our front end talk to our back end.

app.get('/movies', getMovies);
app.get('/weather', getWeather);
// app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
