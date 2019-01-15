
exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.bigInteger('start_date')
    t.bigInteger('end_date')
    t.integer('max_mw')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.dropColumn('start_date')
    t.dropColumn('end_date')
    t.dropColumn('max_mw')
  })
};
