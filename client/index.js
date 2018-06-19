require('../public/styles.css');
require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './containers/App';

import rootReducer from './reducers'
import configureStore from './store/configureStore';

const store = configureStore();

// const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept();
}

