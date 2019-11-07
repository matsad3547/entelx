
exports.up = async knex => {
  await knex.schema.table('project', t => {
    t.dropColumn('soc')
  })

  await knex.schema.table('project', t => {
    t.decimal('charge', 6, 3)
  })
};

exports.down = async knex => {
  await knex.schema.table('project', t => {
    t.dropColumn('charge')
  })

  await knex.schema.table('project', t => {
    t.decimal('soc', 3, 3)
  })
};
