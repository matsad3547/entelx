exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.integer('id').notNullable()
  })
  .then( () => knex('node') )
  .then( nodes => Promise.all(nodes.map((node, i) => setId(node, i, knex))) )
};

const setId = (node, i, knex) => {
  return knex('node')
    .where({ name: node.name })
    .update({ id: i + 1 })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.dropColumn('id')
  })
};
