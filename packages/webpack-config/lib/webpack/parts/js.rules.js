const {delNul} = require('@kfe/utils');
const babel = require('../babel.config');

function scriptRule({
  test = /\.jsx?$/,
  include,
  exclude,
  // thread loader
  babelConfig = babel,
  useThreadLoader = false,
  use = [],
} = {}) {
  return {
    module: {
      rules: [
        delNul({
          test,
          include,
          exclude,
          use: [
            useThreadLoader
              ? {
                  loader: require.resolve('thread-loader'),
                  options: {
                    poolTimeout: 2000,
                  },
                }
              : null,
            {
              loader: require.resolve('babel-loader'),
              options: babelConfig,
            },
          ]
            .concat(use)
            .filter(Boolean),
        }),
      ],
    },
  };
}

module.exports = {
  scriptRule,
};
