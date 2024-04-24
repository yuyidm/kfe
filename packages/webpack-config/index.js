const webpack = require('webpack');
const {build} = require('./lib/build');
const {setup} = require('./lib/setup');
const {createServer} = require('./lib/createServer');

module.exports = {
  setup,
  build,
  createServer,
  webpack,
};
