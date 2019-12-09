
exports.up = knex => knex.schema.table('price', t => {
  t.dropColumn('mvg_avg')
  t.dropColumn('score')
})

exports.down = knex => knex.schema.table('project', t => {
  return Promise.all([
    knex.schema.hasColumn('price', 'mvg_avg').then( exists => !exists && t.decimal('mvg_avg', 7, 3)),
    knex.schema.hasColumn('price', 'score').then( exists => !exists && t.decimal('score', 7, 3)),
  ])
})
