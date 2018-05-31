var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var utils = require('./utils');

var baseWebpackConfig = require('./webpack.water.base.conf');


var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  output: {
    filename: utils.outname() + '.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../emlogin'),
        to: '',
        ignore: ['.*', '*.md', '.vuepress/**/*', '*.test.*', 'emlogin.js']
      }
    ]),
  ]
})

module.exports = webpackConfig
