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
} = require('./product/')

const {
  createProject,
  deleteProject,
  retrieveProject,
} = require('./project/')

const {
  getNodes,
  updateNodeData,
} = require('./processes/')

//for testing python
// const { demoProcess } = require('./processes/')

const app = express()

app.set('port', process.env.PORT || 5000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('server/public'))
}

app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})

app.use(express.static('publick'))

app.use(bodyParser.json())

app.post('/caiso', getCaiso)
app.post('/caiso_node_evaluator', caisoNodeEvaluator)

app.post('/createUser', createUser)
app.post('/login', login)

app.get('/get_nodes', getNodes)
app.post('/update_node_data', updateNodeData)

app.post('/create_project', createProject)
app.post('/retrieve_project', retrieveProject)
app.delete('/delete_project', deleteProject)
