const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')

const { parsePriceData } = require('./parsers')
const { getUrl } = require('./utils')

const oasisEndpoint = (
    startMillis,
    endMillis,
    query,
    parse = false,
    marketType,
    node,
    save = false
  ) => new Promise( (resolve, reject) => {

  'http://oasis.caiso.com/oasisapi/SingleZip?queryname=ATL_APNODE&APnode_type=ALL&startdatetime=20130919T07:00-0000&enddatetime=20130920T07:00-0000&version=1'

  console.time(`CAISO ${query} request`)

  const url = getUrl(
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  )

  const stream = request(url)

  const dir = 'server/processes/downloads/'

  const fileName = 'caiso.zip'

  const file = fs.createWriteStream(dir + fileName)

  // console.log('url at caiso endpoint: ', url);

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
          // write data to mocks for testing
          .then( obj => {
            if (save) {
              const mock = fs.createWriteStream('server/config/mocks/apNodes.json')
              mock.write(obj)
              mock.end()
            }
            return obj
          })
          .then( str => {
            if(parse) {
              const json = JSON.parse(str)
              console.timeEnd(`CAISO ${query} request`)
              resolve(parsePriceData(query, json))
            }
            else {
              resolve(str)
            }
          })
        })
    })
    .on('error', reject)
})

module.exports = oasisEndpoint
