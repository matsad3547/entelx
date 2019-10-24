
exports.up = knex => knex.raw(
  `create view price_with_score as
    SELECT
      node_id,
      timestamp,
      lmp,
      mvg_avg,
      (lmp - mvg_avg)/mvg_avg AS score
    FROM price_with_mvg_avg;`
  )

exports.down = knex => knex.raw(`drop view price_with_score`)
