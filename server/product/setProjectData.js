const moment = require('moment-timezone')

const {
  getPriceData,
  launchPriceUpdates,
} = require('../processes/')

const {
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../db/')

const {
  calculateDerivedData,
  catchErrorsWithMessage,
  handleMultiPromiseError,
} = require('../utils/')

const { dayOf5Mins } = require('../config/')

const setProjectData = async (node, project) => {

  const {
    id,
    timeZone,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  } = project

  const numDays = 21
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf() + (5 * 60 * 1000)
  const startMillis = now.clone()
                      .subtract(numDays, 'days')
                      .valueOf()

  const prices = await catchErrorsWithMessage(`There was an error getting present price data from ${startMillis} to ${endMillis}`, getPriceData)(startMillis, endMillis, node)

  const options = {
    period: numDays * dayOf5Mins,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const {
    aggregate,
  } = calculateDerivedData(prices, 'lmp', options)

  const {
    mean,
    chargeThreshold,
    dischargeThreshold,
  } = aggregate

  console.log('mean:', mean, 'chargeThreshold:', chargeThreshold, 'dischargeThreshold:', dischargeThreshold)

  await Promise.all([
      updateTableRow(
        'node',
        {id: node.id},
        {currentAvg: mean },
      ),
      updateTableRow(
        'project',
        {id, },
        {
          chargeThreshold,
          dischargeThreshold,
        },
      ),
      deleteTableRowsWhereNot(
        'price',
        {nodeId: node.id}
      ),
      createTableRows(
        'price',
        prices
      ),
    ].map( p => p.catch(handleMultiPromiseError) )
  )

  launchPriceUpdates({
    node,
    timeZone,
    projectId: id,
  })
}

module.exports = setProjectData
