const knex = require('../../store/')

const addProject = ({
  name,
  address,
  power,
  energy,
  lat,
  lng,
  type,
}) => knex('project')
        .insert({
          name,
          address,
          power,
          energy,
          lat,
          lng,
          type,
        })
        .debug()
        .returning('id')
        .catch( err => console.error(`Error at addProject: ${err}`))

module.exports = addProject
