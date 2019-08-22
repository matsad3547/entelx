const { getNodeLocations } = require('../../processes/iso/')

exports.seed = async (knex) => {
  await knex('node').del()

  const nodes = await getNodeLocations()

  await knex('node').insert(nodes)

  // return knex('node').del()
  //   .then( () => {
  //
  //     return knex('node').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });
}
