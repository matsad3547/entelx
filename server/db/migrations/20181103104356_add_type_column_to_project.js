
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.string('type').notNullable
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('type')
  })
};
