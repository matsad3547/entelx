const { knex } = require('../../db/')

const addControlArea = ({
  controlArea,
  name,
  fullName,
  lat,
  lng,
}) => knex('control_area')
        .insert({
          controlArea,
          name,
          fullName,
          lat,
          lng,
        })
        .debug()
        .catch( err => console.error(`Error at add control area: ${err}`))

module.exports = addControlArea
