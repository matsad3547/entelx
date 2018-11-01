const knex = require('../../store/')

const modifyNode = obj => {

  const {
    name,
    start_date,
    end_date,
    max_mw,
  } = obj

  return knex('node')
    .where({ name: name })
    .update({
      start_date,
      end_date,
      max_mw,
    })
    .debug()
    .catch( err => console.error(`Error at modifyNode node: ${err}`))
}

module.exports = modifyNode
