import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';
import { favoritesReducer } from './favoritesReducer';

const rootReducer = combineReducers({
  movieData: movieReducer,
  userData: userReducer,
  loggedIn: loginReducer,
  favorites: favoritesReducer
});

export default rootReducer;
