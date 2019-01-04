
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('pid')
  })
  .then( () => knex.schema.table('project', t => {
      t.integer('pid')
    })
  )
};

exports.down = function(knex, Promise) {

};
