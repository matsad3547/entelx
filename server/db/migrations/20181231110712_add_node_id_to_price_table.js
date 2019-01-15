
exports.up = function(knex, Promise) {
  return knex.schema.table('price', t => {
    t.integer('node_id').unsigned().notNullable()
    t.foreign('node_id').references('id').inTable('node')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('price', t => {
    t.dropColumn('node_id')
  })
};
