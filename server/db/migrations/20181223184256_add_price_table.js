
exports.up = function(knex, Promise) {
  return knex.schema.createTable('price', t => {
    t.foreign('node_id').references('id').inTable('node')
    t.timestamp('timestamp', false, 13).primary()
    t.decimal('lmp', 9, 5).notNullable()
    t.decimal('ghg_prc', 9, 5)
    t.decimal('energy_prc', 9, 5)
    t.decimal('congestion_prc', 9, 5)
    t.decimal('loss_prc', 9, 5)
    t.decimal('mvg_avg', 7, 3)
    t.decimal('score', 8, 5)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('price')
};
