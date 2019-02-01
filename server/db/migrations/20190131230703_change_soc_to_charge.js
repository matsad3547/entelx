
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('soc')
  })
  .then( () => knex.schema.table('project', t => {
      t.decimal('charge', 6, 3)
    })
  )
};

exports.down = function(knex, Promise) {

};
