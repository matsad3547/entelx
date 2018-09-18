// const xmldoc = require('xmldoc')
const convert = require('xml-js')
const unzipper = require('unzipper')
const fs = require('fs')
const request = require('request')

const { checkStatus } = require('../utils/')

// reference: https://stackoverflow.com/questions/44013020/using-promises-with-streams-in-node-js

const caisoEndpoint = () => new Promise( (resolve, reject) => {

  const url = `http://oasis.caiso.com/oasisapi/SingleZip?queryname=SLD_REN_FCST&market_run_id=DAM&startdatetime=20180819T07:00-0000&enddatetime=20180820T07:00-0000&version=1`
  const stream = request(url)

  resolve(stream)

  // fetch(url)
  //   .then(res => res.body)
  //   .then(resolve)
  //   .catch(reject)


  // Demo stuff that works
    // const testUrl = 'http://www2.census.gov/geo/tiger/TIGER2015/ZCTA5/tl_2015_us_zcta510.zip'
  // unzipper.Open.url(request, testUrl)
  // .then( res => {
  //   const file = res.files.filter( f => f.path === 'tl_2015_us_zcta510.shp.iso.xml')[0]
  //   return file.buffer()
  // })
  // .then( buffer => buffer.toString() )
  // .then( str => convert.xml2json(str,
  //   {
  //     compact: false,
  //     spaces: 2
  //   })
  // )
  // .then(resolve)
  // .catch(reject)
})

module.exports = {
  caisoEndpoint,
}
