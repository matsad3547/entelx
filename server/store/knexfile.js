require('dotenv').config({path: '../../.env'})
//
// const {
//   snakeToCamel,
//   camelToSnake,
// } = require('../utils/')
const snakeToCamel = snakeStr => snakeStr.toLowerCase()
  .replace(/(\_\w)/g, m => m[1].toUpperCase())


const camelToSnake = camelStr => camelStr.replace(/[A-Z]/g, m => ['_', m[0].toLowerCase()].join(''))

const convertObj = snakeObj => typeof snakeObj === 'object' ? Object
  .keys(snakeObj)
  .reduce( (obj, k) => ({
      ...obj,
      [snakeToCamel(k)]: snakeObj[k]
    }), {}) : snakeObj

module.exports = {
  client: process.env.DB_CONNECTION,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: '../migrations',
  },
  pool: {
    min: 0,
    max: 9,
  },
  wrapIdentifier: value => camelToSnake(value),
  postProcessResponse: result => Array.isArray(result) ? result.map(row => convertObj(row)) : convertObj(result),
}
