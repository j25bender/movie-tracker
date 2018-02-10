import { fetchMovies } from '../helpers/helper';

export const getMovies = movieData => ({
  type: 'GET_MOVIES',
  movieData
});

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

//could become toggleLogin
export const login = boolean => ({
  type: 'LOGIN',
  boolean
});

export const setFavorites = favorites => ({
  type: 'SET_FAVORITES',
  favorites
});

// export const getMoviesFromApi = () => {
//   return async (dispatch) => {
//     const movieData = await fetchMovies(movieData);
//     return await dispatch(getMovies(movieData));
//   }
// }

export const getMoviesFromApi = () => {
  return dispatch => {
    fetchMovies().then(movieData => dispatch(getMovies(movieData)));
  };
};

// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));

//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }

//                 dispatch(itemsIsLoading(false));

//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)))
//             .catch(() => dispatch(itemsHasErrored(true)));
//     };
// }
