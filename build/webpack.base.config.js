const path = require('path');
const nodeExternals = require('webpack-node-externals');

const translateEnvToMode = (env) => {
  if (env === 'production') {
    return 'production';
  }
  return 'development';
};

module.exports = (env) => {
  return {
    target: 'electron-renderer',
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`),
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
        },
      ],
    },
  };
};
