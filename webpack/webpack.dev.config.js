var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.join(parentDir, '/client/index.js')
    ],
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
        }
      ]
    },
    output: {
        path: parentDir + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
}
