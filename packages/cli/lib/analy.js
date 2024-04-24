const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const configure = require('./util/config');
const {env} = require('./util/env');

module.exports = async function analy() {
  const config = configure(env.PRODUCTION);
  config.cache = false;
  config.plugins.unshift(new BundleAnalyzerPlugin());
  const smp = new SpeedMeasurePlugin();
  const compiler = webpack(smp.wrap(config));
  compiler.run(err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};
