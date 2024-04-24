const {merge} = require('webpack-merge');
const {scriptRule} = require('./parts/js.rules');

module.exports = merge(
  {
    watchOptions: {
      ignored: /node_modules/,
    },
    devtool: 'source-map',
  },
  scriptRule({
    exclude: /node_modules/,
  }),
);
