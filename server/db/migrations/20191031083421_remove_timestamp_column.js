const moment = require('moment-timezone')

exports.up = async knex => {
  await knex.schema.table('price', t => {
    t.dropColumn('timestamp')
  })
};

exports.down = async knex => {

  await knex.schema.table('price', t => {
    knex.schema.hasColumn('price', 'timestamp').then( exists => !exists && t.bigInteger('timestamp'))
  })

  const prices = await knex('price')

  const convertToUnix = price => {

    const unix = moment(price.timestamp_temp).valueOf()
    return knex('price')
      .where({timestamp_temp: price.timestamp_temp})
      .update({timestamp: unix})
  }

  await Promise.all(prices.map(convertToUnix))
};
