
exports.up = function(knex, Promise) {
  return knex.schema.table('price', t => {
    t.string('node').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('price', t => {
    t.dropColumn('node')
  })
};
