import qs from 'qs' // Add this at the top of the file
import express from 'express';
import path from 'path';
import React from 'react';
import fetch from 'cross-fetch'
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/data', (req, res) => {
  twitAuthentication(`${req.query.lat},${req.query.lng},1mi`, 100).then(result => {res.json(result)})
});

// app.get('/address', (req, res) => {
//   console.log(req.query.address)
//   let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_MAPS_API}`
//   fetch(url)
//     .then((response) => {
//       console.log('lolercopter', response)
//       res.json(response)
//     })
// })

app.listen(8080, () => console.log('running on 8080'))