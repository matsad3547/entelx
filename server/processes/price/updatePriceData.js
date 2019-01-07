const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const { setExitListeners } = require('../../utils/')

const {
  readTableRows,
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../../db/').utils

const args = JSON.parse(process.argv[2])

const {
  node,
  timeZone,
  projectId,
} = args

const {
  id,
  name,
} = node

const key = 'lmp'

const {
  req,
  params,
} = getPriceRequest(node)

return readTableRows('node', {id,})
  .then( nodeRes => {
    const { currentAvg } = nodeRes[0]

    const int = setInterval( () => {

      const now = moment().tz(timeZone)

      const endMillis = now.valueOf()

      const startMillis = now.clone()
                          .subtract(5, 'minutes')
                          .valueOf()

      const sixMosAgo = now.clone()
                          .subtract(180, 'days')
                          .valueOf()

      console.log('updating data...');
      // get data from now to 5 mins ago
      return req(
        ...params,
        startMillis,
        endMillis,
        name,
      )
      .then( data => {

        //calculate timeseries scores with the current average
        const dataWithAvg = data.map( obj => ({
          ...obj,
          mvgAvg: currentAvg,
          nodeId: id,
          score: (obj[key] - currentAvg) / currentAvg,
        })
      )

      // put that data into the data base w/ createTableRows
      return createTableRows(
        'price',
        dataWithAvg
      )
      .then( () => {
        console.log('gonna check for data older than 6 mos');
        //TODO delete data more than 6 mos. old
      })
    })
  }, 5 * 60 * 1000) //5 minutes

    const pid = process.pid

    const cleanUp = code => {
      console.log(`exiting "updatePriceData" for ${name}\n exit code: ${code}` );
      clearInterval(int)
    }

    process.on('exit', cleanUp)

    setExitListeners()

    return updateTableRow(
      'project',
      {id: projectId},
      {
        pid,
      },
    )
  })
