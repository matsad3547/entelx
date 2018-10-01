const knex = require('../../store')

const addNode = ({
  name,
  type,
  eim_area,
  lat,
  lng,
}) => knex('node')
        .insert({
          name,
          type,
          eim_area,
          lat,
          lng,
        })
        .debug()
        .catch( err => console.error(`Error at add node: ${err}`))

module.exports = addNode
