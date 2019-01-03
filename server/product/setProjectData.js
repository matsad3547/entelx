const moment = require('moment-timezone')
const { spawn } = require('child_process')

const { getPriceRequest } = require('../processes/')

const {
  calculateDerivedData,
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../utils/')

const { dayOf5Mins } = require('../config/')

// This function needs to do the following:
// 1. Choose the request to use
// 2. Request the init 3 weeks of data
// 3. Calculate timeseries elements from the data
// 4. Calculate aggregate elements from the data
// 5. Update the project table
// 6. Update the node table
// 7. Remove price data that goes to other nodes
// 8. Initiate the function that adds data every 5 minutes
// 9. Initiate the function that will fill out 6 mos of data

// Other required pieces:
// 1. Get new data every 5 mins and calculate timeseries elements, remove data older than 6 mos
// 2. Get new data by 3 week blocks and calculate timeseries elements, until there is 6 mos of data
// 3. Remove all data from the db that has a different node from the one just added

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
        {current_avg: currentAvg},
      ),
      updateTableRow(
        'project',
        {id: projectId},
        {
          charge_threshold: chargeThreshold,
          discharge_threshold: dischargeThreshold,
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
  .then( () => {
    const args = JSON.stringify({
      node,
    })

    const child = spawn('node', ['server/processes/price/updatePriceData.js', args], {
      stdio: 'inherit',
    })

    child.on('error', err => console.error('there was an error:', err) )

    child.unref();
    console.log('things are happening');
  })
  .catch( err => {
    console.error('There was an error getting the running average:', err)
    throw new Error(err)
  })
}

module.exports = setProjectData
