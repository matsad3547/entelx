
exports.up = function(knex) {
  return knex.schema.table('project', t => {
    knex.schema.hasColumn('project', 'pid').then( exists => exists && t.dropColumn('pid'))
  })
  .then( () => {
    return knex.schema.table('project', t => {
      return Promise.all([
        knex.schema.hasColumn('project', 'past_update_pid').then( exists => !exists && t.integer('past_update_pid')),
        knex.schema.hasColumn('project', 'present_update_pid').then( exists => !exists && t.integer('present_update_pid')),
      ])
    }
  )}
)}

exports.down = function(knex) {
  return knex.schema.table('project', t => {
    return Promise.all([
      knex.schema.hasColumn('project', 'past_update_pid').then( exists => exists && t.dropColumn('past_update_pid')),
      knex.schema.hasColumn('project', 'present_update_pid').then( exists => exists && t.dropColumn('present_update_pid')),
    ])
  }).then( () => knex.schema.table('project', t => {
    return knex.schema.hasColumn('project', 'pid').then( exists => !exists && t.integer('pid'))
  })
)};
