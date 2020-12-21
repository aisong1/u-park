const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './client/index.jsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.m?(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          loader: 'style-loader',
        },
        {
          test: /\.css$/i,
          loader: 'css-loader',
          options: {
            modules: true,
          }
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
  };
};
