
exports.up = function(knex, Promise) {
  return knex.schema.createTable('node', t => {
    t.string('name').notNullable
    t.string('type')
    t.string('eim_area')
    t.decimal('lat')
    t.decimal('lng')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('node')
};
