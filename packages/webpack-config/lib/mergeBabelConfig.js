const {lodash} = require('@kfe/utils');
const {merge, mergeWithCustomize} = require('webpack-merge');

const mergeBabelConfig = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === 'module.rules') {
      return a.map(item => {
        const ext = lodash.filter(b, _b => lodash.toString(_b.test) === lodash.toString(item.test));
        if (ext && ext.length) {
          return mergeBabelConfig(item, ...ext);
        }
        return item;
      });
    }

    if (key === 'use') {
      return a.map(item => {
        if (item.loader.includes('babel-loader')) {
          return merge(item, ...b);
        }
        return item;
      });
    }
    return undefined;
  },
});

module.exports = {
  mergeBabelConfig,
};
