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

  // await knex.schema.table('price', t => {
  //   knex.schema.hasColumn('price', 'timestamp').then( exists => exists && t.dropColumn('timestamp'))
  // })

  // await knex.schema.table('price', t => {
  //   t.timestamp('timestamp').notNullable()
  // })
  //
  // prices = await knex('price')
  //
  // const convertToTimestamp = price => {
  //   const { timestamp_temp } = price
  //
  //   return knex('price')
  //     .where({timestamp_temp, })
  //     .update({timestamp: timestamp_temp})
  // }
  //
  // await Promise.all(prices.map(convertToTimestamp))
  //
  // await knex.schema.table('price', t => {
  //   t.dropColumn('timestamp_temp')
  // })
};

exports.down = async knex => {
  // await knex.schema.table('price', t => {
  //   t.bigInteger('timestamp_temp').notNullable()
  // })
  //
  // const convertToUnix = price => {
  //   const { timestamp } = price
  //
  //   const unix = moment(timestamp).valueOf()
  //   return knex('price')
  //     .where({timestamp, })
  //     .update({timestamp_temp: unix})
  // }
  //
  // let prices = await knex('price')
  //
  // await Promise.all(prices.map(convertToUnix))
  //
  // await knex.schema.table('price', t => {
  //   t.dropColumn('timestamp')
  // })
  //
  // await knex.schema.table('price', t => {
  //   t.bigInteger('timestamp').notNullable()
  // })
  //
  // prices = await knex('price')
  //
  // const convertToTimestamp = price => {
  //   const { timestamp_temp } = price
  //
  //   return knex('price')
  //     .where({timestamp_temp, })
  //     .update({timestamp: timestamp_temp})
  // }
  //
  // await Promise.all(prices.map(convertToTimestamp))

  await knex.schema.table('price', t => {
    t.dropColumn('timestamp_temp')
  })
};
