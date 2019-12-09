exports.up = async knex => {
  await knex.schema.table('node', t => {
    t.dropColumn('current_avg')
  })
}

exports.down = async knex => {
  await knex.schema.table('node', t => {
    t.decimal('current_avg', 5, 2)
  })
}
