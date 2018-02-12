import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';
import { favoritesReducer } from './favoritesReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  movieData: movieReducer,
  userData: userReducer,
  loggedIn: loginReducer,
  favorites: favoritesReducer,
  hasErrored: errorReducer
});

export default rootReducer;
