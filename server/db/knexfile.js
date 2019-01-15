require('dotenv').config({path: '../../.env'})

const {
  convertObj,
  camelToSnake,
} = require('./utils/').conversions

module.exports = {
  client: process.env.DB_CONNECTION,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  pool: {
    min: 0,
    max: 9,
  },
  wrapIdentifier: value => camelToSnake(value),
  postProcessResponse: result => Array.isArray(result) ? result.map(row => convertObj(row)) : convertObj(result),
}
