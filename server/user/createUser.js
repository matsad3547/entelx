const express = require('express')
const bodyParser = require('body-parser')
const store = require('../store')

const app = express()
app.use(express.static('publick'))
app.use(bodyParser.json())

// app.post('/createUser', (req, res) => {
//   store
//     .createUser({
//       username: req.body.username,
//       password: req.body.password,
//     })
//     .then( () => res.sendStatus(200))
// })

const createUser = (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password,
    })
    .then( () => res.sendStatus(200))
}

module.exports = createUser
