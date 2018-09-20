const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')
const moment = require('moment-timezone')

const { caisoFormat } = require('../config/')

const caisoQueries = {
  '5minuteLmp': 'PRC_INTVL_LMP'
}

const getDateString = (startMillis, endMillis) => {
  const startDate = moment.tz(startMillis, 'Etc/GMT').format(caisoFormat)
  const endDate = moment.tz(endMillis, 'Etc/GMT').format(caisoFormat)
  return `&startdatetime=${startDate}&enddatetime=${endDate}`
}

const getUrl = (
  startMillis,
  endMillis,
  queryName,
  marketType = 'RTM',
  node = 'LAPLMG1_7_B2',
) => {
  const baseUrl =  'http://oasis.caiso.com/oasisapi/SingleZip'
  return `${baseUrl}?queryname=${queryName}${getDateString(startMillis, endMillis)}&version=1&market_run_id=${marketType}&node=${node}`
}

const caisoEndpoint = (
  startMillis,
  endMillis,
  query,
  marketType,
  node,
) => new Promise( (resolve, reject) => {

  const url = getUrl(startMillis, endMillis, 'PRC_INTVL_LMP')

  // const url = 'http://oasis.caiso.com/oasisapi/SingleZip?queryname=PRC_INTVL_LMP&startdatetime=20170919T07:00-0000&enddatetime=20170919T08:00-0000&version=1&market_run_id=RTM&node=LAPLMG1_7_B2'

  const stream = request(url)

  const dir = 'server/processes/downloads/'

  const fileName = 'caiso.zip'

  const file = fs.createWriteStream(dir + fileName)

  stream.on('data', data => file.write(data) )
    .on('end', () => {
      file.end()
      fs.createReadStream(dir + fileName)
        // .pipe(unzipper.Extract({path: 'server/processes/output'}))
        .pipe(unzipper.Parse())
        .on('entry', entry => {
          entry.buffer()
          .then( buffer => buffer.toString() )
          .then( str => convert.xml2json(str,
            {
              compact: true,
              spaces: 2
            })
          )
          .then(resolve)
        })
    })
    .on('error', reject)
})

module.exports = {
  caisoEndpoint,
  getUrl,
}
