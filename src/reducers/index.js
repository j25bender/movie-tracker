import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';


const rootReducer = combineReducers({
  movieData: movieReducer,
  userData: userReducer,
  loggedIn: loginReducer 
});

export default rootReducer;
