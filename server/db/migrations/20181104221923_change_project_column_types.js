
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('power')
    t.dropColumn('energy')
  })
  .then( () => knex.schema.table('project', t => {
      t.decimal('power').notNullable()
      t.decimal('energy').notNullable()
    })
  )
};

exports.down = function(knex, Promise) {

};
