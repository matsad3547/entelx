
exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.renameColumn('eim_area', 'control_area')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.renameColumn('control_area', 'eim_area')
  })
};
