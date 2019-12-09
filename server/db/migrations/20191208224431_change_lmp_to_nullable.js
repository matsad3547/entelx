
exports.up = async knex => {
  await knex.schema.alterTable('price', t=> {
    t.decimal('lmp').alter()
  })
};

exports.down = async knex => {
  await knex.schema.alterTable('price', t=> {
    t.decimal('lmp').notNullable().alter()
  })
};
