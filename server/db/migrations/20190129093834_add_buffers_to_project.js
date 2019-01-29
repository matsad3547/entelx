
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.decimal('discharge_buffer', 3, 3) //percentage
    t.decimal('charge_buffer', 3, 3) //percentage
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('discharge_buffer')
    t.dropColumn('charge_buffer')
  })
};
