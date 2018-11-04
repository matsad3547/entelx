
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.increments('id').primary()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('id')
  })
};
