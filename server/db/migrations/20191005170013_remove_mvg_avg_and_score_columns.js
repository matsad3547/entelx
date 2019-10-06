
exports.up = knex => knex.schema.table('price', t => {
  t.dropColumn('mvg_avg')
  t.dropColumn('score')
})

exports.down = knex => knex.schema.table('project', t => {
  t.decimal('mvg_avg', 7, 3)
  t.decimal('score', 7, 3)
})
