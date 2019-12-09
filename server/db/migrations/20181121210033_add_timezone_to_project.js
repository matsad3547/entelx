
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.string('time_zone').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('time_zone')
  })
};
