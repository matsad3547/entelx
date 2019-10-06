
exports.up = knex => knex.raw(
  `create view price_with_mvg_avg as
    SELECT
      node_id,
      timestamp,
      lmp,
      AVG(lmp) OVER (ORDER BY timestamp ASC ROWS 6048 PRECEDING) AS mvg_avg
    FROM price`
  )

exports.down = knex => knex.raw(`drop view price_with_mvg_avg`)
