import fetchMovies from '../helpers/helper';

const getMovies = (movieData) => ({
  type: 'GET_MOVIES',
  movieData
})

export const addUser = (username, password) => ({
  type: 'ADD_USER',
  username,
  password
})

// export const getMoviesFromApi = () => {
//   return async (dispatch) => {
//     const movieData = await fetchMovies(movieData);
//     return await dispatch(getMovies(movieData));
//   }
// }

export const getMoviesFromApi = () => {
  return (dispatch) => {
    fetchMovies.fetchMovies()
    .then((movieData) => dispatch(getMovies(movieData)));
  }
}

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