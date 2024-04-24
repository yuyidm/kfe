const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const {isDev, resolve} = require('@kfe/utils');
const {styleRule} = require('./parts/style.rules');
const {assetsRule} = require('./parts/assets.rules');

const base = {
  entry: resolve('src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm'],
  },
  output: {
    publicPath: '/',
    path: resolve('dist'),
    filename: isDev() ? 'main.js' : 'js/[name].[contenthash].js',
    assetModuleFilename: isDev()
      ? '[name][ext][query]'
      : 'assets/[contenthash][ext][query]',
    clean: true,
  },
  cache: {
    type: 'filesystem',
  },
  stats: 'errors-only',
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: resolve('index.html'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
      },
    }),
    isDev()
      ? null
      : new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css',
        }),
  ].filter(Boolean),
};

module.exports = merge(
  base,
  assetsRule(),
  styleRule({
    exclude: /node_modules/,
    useThreadLoader: true,
    usePostcssLoader: true,
  }),
  styleRule({
    include: /node_modules/,
    useThreadLoader: true,
  }),
  styleRule({
    test: /\.less$/,
    exclude: /node_modules/,
    usePostcssLoader: true,
    useLessLoader: true,
  }),
  styleRule({
    test: /\.less$/,
    include: /node_modules/,
    useLessLoader: true,
  }),
);
