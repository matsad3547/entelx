const { getNodeLocations } = require('../../processes/iso/')

exports.seed = async (knex) => {
  try {
    await knex('node').del()

    const nodes = await getNodeLocations()

    const processedNodes = nodes.map( (node, i) => ({
      id: i + 1,
      score: 0,
      ...node
    })).filter( node => Math.abs(node.lat) <= 90 && Math.abs(node.lng) <= 180 )

    await knex('node').insert(processedNodes)
  } catch (err) {
    console.error(`There was an error seeding the "node" table:`, err)
  }
}
