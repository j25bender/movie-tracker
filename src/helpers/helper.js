import { apiKey } from './apiKey';
import { fetchApi } from './apiCalls';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const cleanMovies = (movieData) => {
  return movieData.results.map( movie => {
    return {
      title: movie.title,
      id: movie.id,
      poster: `${imageUrl}${movie.poster_path}`,
      overview: movie.overview
    }
  })
}

export const fetchMovies = async () => {
  try {
    const movieFetch = await fetchApi(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    return cleanMovies(movieFetch);
  } catch (error) {
    const error = new Error('fetchMovies failed to fetch data');
    throw error;
  }
}

//on login click
//make fetchcall 
//dispatch to store

export const fetchUser = async () => {
  try {
    return await fetchApi('/api/users/');
  } catch (error) {
    throw new Error('fetchMovies failed to fetch data');
  }
}

// export {
//   fetchMovies,
//   fetchUser
// }
