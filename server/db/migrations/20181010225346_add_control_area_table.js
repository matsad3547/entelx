exports.up = function(knex, Promise) {
  return knex.schema.createTable('control_area', t => {
    t.string('control_area').notNullable
    t.string('name')
    t.string('full_name')
    t.decimal('lat')
    t.decimal('lng')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('control_area')
};
