
exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', t => {
    t.integer('id').notNullable
    t.integer('power').notNullable
    t.integer('energy').notNullable
    t.integer('node_id').notNullable
    t.string('name').notNullable
    t.string('address')
    t.decimal('lat').notNullable
    t.decimal('lng').notNullable
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('project')
};
