// const config = require('./config')

// const knex = require('knex')(config)
const knex = require('knex')(require('./knexfile'))

// const {
//   snakeToCamel,
//   camelToSnake,
// } = require('../utils/')

console.log('at index:', require('./knexfile'));

module.exports = knex
