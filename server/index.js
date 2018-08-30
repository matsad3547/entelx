const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const eia = require('./app/eiaRequest')
const {
  createUser,
  login,
} = require('./user/')

const { getCaiso } = require('./product')

//for testing python
// const { demoProcess } = require('./processes/')

const app = express()

app.set('port', process.env.PORT || 3001)

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
