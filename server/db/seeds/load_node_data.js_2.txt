const { getNodeLocations } = require('../../processes/iso/')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('node').del()
    .then(function () {

      return getNodeLocations()
        .then( nodes => knex('node').insert(nodes) )
    });
};
