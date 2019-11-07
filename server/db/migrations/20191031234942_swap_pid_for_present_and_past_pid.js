
exports.up = async knex => {
  await knex.schema.table('project', t => {
    t.dropColumn('pid')
  })

  await knex.schema.table('project', t => {
    t.integer('past_update_pid')
    t.integer('present_update_pid')
  })
};

exports.down = async knex => {
  await knex.schema.table('project', t => {
    t.dropColumn('past_update_pid')
    t.dropColumn('present_update_pid')
  })

  await knex.schema.table('project', t => {
    t.integer('pid')
  })
};
