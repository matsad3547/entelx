require('dotenv').config({path: '../../.env'})

module.exports = {
  client: process.env.DB_CONNECTION,
  connection: {
    user: process.env.DB_USER,
    // TODO Password is not brought from env when running migrations
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
}
