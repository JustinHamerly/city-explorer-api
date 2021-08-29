const axios = require('axios');
const cache = require('../cache');

async function getMovies (request, response) {
  let searchQuery = request.query.searchQuery;
  const movieKey = process.env.MOVIE_API_KEY;

  const mKey = 'movie'+searchQuery;

  let movieAPI_URL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;

  if (cache[mKey] && (Date.now() - cache[mKey].timestamp < 500000)){
    console.log('movie Cache hit');
  } else {
    console.log('movie Cache miss');
    try{
      cache[mKey] = {};
      cache[mKey].timestamp = Date.now();
      cache[mKey].data = await axios.get(movieAPI_URL);
    } catch (error) {
      cache[mKey] = undefined;
    }
  }

  try{
    let movieResponse = await axios.get(movieAPI_URL);
    const movieArr = movieResponse.data.results.map(movie => new Movie(movie));
    response.status(200).send(movieArr);
  } catch (error) {
    response.status(500).send('no movies!');
  }
}

class Movie{
  constructor(movie){
    this.title = movie.title;
    this.description = movie.overview;
    this.avgVote = movie.vote_average;
    this.totalVote = movie.vote_count;
    this.imageURL = movie.poster_path;
    this.popularity = movie.popularity;
    this.release = movie.release_date;
  }
}

module.exports = {getMovies: getMovies};
