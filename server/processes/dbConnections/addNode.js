const { knex } = require('../../db/')

const addNode = ({
  name,
  type,
  controlArea,
  lat,
  lng,
}) => knex('node')
        .insert({
          name,
          type,
          controlArea,
          lat,
          lng,
        })
        .debug()
        .catch( err => console.error(`Error at add node: ${err}`))

module.exports = addNode
