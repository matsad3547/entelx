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
  getInitDashboardData,
  refreshDashboardData,
  getThreeWeekData,
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

const server = app.listen(app.get('port'), err => {
  if (err) {
    throw new Error(err)
    console.error('An error occured:', err)
  }
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})

app.use(express.static('public'))

app.use(bodyParser.json())

app.post('/createUser', createUser)
app.post('/login', login)

//dashboard
app.post('/get_init_dashboard', getInitDashboardData)
app.post('/refresh_dashboard', refreshDashboardData)

app.get('/get_nodes', getNodes)
app.post('/create_project', createNewProject)

//project page
app.post('/get_project', getProjectById)
app.delete('/delete_project', deleteProjectById)

// last 3 weeks
app.post('/get_3_week_data', getThreeWeekData)
