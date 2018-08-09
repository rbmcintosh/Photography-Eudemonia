const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  root:     '/home/odin/projects/photographyEudemonia',
  // exclude:  ['static'],
  verbose:  true,
  dry:      false
}

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "htmllint-loader",
            options: {
              config: ".htmllintrc",
              failOnError: true,
              failOnWarning: false,
              minimize: true
            }
          },
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader', // inject CSS to page
          },{
            loader: 'css-loader', // translates CSS into CommonJS modules
          },{
            loader: 'sass-loader', // translates CSS into CommonJS modules
          },
        ]
      },
      {
          test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  useRelativePath: true,
                  // outputPath: 'static/fonts'
              }
          }]
      },
      {
          test: /\.(jpg|png)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  useRelativePath: true,
              }
          }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "eslint-loader" },
          { loader: "babel-loader" }
        ]
      },
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(js|html)/,
      exclude: /node_modules/
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new CopyWebpackPlugin([{
      from: 'src/sendMail.js',
			to: 'src'
		},{
      from: 'src/static/',
			to: 'static'
		}]),
    // new UglifyJsPlugin({
    //   test: /\.js($|\?)/i,
    //   exclude: /node_modules/
    // }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // filename: "./index.html",
      inject: "body"
    })
  ],
  stats: {
      errors: true,
      errorDetails: true,
      colors: true,
      modules: true,
      children: true,
      chunks: false,
      chunkModules: false
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    // publicPath: '/',
    filename: "[name].bundle.js",
    sourceMapFilename: '[name].map.js'
  }
};
