const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const {
  calculateDerivedData,
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../../utils/')

const args = JSON.parse(process.argv[2])

const {
  node,
  timeZone,
  projectId,
} = args

const {
  currentAvg,
  name,
} = node

const {
  req,
  params,
} = getPriceRequest(node)

const now = moment().tz(timeZone)

const endMillis = now.valueOf()

const startMillis = now.clone()
                    .subtract(5, 'minutes')
                    .valueOf()

const sixMosAgo = now.clone()
                    .subtract(180, 'days')
                    .valueOf()
let n = 0

const int = setInterval( () => {

  // get data from now to 5 mins ago
  console.log('doing a thing:', n);
  n++
  // req(
  //   ...params,
  //   startMillis,
  //   endMillis,
  //   name,
  // ),
  // .then( data => {
  //
  //   // THEN calculate timeseries scores with the current average
  //   const dataWithAvg = data.map( obj => ({
  //       ...obj,
  //       mvgAvg: currentAvg,
  //     })
  //   )
  //
  //   const processedData = calculateScoreData(dataWithAvg, 'lmp')
  //
  //   console.log('processedData:', processedData );
  //   // return {
  //   //   weather: data[0],
  //   //   prices: processedData.timeSeries,
  //   //   aggregate: processedData.aggregate,
  //   // }
  // })
  // put that data into the data base w/ createTableRows
  //THEN delete data more than 6 mos. old
}, 2 * 1000)
// }, 5 * 60 * 1000 //5 minutes)

const cleanUp = code => {
  console.log(`exiting "updatePriceData" for ${name}; exit code ${code}` );
  clearInterval(int)
}

const pid = process.pid

process.on('exit', cleanUp)

//catches ctrl+c event
process.on('SIGINT', cleanUp)

// catches "process.kill(<pid>)"
process.on('SIGTERM', cleanUp)

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', cleanUp)
process.on('SIGUSR2', cleanUp)

//catches uncaught exceptions
process.on('uncaughtException', cleanUp)

return updateTableRow(
  'project',
  {id: projectId},
  {
    pid,
  },
)
