
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.decimal('soc', 3, 3) //percentage
    t.decimal('revenue', 9, 3) //dollars
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('soc')
    t.dropColumn('revenue')
  })
};
