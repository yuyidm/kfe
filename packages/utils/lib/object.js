const {omitBy, isNil} = require('lodash');

const delNul = obj => omitBy(obj, isNil);

module.exports = {
  delNul,
};
