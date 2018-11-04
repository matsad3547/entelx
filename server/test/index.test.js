const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const mockDb = require('mock-knex')

const knex = require('../store/')
const { createProject } = require('../project/')

const app = express()

app.use(bodyParser.json())

app.post('/create_project', createProject)

describe('POST /create_project should', () => {

  beforeEach( () => {
    mockDb.mock(knex)
  })
  afterEach( () => {
    mockDb.unmock(knex)
  })

  it('respond with success', done => {
    request(app)
      .post('/create_project')
      .send({
        name: 'Test Project',
        address: '123 Main St.',
        power: 2.557,
        energy: 4,
        lat: 39.5,
        lng: -121.5,
        type: 'demo',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
