const express = require('express')
require('isomorphic-fetch')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const eia = require('./app/eiaRequest')
const {
  createUser,
  login,
} = require('./user/')

const { getCaiso } = require('./product')

const { caisoEndpoint } = require('./processes/caisoEndpoint')

//for testing python
// const { demoProcess } = require('./processes/')

const app = express()

// const start = moment.tz(1537282770441, 'Etc/GMT')
// const end = moment.tz(1537369170441, 'Etc/GMT')

caisoEndpoint(1537282770441, 1537369170441)
  .then(d => console.log('caiso endpoint:', d))
  .catch( err => console.error('Caiso endpoint reject error:', err))

app.set('port', process.env.PORT || 5000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
}

app.use(express.static('publick'))

app.use(bodyParser.json())

app.post('/caiso', getCaiso)

app.get('/api', (req, res) => {
  //TODO: This is where the database goes
  res.json({
    stuff: 'things',
    cheese: 'poofs',
    eia,
  })
})

app.post('/createUser', createUser)
app.post('/login', login)

app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})
