const db = require('../../store/')

const addControlArea = ({
  control_area,
  name,
  full_name,
  lat,
  lng,
}) => db('control_area')
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
