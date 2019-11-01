require('dotenv').config({path: '../../.env'})

const {
  convertObj,
  camelToSnake,
  getISOFromDB,
} = require('./utils/').conversions

module.exports = {
  client: process.env.DB_CONNECTION || 'mysql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '',
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
  typeCast: (field, next) => {
    if (field.type === 'DATETIME') {
      return getISOFromDB(field.string())
    }
    else {
      return next()
    }
  },
  // TODO Try these rather than type casting
  // timezone: 'UTC',
  // dateStrings: true,
  debug: process.env.NODE_ENV === 'production',
}
