const moment = require('moment-timezone')

const { getCurrentWeather } = require('../processes/')

const {
  readTableRows,
  readTableRowsWhereBtw,
} = require('../utils/')

const getDashboardData = (req, res) => {

  const { id } = req.params

  return readTableRows('project', {id,})
    .then( projectRes => {

      const project = projectRes[0]

      res.sseSetup()

      getData(res, project)

      const int = setInterval( () => {
        getData(res, project)
      }, 5 * 60 * 1000)

      req.on('close', () => {
        clearInterval(int)
        res.sseClose()
      })
    })
}

const getData = (res, project) => {

  const {
    lat,
    lng,
    timeZone,
    nodeId,
  } = project

  const now = moment().tz(timeZone)
  const endMillis = now.valueOf()
  const startMillis = now.clone()
    .subtract(1, 'hour')
    .valueOf()

  return Promise.all([
      getCurrentWeather(lat, lng),
      readTableRowsWhereBtw(
        'price',
        {nodeId,},
        'timestamp',
        [startMillis, endMillis],
      )
    ]
    .map( p => p.catch(handleMultiPromiseError) )
  )
  .then( data => {

    return res.sseSend({
      weather: data[0],
      prices: data[1],
    })
  })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
