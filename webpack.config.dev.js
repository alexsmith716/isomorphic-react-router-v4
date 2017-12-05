
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();
const autoprefixer = require('autoprefixer');
const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');

console.log('>>>>>>> webpack.config.dev.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);
//       path.join(__dirname, './client/assets/scss/global.scss'),

module.exports = {
  
  devtool: 'inline-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      //'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      'babel-polyfill',
      path.join(__dirname, './client/index.js')
    ],
    vendor: ['react', 'redux', 'react-dom']
  },

  output: {
    path: __dirname,
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    filename: '[name].js',
    // the filename template for entry chunks
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //chunkFilename: "[name].js",
    // chunkFilename: "[id].js",
    // chunkFilename: '[name].[chunkhash].js', // for long term caching
    // the filename template for additional chunks
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    publicPath: '/',
    // the url to the output directory resolved relative to the HTML page
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },


  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/,],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                    browsers: ['last 2 versions','IE >= 9','safari >= 8'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                    browsers: ['last 2 versions','IE >= 9','safari >= 8'],
                }),
              ],
            },
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};
