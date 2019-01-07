const moment = require('moment-timezone')

const {
  getPriceRequest,
  launchPriceUpdater,
} = require('../processes/')

const {
  calculateDerivedData,
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../db/').utils

const { dayOf5Mins } = require('../config/')

const setProjectData = (node, projectId, timeZone) => {

  const numDays = 21
  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
                      .subtract(numDays, 'days')
                      .valueOf()

  const {
    req,
    params,
  } = getPriceRequest(node)

  return req(
    ...params,
    startMillis,
    endMillis,
    node.name,
  )
  .then( data => {
    const derivedData = calculateDerivedData(data, 'lmp', numDays * dayOf5Mins)

    const {
      timeSeries,
      aggregate,
    } = derivedData

    // TODO get these values from aggregate
    const chargeThreshold = 6.23
    const dischargeThreshold = 5.43

    const currentAvg = timeSeries[timeSeries.length - 1].mvgAvg

    return Promise.all([
      updateTableRow(
        'node',
        {id: node.id},
        {currentAvg, },
      ),
      updateTableRow(
        'project',
        {id: projectId},
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
        timeSeries.map( ts => ({
            ...ts,
            nodeId: node.id,
          })
        )
      ),
    ])
  })
  .then( () => launchPriceUpdater({
      node,
      timeZone,
      projectId,
    })
  )
  .catch( err => {
    console.error('There was an error getting the running average:', err)
    throw new Error(err)
  })
}

module.exports = setProjectData
