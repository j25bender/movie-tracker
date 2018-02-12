import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';

export default () => createStore(rootReducer, applyMiddleware(thunk));
