const moment = require('moment-timezone')

const { setExitListeners } = require('../../utils/')

const { fiveMinutesMillis } = require('../../config/')

const {
  getFiveMinutesFromNow,
  getOneMinuteAgo,
  getFirstUpdateMillis,
} = require('./utils/')

const {
  readTableRows,
  updateTableRow,
  deleteTableRowsWhereNot,
} = require('../../db/')

const updatePriceData = require('./updatePriceData')

// const scheduleUpdatePriceData = (
//   nodeData,
//   firstUpdate,
// ) => {
//
//   timeout = setTimeout( () => {
//     let now = moment().tz(timeZone)
//
//     endMillis = getFiveMinutesFromNow(now)
//     startMillis = getOneMinuteAgo(now)
//
//     console.log(`starting price data update at ${now.valueOf()}`)
//
//     return updatePriceData(
//       nodeData,
//       endMillis,
//       startMillis,
//     )
//     .then( () => {
//
//       console.log('at then...');
//
//       const getPriceDataOnInterval = () => {
//         setInterval( () => {
//
//           now = moment().tz(timeZone)
//
//           endMillis = getFiveMinutesFromNow(now)
//           startMillis = getOneMinuteAgo(now)
//
//           console.log(`price data update at ${now.valueOf()}`)
//
//           return updatePriceData(
//             nodeData,
//             endMillis,
//             startMillis,
//           )
//           .then( () => {
//
//             const sixMosAgo = now.clone()
//             .subtract(180, 'days')
//             .valueOf()
//
//             console.log('gonna check for data older than 6 mos');
//             //TODO delete data more than 6 mos. old
//           })
//           .then( () => getPriceDataOnInterval() )
//           .catch( err => {
//             console.error(`There was an error updating price data at ${now.valueOf()}:`, err)
//             if (err) throw err
//           })
//
//         },fiveMinutesMillis)
//       }
//       getPriceDataOnInterval()
//     })
//     .catch( err => {
//       console.error(`There was an error on the first price data update at ${now.valueOf()}:`, err)
//       if (err) throw err
//     })
//   }, firstUpdate)
// }

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

let firstUpdateTimeout, continuousTimeout, endMillis, startMillis, firstUpdate

const cleanUp = code => {
  console.log(`exiting "updatePriceData" for ${name}\n exit code: ${code}` );
  // interval && clearInterval(interval)
  firstUpdateTimeout && clearTimeout(firstUpdateTimeout)
  continuousTimeout && clearTimeout(continuousTimeout)
}

process.on('exit', cleanUp)

return readTableRows('node', {id,})
  .then( nodeRes => {

    const nodeData = nodeRes[0]

    const nowMillis = moment().tz(timeZone).valueOf()

    const lastDataAgoMillis = nowMillis - mostRecent

    // if (lastDataAgoMillis > fiveMinutesMillis ) {
    //   console.log('backfilling previous data...')
    //
    //   endMillis = nowMillis + fiveMinutesMillis
    //   startMillis = lastDataAgoMillis + 1 * 60 * 1000
    //
    //   return updatePriceData(
    //     nodeData,
    //     endMillis,
    //     startMillis,
    //   )
    //   .then( mostRecent => {
    //
    //     firstUpdate = getFirstUpdateMillis(mostRecent) + (2 * 1000)
    //
    //     scheduleUpdatePriceData(
    //       nodeData,
    //       firstUpdate,
    //     )
    //   })
    // }
    // else {
    //   firstUpdate = fiveMinutesMillis - (nowMillis - mostRecent) + (2 * 1000)
    //   console.log('most recent:', mostRecent, '\nnow:', nowMillis, '\nfirst update:', firstUpdate );
    //
    //   scheduleUpdatePriceData(
    //     nodeData,
    //     firstUpdate,
    //   )
    // }
    firstUpdate = fiveMinutesMillis - (nowMillis - mostRecent) + (2 * 1000)

    console.log('most recent:', mostRecent, '\nnow:', nowMillis, '\nfirst update:', firstUpdate )

    firstUpdateTimeout = setTimeout( () => {
      let now = moment().tz(timeZone)

      endMillis = getFiveMinutesFromNow(now)
      startMillis = getOneMinuteAgo(now)

      console.log(`starting price data update at ${now.valueOf()}`)

      return updatePriceData(
        nodeData,
        endMillis,
        startMillis,
      )
      .then( () => {

        console.log('at then...');

        const getPriceDataOnInterval = () => {
          continuousTimeout = setTimeout( () => {
            console.log('running continuousTimeout');

            now = moment().tz(timeZone)

            endMillis = getFiveMinutesFromNow(now)
            startMillis = getOneMinuteAgo(now)

            console.log(`price data update at ${now.valueOf()}`)

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
            .then( () => getPriceDataOnInterval() )
            .catch( err => {
              console.error(`There was an error updating price data at ${now.valueOf()}:`, err)
              if (err) throw err
            })

          },fiveMinutesMillis)
        }
        getPriceDataOnInterval()
      })
      .catch( err => {
        console.error(`There was an error on the first price data update at ${now.valueOf()}:`, err)
        if (err) throw err
      })
    }, firstUpdate)

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
