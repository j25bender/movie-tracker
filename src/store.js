import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default () => createStore(rootReducer, applyMiddleware(logger, thunk));
