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
}
