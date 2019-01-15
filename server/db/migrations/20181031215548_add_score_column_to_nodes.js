exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.integer('score').notNullable()
  })
  .then( () => knex('node') )
  .then( nodes => Promise.all(nodes.map(node => setScore(node, knex))) )
};

const setScore = (node, knex) => {
  return knex('node')
    .where({ name: node.name })
    .update({ score: 0 })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.dropColumn('score')
  })
};
