
exports.up = async function up(knex, Promise) {
  await knex.schema.table('user', t => t.dropColumn('password'))

};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', t => t.string('password').notNullable() )

};
