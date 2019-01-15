
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.integer('pid').unsigned().notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('pid')
  })
};
