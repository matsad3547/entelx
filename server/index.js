const express = require('express')
const Rx = require('rxjs/Rx')

const app = express()
const dotenv = require('dotenv').config()
const eiaKey = process.env.EIA_API_KEY

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
}

app.get('/api', (req, res) => {
  //TODO: This is where the database goes
  res.json({
    stuff: 'things',
    cheese: 'puffs',
    key: eiaKey,
  })
})

app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}, api key is ${eiaKey}`)
})
