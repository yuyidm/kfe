const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

function createServer({webpackConfig, beforeMiddlewares, afterMiddlewares, ...ext}) {
  const compiler = webpack(webpackConfig);
  return new WebpackDevServer(
    {
      // 本地开发域名解析
      allowedHosts: 'all',
      static: 'public',
    
      hot: true,
      client: {
        overlay: false,
      },
      setupMiddlewares(middlewares) {
        middlewares.unshift(...(beforeMiddlewares || []));
        middlewares.push(...(afterMiddlewares || []));
        return middlewares;
      },
      ...ext,
    },
    compiler,
  );
}

module.exports = {
  createServer,
};
