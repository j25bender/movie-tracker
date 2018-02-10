import { apiKey } from './apiKey';
import { fetchApi, postBackend } from './apiCalls';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const cleanMovies = movieData => {
  return movieData.results.map(movie => {
    return {
      title: movie.title,
      id: movie.id,
      poster: `${imageUrl}${movie.poster_path}`,
      overview: movie.overview
    };
  });
};

export const fetchMovies = async () => {
  try {
    const movieFetch = await fetchApi(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    );
    return cleanMovies(movieFetch);
  } catch (error) {
    throw new Error('fetchMovies failed to fetch data');
  }
};

const findRequestedUser = (allUsers, email) => {
  return allUsers.data.find(user => {
        return user.email === email;
      });
}

export const fetchUser = async (email) => {
  try {
    const allUsers = await fetchApi('/api/users/');
    return findRequestedUser(allUsers, email);
  } catch (error) {
    throw new Error('fetchUser failed to fetch data');
  }
};

export const postNewUser = async (body) => {
  try {
    return await postBackend('/api/users/new', body)
  } catch (error) {
    throw new Error(`postNewUser failed to post to backend: ${error}`)
  }
}

