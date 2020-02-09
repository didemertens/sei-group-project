/* global api, describe, it, expect, beforeEach, afterEach */
const Event = require('../../models/event')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment') // and our secret to encode that token with

const testUserData = [{
  handle: 'test',
  firstName: 'test',
  surname: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  handle: 'testTwo',
  firstName: 'testTwo',
  surname: 'testTwo',
  email: 'testTwo@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('DELETE /events/:id', () => {
  let token = null
  let incorrectToken = null
  let event = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Event.create({
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('June 18, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          requiredPeople: 10
        })
      })
      .then(createdEvent => {
        event = createdEvent
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/events/${event._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})