import { fetchMovies } from '../helpers/helper';

export const getMovies = movieData => ({
  type: 'GET_MOVIES',
  movieData
});

export const getMoviesFromApi = () => {
  return dispatch => {
    fetchMovies().then(movieData => dispatch(getMovies(movieData)));
  };
};

export const addUser = (name, email, password, userId) => ({
  type: 'ADD_USER',
  name,
  email,
  password,
  userId
});

export const getUser = (email, password, userId, name) => ({
  type: 'GET_USER',
  email,
  password,
  userId,
  name
});

export const login = boolean => ({
  type: 'LOGIN',
  boolean
});

export const setFavorites = favorites => ({
  type: 'SET_FAVORITES',
  favorites
});

export const hasErrored = boolean => ({
  type: 'HAS_ERRORED',
  boolean
})
