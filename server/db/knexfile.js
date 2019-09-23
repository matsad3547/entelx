require('dotenv').config({path: '../../.env'})

const {
  convertObj,
  camelToSnake,
} = require('./utils/').conversions

module.exports = {
  client: process.env.DB_CONNECTION || 'mysql',
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
    afterCreate: (conn, done) => {
      // in this example we use pg driver's connection API
      conn.query('SET timezone="UTC";', err => {
        if (err) {
          // first query failed, return error and don't try to make next query
          console.error('There was an error connecting to the database')
          done(err, conn);
        } else {
          // do the second query...
          conn.query('SELECT set_limit(0.01);', err => {
            // if err is not falsy, connection is discarded from pool
            // if connection aquire was triggered by a query the error is passed to query promise
            done(err, conn)
          })
        }
      })
    }
  },
  wrapIdentifier: value => camelToSnake(value),
  postProcessResponse: result => Array.isArray(result) ? result.map(row => convertObj(row)) : convertObj(result),
  debug: process.env.NODE_ENV === 'production'
}
