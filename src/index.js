import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';


const store = createStore(rootReducer,
                          applyMiddleware(thunk));

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
