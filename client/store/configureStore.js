import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/index';

const preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const middlewareBuilder = () => {

  let middleware = {};
  let universalMiddleware = [thunk];
  let allComposeElements = [];

  if (process.browser) {
    if (process.env.NODE_ENV === 'development') {
      middleware = applyMiddleware(...universalMiddleware,createLogger());
      allComposeElements = [
        middleware,
      ]
    } else {
      middleware = applyMiddleware(...universalMiddleware);
      allComposeElements = [
        middleware,
      ]
    }
  } else {
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ]
  }

  return allComposeElements;

}

// const finalCreateStore = compose(...middlewareBuilder())(createStore);

// export default function configureStore(initialState) {
//   return finalCreateStore(rootReducer, initialState);
// }


export default function configureStore(initialState) {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
