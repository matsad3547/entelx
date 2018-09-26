
exports.up = function(knex, Promise) {
  return knex.schema.createTable('iso', t => {
    t.timestamps('created_at')
    t.string('name')
  })
};

exports.down = function(knex, Promise) {

};
