const convert = require('xml-js')
const unzipper = require('unzipper')
const request = require('request')

const {
  getUrl,
  getParser,
} = require('./utils')

const oasisEndpoint = (
  query,
  marketType,
  startMillis,
  endMillis,
  node,
) => new Promise( (resolve, reject) => {

  const url = getUrl(
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  )
  console.time(`CAISO ${url} request`)

  const xmlOptions = {
    compact: true,
    spaces: 2
  }

  request(url)
    .pipe(unzipper.Parse())
    .on('entry',
      entry => entry.buffer()
        .then( buffer => buffer.toString() )
        .then( str => convert.xml2json(str, xmlOptions) )
        .then( strJson => JSON.parse(strJson))
        .then( json => {
          const error = json['m:OASISReport'] && json['m:OASISReport']['m:MessagePayload']['m:RTO']['m:ERROR']

          if(error !== undefined) {
            console.timeEnd(`CAISO ${url} request`)
            const errorMsg = `Code ${error['m:ERR_CODE']._text}: ${error['m:ERR_DESC']._text}`
            reject(`CAISO Oasis request ${url} failed with Oasis error: ${errorMsg}`)
          }
          else {
            const parser = getParser(query)

            try {
              const parsed = parser(query, json)
              resolve(parsed)
            }
            catch (err) {
              console.log('OASIS response:', json)
              const errorMsg = `There was an error parsing data for CAISO Oasis request ${url}: ${err.toString()}`
              reject(errorMsg)
            }
            finally {
              console.timeEnd(`CAISO ${url} request`)
            }
          }
        })
    )
    .on('error', err => {
      console.timeEnd(`CAISO ${url} request`)
      reject(`CAISO Oasis request ${url} failed:`, err)
    })
})

module.exports = oasisEndpoint
