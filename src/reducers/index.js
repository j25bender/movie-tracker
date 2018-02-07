import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';


const rootReducer = combineReducers({
  movieData: movieReducer,
  userData: userReducer
});

export default rootReducer;
