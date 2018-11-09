const db = require('../../store/')

const createProject = ({
  name,
  address,
  power,
  energy,
  lat,
  lng,
  type,
}) => db('project')
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
        .catch( err => console.error(`Error at createProject: ${err}`))

module.exports = createProject
