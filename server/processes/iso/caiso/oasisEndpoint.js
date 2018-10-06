const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')
const { writeToFile } = require('../../../utils/')

const {
  getUrl,
  getParser,
} = require('./utils')

const oasisEndpoint = (
    startMillis,
    endMillis,
    query,
    parse = false,
    marketType,
    node,
    save = false
  ) => new Promise( (resolve, reject) => {

  console.time(`CAISO ${query} request`)

  const url = getUrl(
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  )

  console.log('url at caiso endpoint: ', url);

  const xmlOptions = {
    compact: true,
    spaces: 2
  }

  const parser = getParser(query)

  request(url)
    .pipe(unzipper.Parse())
    .on('entry', entry =>
      entry.buffer()
        .then( buffer => buffer.toString() )
        .then( str => convert.xml2json(str, xmlOptions) )
        .then( str => {
          const json = JSON.parse(str)
          console.timeEnd(`CAISO ${query} request`)
          resolve(parser(query, json))
      })
    )
    .on('error', reject)

  // stream
  //   .on('data', data => file.write(data) )
  //   .on('end', () => {
  //     file.end()
  //     fs.createReadStream(`${dir}/${fileName}`)
  //       .pipe(unzipper.Parse())
  //       .on('entry', entry => {
  //         entry.buffer()
  //         .then( buffer => buffer.toString() )
  //         .then( str => convert.xml2json(str, xmlOptions) )
  //         // write data to mocks for testing
  //         .then( obj => {
  //           if (save) {
  //             writeToFile(
  //               obj,
  //               'server/utils/test/mocks',
  //               'timeSeries.json'
  //             )
  //             // const mock = fs.createWriteStream('server/processes/iso/caiso/test/mocks/test.json')
  //             // mock.write(obj)
  //             // mock.end()
  //           }
  //           return obj
  //         })
  //         .then( str => {
  //           if(parse) {
  //             const json = JSON.parse(str)
  //             // writeToFile(
  //             //   JSON.stringify(parser(query, json)),
  //             //   'server/utils/test/mocks',
  //             //   'timeSeries.json'
  //             // )
  //             console.timeEnd(`CAISO ${query} request`)
  //             resolve(parser(query, json))
  //           }
  //           else {
  //             resolve(str)
  //           }
  //         })
  //       })
  //   })
  //   .on('error', reject)
})

module.exports = oasisEndpoint
