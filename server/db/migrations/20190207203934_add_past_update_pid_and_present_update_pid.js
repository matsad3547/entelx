
exports.up = function(knex, Promise) {
  return knex.schema.table('project', t => {
    t.dropColumn('pid')
  })
  .then( () => knex.schema.table('project', t => {
      t.integer('past_update_pid')
      t.integer('present_update_pid')
    })
  )
};

exports.down = function(knex, Promise) {

};
