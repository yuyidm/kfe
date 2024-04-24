module.exports = async function run() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  require('@kfe/webpack-config').build();
};
