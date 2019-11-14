const path = require('path')
const express = require('express')
const compression = require('compression')
require('isomorphic-fetch')
require('dotenv').config()
const bodyParser = require('body-parser')

const {
  sse,
  getCompressionOptions,
} = require('./middleware')

// const eia = require('./app/eiaRequest')

const {
  createUser,
  login,
} = require('./user/')

const {
  getDashboardData,
  getHistoricalData,
  getInsightData,
  getMinDate,
  getRevenueByThresholds,
  getRevenueSurface,
} = require('./product/')

const {
  createNewProject,
  deleteProjectById,
  getProjectById,
  getDemoProject,
} = require('./project/')

const {
  getNodes,
  runTest,
} = require('./processes/')

require('./jobs/')

const app = express()

app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occurred starting the Entelx server:', err)
    throw new Error(err)
  }
  else if (process.env.NODE_ENV === 'development') {
    console.log(`Find the Entelx server at: http://localhost:${app.get('port')}`)
  }
  else {
    console.log(`Running the Entelx server at port ${process.env.PORT}`)
  }
})

//set up middlewares
app.use(express.static('public'))

app.use(bodyParser.json())

app.use(compression(getCompressionOptions))

app.use(sse)

//user
app.post('/user/create', createUser)
app.post('/user/login', login)

//dashboard
app.get('/dashboard/:id/', getDashboardData)

//general
app.get('/nodes', getNodes)

//project
app.get('/project/:id', getProjectById)
app.get('/projects/', getDemoProject)

app.post('/project', createNewProject)
app.delete('/project/:id', deleteProjectById)

// historical
app.get('/historical/:id/:startDate/:endDate/:includeWeather', getHistoricalData)

//insights
app.get('/insights/:id/:startDate/:endDate', getInsightData)

//development
app.get('/revenue_by_thresholds/:id/:chargeThreshold/:dischargeThreshold', getRevenueByThresholds)
app.get('/revenue_surface/:id/:startDate/:endDate', getRevenueSurface)

//generic
app.get('/min_date/:id', getMinDate)

app.get('/test/:nodeId', runTest)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
  })
}
