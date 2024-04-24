const ROOT = process.cwd();
const ENV = {
  production: 'production',
  development: 'development',
};

const getNodeEnv = () => process.env.NODE_ENV || ENV.development;
const isProd = () => getNodeEnv() === ENV.production;
const isDev = () => getNodeEnv() === ENV.development;
const resolve = (...paths) => require('path').resolve(process.cwd(), ...paths);

module.exports = {
  ROOT,
  ENV,
  getNodeEnv,
  isProd,
  isDev,
  resolve,
};
