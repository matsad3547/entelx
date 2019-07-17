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
  getDashboardConfig,
  getDashboardData,
  getHistoricalData,
  getInsightData,
  getMinDate,
  getRevenueByThresholds,
} = require('./product/')

const {
  createNewProject,
  deleteProjectById,
  getProjectById,
} = require('./project/')

const { getNodes } = require('./processes/')

const app = express()

app.set('port', process.env.PORT || 5000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('server/public'))
}

// const server =
app.listen(app.get('port'), err => {
  if (err) {
    console.error('An error occured:', err)
    throw new Error(err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
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
app.get('/dashboard/:id/config', getDashboardConfig)
app.get('/dashboard/:id/data', getDashboardData)

app.get('/nodes', getNodes)

//project page
app.post('/project/create', createNewProject)
app.get('/project/:id', getProjectById)
app.delete('/project/:id', deleteProjectById)

// historical
app.post('/historical/', getHistoricalData)
app.get('/historical/:id/min_date', getMinDate)

//insights
app.post('/insights/', getInsightData)
app.post('/get_revenue_by_thresholds/', getRevenueByThresholds)
