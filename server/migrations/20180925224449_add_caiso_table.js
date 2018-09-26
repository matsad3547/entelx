
exports.up = function(knex, Promise) {
  knex.schema.withSchema('iso').createTable('caiso', t => {

  })
};

exports.down = function(knex, Promise) {

};
