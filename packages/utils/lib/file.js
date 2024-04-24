const {existsSync} = require('fs-extra');

const exists = function exists(path) {
  return existsSync(path);
};

module.exports = {exists};
