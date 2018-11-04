const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const mockDb = require('mock-knex')

const knex = require('../store/')
const {
  createProject,
  deleteProject,
} = require('../project/')

const app = express()

app.use(bodyParser.json())

app.post('/create_project', createProject)
app.delete('/delete_project', deleteProject)

describe('Project routes should', () => {

  beforeAll( () => {
    mockDb.mock(knex)
  })
  afterAll( () => {
    mockDb.unmock(knex)
  })

  test('respond with success for /POST', done => {
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
      // TODO it would be nice to return an id value as it does when writing to the real database
      // .expect(200, {
      //   id: [0],
      // })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('respond with success for /DELETE', done => {
    request(app)
      .delete('/delete_project')
      .send({type: 'demo'})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
      // .post('/create_project')
      // .send({
      //   name: 'Test Project',
      //   address: '123 Main St.',
      //   power: 2.557,
      //   energy: 4,
      //   lat: 39.5,
      //   lng: -121.5,
      //   type: 'demo',
      // })
      // .set('Accept', 'application/json')
      // .expect(200)
      // .then( () => {
      //   request(app)
      //     .delete('/delete_project')
      //     .send({type: 'demo'})
      //     .set('Accept', 'application/json')
      //     .expect(200)
      //     .end((err, res) => {
      //       if (err) return done(err)
      //       done()
      //     })
      // })

  })
})
