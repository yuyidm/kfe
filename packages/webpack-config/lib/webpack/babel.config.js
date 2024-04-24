const {dirname} = require('path');

module.exports = {
  cacheDirectory: true,
  cacheCompression: false,
  exclude: [
    // \\ for Windows, \/ for Mac OS and Linux
    /node_modules[\\/]core-js/,
    /node_modules[\\/]webpack[\\/]buildin/,
  ],
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        // modules: false,
        targets: {
          browsers: ['> 1%', 'not ie < 11'],
        },
      },
    ],
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: 3,
        moduleName: '@babel/runtime-corejs3',
        absoluteRuntime: dirname(require.resolve('@babel/runtime-corejs3/package.json')),
      },
    ],
  ],
};
