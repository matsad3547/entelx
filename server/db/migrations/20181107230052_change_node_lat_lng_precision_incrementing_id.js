
exports.up = function(knex, Promise) {
  return knex.schema.table('node', t => {
    t.decimal('lat', 9, 5).notNullable
    t.decimal('lng', 9, 5).notNullable
    t.increments('id').primary()
  })
};

exports.down = function(knex, Promise) {

};
