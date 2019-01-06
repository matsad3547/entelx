const moment = require('moment-timezone')

const { getCurrentWeather } = require('../processes/')

const { readTableRows } = require('../utils/')

const getDashboardData = (req, res) => {

  const { id } = req.params

  return readTableRows('project', {id,})
    .then( projectRes => {

      res.sseSetup()

      const {
        lat,
        lng,
        timeZone,
        nodeId,
      } = projectRes[0]

      const now = moment().tz(timeZone)
      const endMillis = now.valueOf()
      const startMillis = now.clone()
        .subtract(1, 'hour')
        .valueOf()

      let n = 0

      res.sseSend({things: `what - ${n}`,})

      const int = setInterval( () => {
        // run to send follow up data
        n++
        res.sseSend({things: `when - ${n}`,})
      }, 2 * 1000)
      // }, 5 * 60 * 1000)

      req.on('close', () => {
        clearInterval(int)
        res.sseClose()
      })
    })


  // const {
  //   name,
  //   currentAvg,
  // } = node
  //
  // const {
  //   req,
  //   params,
  // } = getPriceRequest(node)

  // return Promise.all([
  //     getCurrentWeather(lat, lng),
  //     // req(
  //     //   ...params,
  //     //   startMillis,
  //     //   endMillis,
  //     //   name,
  //     // ),
  //   ]
  //   .map( p => p.catch(handleMultiPromiseError) )
  // )
  // .then( data => {
  //
  //   // const dataWithAvg = data[1].map( obj => ({
  //   //     ...obj,
  //   //     mvgAvg: currentAvg,
  //   //   })
  //   // )
  //   //
  //   // const processedData = calculateScoreData(dataWithAvg, 'lmp')
  //
  //   return {
  //     weather: data[0],
  //     prices: data[1],
  //     // prices: processedData.timeSeries,
  //     // aggregate: processedData.aggregate,
  //   }
  // })
}

const handleMultiPromiseError = err => {
  console.error(`there was an error: ${err}`)
  return { error: `there was an error: ${err}`}
}

module.exports = getDashboardData
