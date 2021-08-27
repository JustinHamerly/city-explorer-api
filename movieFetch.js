const axios = require('axios');

async function getMovies (request, response) {
  let searchQuery = request.query.searchQuery;
  const movieKey = process.env.MOVIE_API_KEY;
  let movieAPI_URL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;

  try{
    let movieResponse = await axios.get(movieAPI_URL);
    const movieArr = movieResponse.data.results.map(movie => new Movie(movie));
    response.status(200).send(movieArr);
    console.log(movieArr);
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
