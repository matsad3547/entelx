const knex = require('../../store/')

const addControlArea = ({
  control_area,
  name,
  full_name,
  lat,
  lng,
}) => knex('control_area')
        .insert({
          control_area,
          name,
          full_name,
          lat,
          lng,
        })
        .debug()
        .catch( err => console.error(`Error at add control area: ${err}`))

module.exports = addControlArea
