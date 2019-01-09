const moment = require('moment-timezone')

const getPriceRequest = require('./getPriceRequest')

const { setExitListeners } = require('../../utils/')

const {
  readTableRows,
  updateTableRow,
  createTableRows,
  deleteTableRowsWhereNot,
} = require('../../db/')

const { fiveMinutes } = require('../../config/')

const updatePriceData = (
  currentAvg,
  now,
) => {

  const endMillis = now.valueOf() + (5 * 60 * 1000)

  const startMillis = now.clone()
                      .subtract(1, 'minutes')
                      .valueOf()

  console.log(`${now.valueOf()} updating data...`);

  return req(
    ...params,
    startMillis,
    endMillis,
    name,
  )
  .then( data => {

    const dataWithAvg = data.map( obj => ({
        ...obj,
        mvgAvg: currentAvg,
        nodeId: id,
        score: (obj[key] - currentAvg) / currentAvg,
      })
    )

    return createTableRows(
      'price',
      dataWithAvg
    )
  })
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

const key = 'lmp'

const {
  req,
  params,
} = getPriceRequest(node)

return readTableRows('node', {id,})
  .then( nodeRes => {

    let int, timeout

    const { currentAvg } = nodeRes[0]

    const start = moment().tz(timeZone).valueOf()

    const firstUpdate = fiveMinutes - (start - mostRecent) + (2 * 1000)

    timeout = setTimeout( () => {
      let now = moment().tz(timeZone)

      return updatePriceData(currentAvg, now, 0)
        .then( () => {

          int = setInterval( () => {

            now = moment().tz(timeZone)

            return updatePriceData(currentAvg, now)
            .then( () => {

              const sixMosAgo = now.clone()
              .subtract(180, 'days')
              .valueOf()

              console.log('gonna check for data older than 6 mos');
              //TODO delete data more than 6 mos. old
            })
          }, fiveMinutes)
        })
    }, firstUpdate)

    const pid = process.pid

    const cleanUp = code => {
      console.log(`exiting "updatePriceData" for ${name}\n exit code: ${code}` );
      clearInterval(int)
      clearTimeout(timeout)
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
