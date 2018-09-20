const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')
const moment = require('moment-timezone')

const { caisoFormat } = require('../config/')

const caisoReportKeys = {
  'PRC_INTVL_LMP': {
    'LMP_CONG_PRC': {
      output: 'congestionPrc',
    },
    'LMP_ENE_PRC': {
      output: 'energyPrc',
    },
    'LMP_LOSS_PRC': {
      output: 'lossPrc',
    },
    'LMP_PRC' : {
      output: 'lmp',
    },
  }
}

const parseCaisoData = (query, data) => {

  const reportArr = data.OASISReport.MessagePayload.RTO.REPORT_ITEM

  const keys = Object.keys(caisoReportKeys[query])

  const parsed = keys.reduce( (arr, k) => {
    const dataGroup = reportArr.find( obj => obj.REPORT_DATA[0].DATA_ITEM._text === k).REPORT_DATA

    const timeStamps = dataGroup.map( d => d.INTERVAL_START_GMT._text )

    const keyObj = caisoReportKeys[query][k]

    return arr.length === 0 ? timeStamps.map( ts => ({
        timestamp: ts,
        [keyObj.output]: dataGroup.find( d => d.INTERVAL_START_GMT._text === ts ).VALUE._text,
      })
    ) : arr.map(obj => ({
        ...obj,
        [keyObj.output]: dataGroup.find( d => d.INTERVAL_START_GMT._text === obj.timestamp ).VALUE._text,
      })
    )
  }, [])
  console.log('parsed:', parsed);
  //TODO convert time stamps to millis
  //TODO coerce string numbers to float
  return parsed
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

  console.log('url at caiso endpoint: ', url);
  const xmlOptions = {
    compact: true,
    spaces: 2
  }

  stream.on('data', data => file.write(data) )
    .on('end', () => {
      file.end()
      fs.createReadStream(dir + fileName)
        // .pipe(unzipper.Extract({path: 'server/processes/output'}))
        .pipe(unzipper.Parse())
        .on('entry', entry => {
          entry.buffer()
          .then( buffer => buffer.toString() )
          .then( str => convert.xml2json(str, xmlOptions) )
          // write data to mocks for testing

          // .then( obj => {
          //   const test = fs.createWriteStream('server/utils/mocks/lmp1.json')
          //   test.write(obj)
          //   test.end()
          //   return obj
          // })
          .then(resolve)
        })
    })
    .on('error', reject)
})

module.exports = {
  caisoEndpoint,
  getUrl,
  parseCaisoData,
}
