const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')

const { caisoFormat } = require('../config/')

const caisoQueries = {
  '5minuteLmp': 'PRC_INTVL_LMP'
}

const getDateString = (start, end) => {
  const startDate = start.format(caisoFormat)
  const endDate = end.format(caisoFormat)
  return `&startdatetime=${startDate}&enddatetime=${endDate}`
}

const getUrl = (
  start,
  end,
  queryName,
  marketType = 'RTM',
  node = 'LAPLMG1_7_B2',
) => {
  const baseUrl =  'http://oasis.caiso.com/oasisapi/SingleZip'
  return `${baseUrl}?queryname=${queryName}${getDateString(start, end)}&version=1&market_run_id=${marketType}&node=${node}`
}

const caisoEndpoint = (
  start,
  end,
  query,
  marketType,
  node,
) => new Promise( (resolve, reject) => {

  const url = getUrl(start, end, 'PRC_INTVL_LMP')

  // const url = `http://oasis.caiso.com/oasisapi/SingleZip?queryname=SLD_REN_FCST&market_run_id=DAM&startdatetime=20180819T07:00-0000&enddatetime=20180820T07:00-0000&version=1`

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
