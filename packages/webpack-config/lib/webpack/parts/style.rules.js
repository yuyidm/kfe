const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {isDev} = require('@kfe/utils');

function styleRule({
  test = /\.css$/,
  include,
  exclude,
  useThreadLoader = false,
  usePostcssLoader = false,
  useLessLoader = false,
  use = [],
} = {}) {
  return {
    module: {
      rules: [
        {
          test,
          include,
          exclude,
          use: [
            {
              loader: isDev()
                ? require.resolve('style-loader')
                : MiniCssExtractPlugin.loader,
            },
            useThreadLoader
              ? {
                  loader: require.resolve('thread-loader'),
                  options: {
                    poolTimeout: 2000,
                  },
                }
              : null,
            {
              loader: require.resolve('css-loader'),
            },
            usePostcssLoader
              ? {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [require.resolve('postcss-preset-env')],
                    },
                  },
                }
              : null,
            useLessLoader
              ? {
                  loader: require.resolve('less-loader'),
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                }
              : null,
          ]
            .concat(use)
            .filter(Boolean),
        },
      ],
    },
  };
}

module.exports = {
  styleRule,
};
