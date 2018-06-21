const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/webpack.dev.config');

const twitAuthentication = require('../client/actions/twitter').twitAuthentication;
// import express from 'express';
// import path from 'path';

// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack/webpack.dev.config';

// import { twitAuthentication } from '../client/actions/twitter';

let app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/data', (req, res) => {
  twitAuthentication(`${req.query.lat},${req.query.lng},1mi`, 100).then(result => {res.json(result)})
});

app.listen(process.env.PORT || 8080, () => console.log('Running server'))