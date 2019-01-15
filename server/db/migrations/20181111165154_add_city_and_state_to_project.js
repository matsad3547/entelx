
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.string('city')
    t.string('state')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('city')
    t.dropColumn('state')
  })
};
