const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (env) => {
  return merge(base(env), {
    entry: {
      background: './src/background.js',
      app: './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../app'),
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({clearConsole: env === 'development'}),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  });
};
