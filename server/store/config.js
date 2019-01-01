const configObj = require('./knexfile')

// const {
//   snakeToCamel,
//   camelToSnake,
// } = require('../utils/')

const config = {
  ...configObj,
  // wrapIdentifier: value => camelToSnake(value),
  // postProcessResponse: result => Array.isArray(result) ? result.map(row => snakeToCamel(row)) : snakeToCamel(result),
}

module.exports = config
