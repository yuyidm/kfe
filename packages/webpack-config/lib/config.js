const {merge} = require('webpack-merge');
const webpack = require('webpack');
const {ENV, lodash, resolve, exists, getNodeEnv} = require('@kfe/utils');

const webpackBase = require('./webpack/webpack.base');
const webpackDev = require('./webpack/webpack.dev');
const webpackProd = require('./webpack/webpack.prod');

const {isFunction, isObject, omit, pick} = lodash;

const USER_CONFIG_NAME = 'webpack.config.js';

function getUserConfig(mode = getNodeEnv()) {
  let preset;
  if (mode === ENV.production) {
    preset = merge(webpackBase, webpackProd, {mode});
  } else {
    preset = merge(webpackBase, webpackDev, {mode});
  }

  const configPath = resolve(USER_CONFIG_NAME);

  let config;
  if (!exists(configPath)) {
    config = preset;
  }
  const cfg = require(configPath);
  if (isFunction(cfg)) {
    config = merge(preset, cfg(webpack, preset));
  } else if (isObject(cfg)) {
    config = merge(preset, cfg);
  }

  return config;
}

function getMfConfig(opts) {
  return pick(opts, ['mfsu', 'resolve', 'output']);
}

function getWebpackConfig(config) {
  return omit(config, ['mfsu', 'devServer', 'cacheDirectoryPath']);
}

function getWebpackDepConfig(config) {
  return {
    output: {},
    plugins: [],
    ...pick(config, ['module', 'resolve']),
  };
}

module.exports = {
  getUserConfig,
  getWebpackConfig,
  getWebpackDepConfig,
  getMfConfig,
};
