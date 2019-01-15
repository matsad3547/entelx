
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', t => {
    t.increments('id').primary()
    t.string('username').notNullable()
    t.string('password').notNullable()
    t.timestamps(false, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user')
}
