const express = require('express')
const app = express()
const Rx = require('rxjs/Rx')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(3001, () => {
  console.log('example app listening on port 3001!');
})
