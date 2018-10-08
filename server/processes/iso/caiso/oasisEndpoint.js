const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')

const { writeToFile } = require('../../../utils/')
const { getUrl } = require('./utils')

const oasisEndpoint = (
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  ) => new Promise( (resolve, reject) => {

  console.time(`CAISO ${query} request`)

  const url = getUrl(
    startMillis,
    endMillis,
    query,
    marketType,
    node,
  )

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
        .then( strJson => {
          console.timeEnd(`CAISO ${query} request`)
          resolve(strJson)
        })
    )
    .on('error', reject)
})

module.exports = oasisEndpoint
