const webpack = require('webpack');
const {getUserConfig, getWebpackConfig} = require('./config');

const build = () => {
  const user = getUserConfig();
  const webpackConfig = getWebpackConfig(user);
  const compiler = webpack(webpackConfig);
  compiler.run(err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

module.exports = {
  build,
};
