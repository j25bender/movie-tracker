import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { user`Reducer } from './user`Reducer';


const rootReducer = combineReducers({
  movieData: movieReducer,
  userData: userReducer
});

export default rootReducer;