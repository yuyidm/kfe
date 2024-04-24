const webpack = require('webpack');
const {ENV, getNodeEnv, resolve, lodash} = require('@kfe/utils');
const {MFSU} = require('@umijs/mfsu');
// eslint-disable-next-line import/no-unresolved
const {polyfillNode} = require('esbuild-plugin-polyfill-node');
const {getUserConfig, getWebpackConfig, getMfConfig, getWebpackDepConfig} = require('./config');
const {scriptRule} = require('./webpack/parts/js.rules');
const {mergeBabelConfig} = require('./mergeBabelConfig');

function ensureSerializableValue(obj) {
  return JSON.parse(
    JSON.stringify(
      obj,
      (_key, value) => {
        if (typeof value === 'function' || value instanceof RegExp) {
          return value.toString();
        }
        return value;
      },
      2,
    ),
  );
}

function extendedBabelPlugin(webpackConfig, mfsu) {
  if (mfsu) {
    const config = mergeBabelConfig(
      webpackConfig,
      scriptRule({
        babelConfig: {
          plugins: mfsu.getBabelPlugins(),
        },
      }),
    );
    lodash.forOwn(webpackConfig, function (_v, key) {
      delete webpackConfig[key];
    });
    lodash.assign(webpackConfig, config);
  }
}

const setup = async () => {
  const config = getUserConfig();
  const webpackConfig = getWebpackConfig(config);
  const mfConfig = getMfConfig(config);
  const depConfig = getWebpackDepConfig(config);

  let mfsu = null;

  const enableMFSU = mfConfig.mfsu !== false;
  if (enableMFSU) {
    mfsu = new MFSU({
      mfName: mfConfig.mfsu?.mfName || 'mfsu',
      tmpBase: mfConfig.mfsu?.cacheDirectory || resolve('node_modules/.cache/mfsu'),
      unMatchLibs: mfConfig.mfsu?.exclude,
      shared: mfConfig.mfsu?.shared,
      remoteAliases: mfConfig.mfsu?.remoteAliases,
      remoteName: mfConfig.mfsu?.remoteName,
      implementor: webpack,
      buildDepWithESBuild: mfConfig.mfsu?.esbuild || true,
      depBuildConfig: {
        ...(mfConfig.mfsu?.depBuildConfig || {}),
        modifyConfig(opts) {
          opts.plugins.push(polyfillNode());
          mfConfig.mfsu?.depBuildConfig?.modifyConfig?.(opts);
        },
      },
      getCacheDependency() {
        return ensureSerializableValue({
          version: require('../package.json').version,
          mfsu: mfConfig.mfsu,
          resolve: mfConfig.resolve,
          output: mfConfig.output,
        });
      },
    });
  }

  extendedBabelPlugin(webpackConfig, mfsu);

  await mfsu?.setWebpackConfig({
    config: webpackConfig,
    depConfig,
  });

  return {
    mfsu,
    webpackConfig,
    devServerConfig: config.devServer,
  };
};

module.exports = {
  setup,
};
