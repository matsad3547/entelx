const moment = require('moment-timezone')

const { setExitListeners } = require('../../utils/')

const { fiveMinutes } = require('../../config/')

const {
  getFiveMinutesFromNow,
  getOneMinuteAgo,
  getFirstUpdate,
} = require('./utils/')

const {
  readTableRows,
  updateTableRow,
  deleteTableRowsWhereNot,
} = require('../../db/')

const updatePriceData = require('./updatePriceData')

const scheduleUpdatePriceData = (
  nodeData,
  firstUpdate,
) => {
  timeout = setTimeout( () => {
    let now = moment().tz(timeZone)

    endMillis = getFiveMinutesFromNow(now)
    startMillis = getOneMinuteAgo(now)

    console.log(`starting price data update at ${now.valueOf()}`, startMillis, endMillis)

    return updatePriceData(
      nodeData,
      endMillis,
      startMillis,
    )
    .then( mostRecent => {

      interval = setInterval( () => {

        now = moment().tz(timeZone)

        console.log(`price data update at ${now.valueOf()}`)

        endMillis = getFiveMinutesFromNow(now)
        startMillis = getOneMinuteAgo(now)

        console.log('endMillis:', endMillis, '\nstartMillis:', startMillis, '\nmost recent:', mostRecent);

        return updatePriceData(
          nodeData,
          endMillis,
          startMillis,
        )
        .then( () => {

          const sixMosAgo = now.clone()
          .subtract(180, 'days')
          .valueOf()

          console.log('gonna check for data older than 6 mos');
          //TODO delete data more than 6 mos. old
        })
        .catch( err => {
          console.error(`There was an error updating price data at ${now.valueOf()}:`, err)
          if (err) throw err
        })
      }, fiveMinutes)
    })
    .catch( err => {
      console.error(`There was an error on the first price data update at ${now.valueOf()}:`, err)
      if (err) throw err
    })
  }, firstUpdate)
}

const args = JSON.parse(process.argv[2])

const {
  node,
  timeZone,
  projectId,
  mostRecent,
} = args

const {
  id,
  name,
} = node

const pid = process.pid

setExitListeners()

//Ignore SIGUSR2 from nodemon restart
process.on('SIGUSR2', () => true )

let interval, timeout, endMillis, startMillis, firstUpdate

const cleanUp = code => {
  console.log(`exiting "updatePriceData" for ${name}\n exit code: ${code}` );
  clearInterval(interval)
  clearTimeout(timeout)
}

process.on('exit', cleanUp)

return readTableRows('node', {id,})
  .then( nodeRes => {

    const nodeData = nodeRes[0]

    const start = moment().tz(timeZone).valueOf()

    const lastDataAgo = start - mostRecent

    if (lastDataAgo > fiveMinutes ) {
      console.log('backfilling previous data...')

      endMillis = start + 5 * 60 * 1000
      startMillis = lastDataAgo + 1 * 60 * 1000

      return updatePriceData(
        nodeData,
        endMillis,
        startMillis,
      )
      .then( mostRecent => {

        firstUpdate = getFirstUpdate(mostRecent) + (2 * 1000)

        scheduleUpdatePriceData(
          nodeData,
          firstUpdate,
        )
      })
    }
    else {
      firstUpdate = getFirstUpdate(lastDataAgo) + (2 * 1000)

      scheduleUpdatePriceData(
        nodeData,
        firstUpdate,
      )
    }
    return updateTableRow(
      'project',
      {id: projectId},
      {pid,},
    )
    .catch( err => {
      console.error('There was an error setting the pid at updatePriceData:', err)
      if (err) throw err
    })
  })
  .catch( err => {
    console.error('There was an error reading the node table at updatePriceData:', err)
    if (err) throw err
  })
