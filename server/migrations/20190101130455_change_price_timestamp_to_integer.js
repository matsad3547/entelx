
exports.up = function(knex, Promise) {
  return knex.schema.table('price', t => {
    t.dropColumn('timestamp')
  })
  .then( () => knex.schema.table('price', t => {
      t.bigInteger('timestamp').notNullable
    })
  )
};

exports.down = function(knex, Promise) {

};
