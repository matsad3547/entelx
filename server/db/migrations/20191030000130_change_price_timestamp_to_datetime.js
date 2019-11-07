const moment = require('moment-timezone')

const { getDBDatetime } = require('../../utils/')

exports.up = async knex => {
  await knex.schema.table('price', t => {
    t.datetime('timestamp_temp')
  })

  const convertToDatetime = price => {
    const { timestamp } = price

    const dateTime = getDBDatetime(moment(timestamp).toISOString())

    return knex('price')
      .where({timestamp, })
      .update({timestamp_temp: dateTime})
  }

  const prices = await knex('price')

  await Promise.all(prices.map(convertToDatetime))
};

exports.down = async knex => {

  await knex.schema.table('price', t => {
    t.dropColumn('timestamp_temp')
  })
};
