var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');
require('dotenv').config()

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.join(parentDir, '/client/index.js')
    ],
    output: {
        path: parentDir + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
          },
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader", "less-loader"]
        },
        { 
          test: /\.json$/, 
          loader: 'json-loader' 
        },
        {test: /\.(png|jpg|gif|pdf)$/, loader: 'url-loader'}
      ]
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'CONSUMER_KEY':      JSON.stringify(process.env.CONSUMER_KEY),
            'CONSUMER_SECRET':   JSON.stringify(process.env.CONSUMER_SECRET),
            'ACCESS_TOKEN':      JSON.stringify(process.env.ACCESS_TOKEN),
            'ACCESS_TOKEN':      JSON.stringify(process.env.ACCESS_TOKEN_SECRET),
            'GOOGLE_MAPS_API': JSON.stringify(process.env.GOOGLE_MAPS_API)
          }
        })
    ],
    node: {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
}
