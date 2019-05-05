
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.enu('status', ['charge', 'discharge', 'standby'])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('status')
  })
};
