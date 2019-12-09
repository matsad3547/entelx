
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('power')
    t.dropColumn('energy')
    t.dropColumn('lat')
    t.dropColumn('lng')
  })
  .then( () => knex.schema.table('project', t => {
      t.decimal('power', 6, 3).notNullable()
      t.decimal('energy', 6, 3).notNullable()
      t.decimal('lat', 9, 5).notNullable()
      t.decimal('lng', 9, 5).notNullable()
    })
  )
};

exports.down = function(knex, Promise) {

};
