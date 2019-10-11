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

          const error = json['m:OASISReport'] &&
            json['m:OASISReport']['m:MessagePayload']['m:RTO']['m:ERROR']

          if(error !== undefined) {
            console.timeEnd(`CAISO ${url} request`)
            reject(`CAISO Oasis request ${url} failed with Oasis error:`, error['m:ERR_DESC']._text)
          }
          else {
            const parser = getParser(query)

            try {
              const parsed = parser(query, json)
              resolve(parsed)
            }
            catch (err) {
              console.log('OASIS response:', json)
              reject(`There was an issue parsing data in the Oasis request from ${query}:`, err)
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
