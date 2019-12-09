
exports.up = async knex => {
  await knex.schema.table('price', t => {
    t.dropColumn('timestamp')
  })

  await knex.schema.table('price', t => {
    t.datetime('timestamp').notNullable()
  })
};

exports.down = async knex => {
  await knex.schema.table('price', t => {
    t.dropColumn('timestamp')
  })

  await knex.schema.table('price', t => {
    t.bigInteger('timestamp')
  })
};
