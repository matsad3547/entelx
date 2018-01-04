const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const eiaRequest = require('./app/eiaRequest')
const bodyParser = require('body-parser')

const processes = require('./processes/')

const {
  createUser,
  login,
} = require('./user/')

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
}
app.use(express.static('publick'))

app.use(bodyParser.json())
app.get('/api', (req, res) => {
  //TODO: This is where the database goes
  res.json({
    stuff: 'things',
    cheese: 'poofs',
    eia: eiaRequest,
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
