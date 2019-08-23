
exports.up = function(knex, Promise) {
  return knex.schema.createTable('node', t => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('type')
    t.string('eim_area')
    t.decimal('lat', 9, 5).notNullable()
    t.decimal('lng', 9, 5).notNullable()
    t.integer('score').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('node')
};
