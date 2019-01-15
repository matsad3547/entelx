
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.decimal('rte', 3, 3)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('rte')
  })
};
