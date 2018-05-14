import qs from 'qs' // Add this at the top of the file
import express from 'express';
import path from 'path';
import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ServerRouter as Router, Route, Link } from 'react-router-dom';
import thunk from 'redux-thunk';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.dev.config';

import { renderToString } from 'react-dom/server'
import { twitAuthentication } from '../client/actions/twitter';
import rootReducer from '../client/reducers/index';
import App from '../client/containers/App';

let app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

// app.use(handleRender)
// function handleRender(req, res) {
//   const params = qs.parse(req.query)
//   const tweetsByQuery = parseInt(params.counter, 10) || 0
//   let preloadedState = { tweetsByQuery: {} }
//   const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))
//   const html = renderToString(
//     <Provider store={store}>
//       <App/>
//     </Provider>
//   )
//   const finalState = store.getState()
//   res.send(renderFullPage(html, finalState))
// }

// function renderFullPage(html, preloadedState) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Redux Universal Example</title>
//       </head>
//       <body>
//         <div id="app">${html}</div>
//         <script>
//           // WARNING: See the following for security issues around embedding JSON in HTML:
//           // http://redux.js.org/recipes/ServerRendering.html#security-considerations
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//         </script>
//         <script type="text/javascript" src="/bundle.js"></script>
//       </body>
//     </html>
//     `
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/data', (req, res) => {
  twitAuthentication('35.7596,-79.0193,1mi', 100).then(result => {res.json(result)})
});

app.listen(8080, () => console.log('running on 8080'))