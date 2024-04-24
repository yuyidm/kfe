module.exports = async function run() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const {setup, createServer} = require('@kfe/webpack-config');
  const {mfsu, webpackConfig, devServerConfig} = await setup();
  const server = createServer({
    webpackConfig,
    ...devServerConfig,
    beforeMiddlewares: [
      ...(mfsu ? mfsu.getMiddlewares() : []),
      ...(devServerConfig.beforeMiddlewares || []),
    ],
  });
  const runServer = async () => {
    await server.start();
  };
  runServer();
};
