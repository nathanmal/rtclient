// Webpack version 4
const path                 = require('path');
const WebpackMd5Hash       = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const BrowserSyncPlugin    = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
  	index: './src/index.js',
  	demo: './src/demo.js'
  },
  
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  // Module Rules
  module: {

    rules: [
      // Javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // Check first for url:() paths in SASS
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
      }, 
      // Handle SVG files
      {
       test: /\.svg$/,
       use: [{
         loader: 'file-loader',
         options: {
           emitFile: true,
           name: '[name].[ext]',
           outputPath: 'images/',    
           publicPath: 'images/' 
         }
       }]
      },

      // SASS, CSS..
      {
        test: /\.[s]?css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      // Font files
      {
       test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
       use: [{
         loader: 'file-loader',
         options: {
           name: '[name].[ext]',
           outputPath: 'fonts/',    // where the fonts will go
           publicPath: 'fonts/'     // override the default path
         }
       }]
     },
    ]
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackMd5Hash(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      server: true
    })
  ]
};