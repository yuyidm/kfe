const {merge} = require('webpack-merge');
const {scriptRule} = require('./parts/js.rules');

module.exports = merge(
  {
    devtool: 'source-map',
    optimization: {runtimeChunk: true},
    plugins: [],
  },
  scriptRule({
    exclude: /node_modules/,
    useThreadLoader: true,
  }),
);
