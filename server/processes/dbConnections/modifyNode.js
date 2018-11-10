const knex = require('../../store/')

const modifyNode = data => {

  const {
    name,
    ...remainingData
  } = data

  return knex('node')
    .where({ name })
    .update(remainingData)
    .debug()
    .catch( err => console.error(`Error at modifyNode node: ${err}`))
}

module.exports = modifyNode
