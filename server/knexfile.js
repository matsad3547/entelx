const {
  NODE_ENV,
  PROD_DB_PASSWORD,
  DEV_DB_PASSWORD,
} = process.env

module.exports = {
  client: 'mysql',
  connection: {
    user: 'root',
    // TODO Password is not brought from env when running migrations
    password: 'password',
    // password: NODE_ENV === 'production' ? PROD_DB_PASSWORD : DEV_DB_PASSWORD,
    database: 'energy_storage_marketplace',
  }
}
