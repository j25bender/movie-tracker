import { apiKey } from './apiKey';
import fetchApi from './apiCalls';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const cleanMovies = (movieData) => {
  console.log(movieData)
  return movieData.results.map( movie => {
    return {
      title: movie.title,
      id: movie.id,
      poster: `${imageUrl}${movie.poster_path}`,
      overview: movie.overview
    }
  })
}

const fetchMovies = async () => {
  const movieFetch = await fetchApi(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
  return cleanMovies(movieFetch);
}


export default {
  fetchMovies
}