const moment = require('moment-timezone')

const {
  getPriceData,
  launchPriceUpdates,
} = require('../processes/')

const {
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../db/').connections
const {
  getPriceAggregateData,
} = require('../db/').queries

const {
  calculateDerivedData,
  catchErrorsWithMessage,
  handleMultiPromiseError,
  getDBDatetime,
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

  const numDays = 7
  const end = moment().tz(timeZone)
  const start = end.clone().subtract(numDays, 'days')

  const endMillis = end.valueOf() + (5 * 60 * 1000)
  const startMillis = start.valueOf()

  const prices = await catchErrorsWithMessage(`There was an error getting present price data from ${startMillis} to ${endMillis}`, getPriceData)(startMillis, endMillis, node)

  const options = {
    period: numDays * dayOf5Mins,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  await createTableRows('price', prices)

  const [startDatetime, endDatetime] = [start.toISOString(), end.toISOString()].map( iso => getDBDatetime(iso))

  const initAggregate = await getPriceAggregateData(startDatetime, endDatetime, node.id)

  const data = {
    timeSeries: prices,
    aggregate: initAggregate,
  }

  const {
    aggregate,
  } = calculateDerivedData(data, 'lmp', options)

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
    ].map( p => p.catch(handleMultiPromiseError) )
  )

  launchPriceUpdates({
    node,
    timeZone,
    projectId: id,
  })
}

module.exports = setProjectData
