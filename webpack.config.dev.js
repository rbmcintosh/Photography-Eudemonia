const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');

var port = 3000 + Math.floor(Math.random() * 999);

module.exports = {
  mode: "development",
  watch: true,
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
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "eslint-loader" },
          { loader: "babel-loader"  }
        ]
      },
      {
        test: /\.(s?css)$/,
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
      }
    ]
  },
  stats: {
      errors: true,
      errorDetails: true,
      colors: true,
      modules: true,
      children: true,
      chunks: false,
      chunkModules: false
  },
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    }),
    new BrowserSyncPlugin(
      {
        reload: false,
        notify: false,
        host: "localhost",
        port: 3001,
        proxy: "http://localhost:" + port,
      }
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: "[name].bundle.js",
    sourceMapFilename: 'bundle.map.js',
    // publicPath: "http://localhost:3001/"
  },
  devServer: {
    stats: "minimal",
    compress: false,
    port: port
  },
};
