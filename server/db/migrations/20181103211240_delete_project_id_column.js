
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.integer('id').notNullable
  })
};
