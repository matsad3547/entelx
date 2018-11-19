
exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.decimal('current_avg', 5, 2).notNullable
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.dropColumn('current_avg')
  })
};
