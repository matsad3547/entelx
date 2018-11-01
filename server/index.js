const express = require('express')
require('isomorphic-fetch')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const eia = require('./app/eiaRequest')
const {
  createUser,
  login,
} = require('./user/')

const {
  getCaiso,
  caisoNodeEvaluator,
} = require('./product')

const { getNodes } = require('./processes')

//for testing python
// const { demoProcess } = require('./processes/')

const app = express()

app.set('port', process.env.PORT || 5000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('server/public'))
}

app.use(express.static('publick'))

app.use(bodyParser.json())

app.post('/caiso', getCaiso)
app.post('/caiso_node_evaluator', caisoNodeEvaluator)

app.post('/createUser', createUser)
app.post('/login', login)
// app.get('/api', (req, res) => {
//   //TODO: This is where the database goes
//   res.json({
//     stuff: 'things',
//     cheese: 'poofs',
//     eia,
//   })
// })
app.get('/get_nodes', getNodes)



app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})
