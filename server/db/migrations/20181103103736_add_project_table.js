
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', t => {
    t.integer('node_id').unsigned()
    t.foreign('node_id').references('id').inTable('node')
    t.increments('id').primary()
    t.decimal('power', 6, 3).notNullable()
    t.decimal('energy', 6, 3).notNullable()
    t.string('name').notNullable()
    t.string('address')
    t.string('type').notNullable()
    t.decimal('lat', 9, 5).notNullable()
    t.decimal('lng', 9, 5).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('project')
};
