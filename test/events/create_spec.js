/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testEvent = {
  name: 'Football on the Common',
  category: 'Football',
  date: new Date('June 18, 2020'),
  time: '06:00 PM',
  location: 'Clapham Common',
  postcode: 'SW47AJ',
  description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
  requiredPeople: 10,
  latitude: '51.46180',
  longitude: '-0.13831'
}

const wrongTestEvent = {
  name: 'Football on the Common',
  category: 'Football'
}

const testUser = {
  handle: 'test',
  firstName: 'test',
  surname: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /events', () => {
  let token

  beforeEach(done => {
    User.create(testUser)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without token', done => {
    api.post('/api/events')
      .send(testEvent)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 422 response when body is empty/wrong', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(wrongTestEvent)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response with token', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with the correct fields', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'category',
          'date',
          'time',
          'location',
          'postcode',
          'description',
          'requiredPeople',
          'longitude',
          'latitude'
        ])
        done()
      })
  })

  it('should return an object with the correct fields and value types', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
      .end((err, res) => {
        const event = res.body
        expect(event.name).to.be.a('string')
        expect(event.category).to.be.a('string')
        expect(event.date).to.be.an('string')
        expect(event.time).to.be.a('string')
        expect(event.location).to.be.a('string')
        expect(event.postcode).to.be.a('string')
        expect(event.description).to.be.a('string')
        done()
      })
  })

})