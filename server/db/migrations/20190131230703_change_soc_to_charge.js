
exports.up = knex => {
  return knex.schema.table('project', t => {
     knex.schema.hasColumn('project', 'soc').then( exists => exists && t.dropColumn('soc'))
  })
  .then( () => knex.schema.table('project', t => {
    knex.schema.hasColumn('project', 'soc').then( exists => !exists && t.decimal('charge', 6, 3))
    })
  )
};

exports.down = knex => {
  return knex.schema.table('project', t => {
     knex.schema.hasColumn('project', 'charge').then( exists => exists && t.dropColumn('charge'))
  })
  .then( () => knex.schema.table('project', t => {
    knex.schema.hasColumn('project', 'soc').then( exists => !exists && t.decimal('soc', 3, 3))
    })
  )
};
