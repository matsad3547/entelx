const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')
const moment = require('moment-timezone')

const { caisoFormat } = require('../config/')

const caisoTZ = 'Etc/GMT'

const caisoDataItems = {
  'PRC_INTVL_LMP': {
    'LMP_CONG_PRC': {
      key: 'congestionPrc',
      format: val => parseFloat(val),
    },
    'LMP_ENE_PRC': {
      key: 'energyPrc',
      format: val => parseFloat(val),
    },
    'LMP_LOSS_PRC': {
      key: 'lossPrc',
      format: val => parseFloat(val),
    },
    'LMP_PRC' : {
      key: 'lmp',
      format: val => parseFloat(val),
    },
  }
}

const tsToMillis = ts => moment.tz(ts, caisoTZ).valueOf()

const parseCaisoData = (query, data) => {

  const reportItems = data.OASISReport.MessagePayload.RTO.REPORT_ITEM

  return reportItems.reduce( (arr, item) => {

    const dataItem = item.REPORT_DATA[0].DATA_ITEM._text

    const dataItemFormat = caisoDataItems[query][dataItem]

    item.REPORT_DATA.forEach( rd => {

      const hasTsIndex = arr.findIndex( obj =>
        obj.timestamp === tsToMillis(rd.INTERVAL_START_GMT._text) )

      hasTsIndex === -1 ?
      arr = [
        ...arr,
        {
          timestamp: tsToMillis(rd.INTERVAL_START_GMT._text),
          [dataItemFormat.key]: dataItemFormat.format(rd.VALUE._text),
        },
      ] :
      arr = [
        ...arr.slice(0, hasTsIndex),
        {
          ...arr[hasTsIndex],
          [dataItemFormat.key]: dataItemFormat.format(rd.VALUE._text)
        },
        ...arr.slice(hasTsIndex + 1),
      ]
    })

    return arr
  }, [])
}

const getDateString = (startMillis, endMillis) => {
  const startDate = moment.tz(startMillis, caisoTZ).format(caisoFormat)
  const endDate = moment.tz(endMillis, caisoTZ).format(caisoFormat)
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

  const url = getUrl(startMillis, endMillis, query)

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
        .pipe(unzipper.Parse())
        .on('entry', entry => {
          entry.buffer()
          .then( buffer => buffer.toString() )
          .then( str => convert.xml2json(str, xmlOptions) )
          // // write data to mocks for testing
          //
          // .then( obj => {
          //   const test = fs.createWriteStream('server/config/mocks/lmp2Day.json')
          //   test.write(obj)
          //   test.end()
          //   return obj
          // })
          .then( str => {
            const json = JSON.parse(str)
            resolve(parseCaisoData(query, json))
          })
        })
    })
    .on('error', reject)
})

module.exports = {
  caisoEndpoint,
  getUrl,
  parseCaisoData,
}
