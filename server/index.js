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
  getDashboardConfig,
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
} = require('./project/')

const {
  getNodes,
} = require('./processes/')

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

//development
app.post('/get_revenue_by_thresholds/', getRevenueByThresholds)
app.post('/get_revenue_surface/', getRevenueSurface)

//generic
app.get('/get_min_date/:id', getMinDate)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'))
  })
}
