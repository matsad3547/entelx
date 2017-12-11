const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const eiaRequest = require('./app/eiaRequest')
const createUser = require('./user/createUser')

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
}

// const apiCall = app.get('/api')

app.get('/api', (req, res) => {
  //TODO: This is where the database goes
  res.json({
    stuff: 'things',
    cheese: 'poofs',
    eia: eiaRequest,
  })
})

app.post('/createUser', createUser)

app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})
