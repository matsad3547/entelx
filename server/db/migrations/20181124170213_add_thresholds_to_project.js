exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.decimal('charge_threshold', 6, 2)
    t.decimal('discharge_threshold', 6, 2)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('charge_threshold')
    t.dropColumn('discharge_threshold')
  })
};
