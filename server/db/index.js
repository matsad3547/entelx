// const knex = require('knex')(require('./knexfile'))
const knex = require('./knex')

const utils = require('./utils/')

// console.log('at index:', require('./knexfile'));

module.exports = {
  knex,
  utils,
}
