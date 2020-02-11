/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')
const User = require('../../models/user')

describe('GET /events/:id', () => {
  let event = {}

  beforeEach(done => {
    User.create({
      handle: 'test',
      firstName: 'test',
      surname: 'test',
      email: 'test@email.test',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(user => {
        return Event.create({
          name: 'Football on the Common',
          category: 'Football',
          date: new Date('June 18, 2020'),
          time: '06:00 PM',
          location: 'Clapham Common',
          postcode: 'SW47AJ',
          description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
          latitude: '51.46180',
          longitude: '-0.13831',
          requiredPeople: 10,
          user: user
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

  it('should return status 404 when using wrong id', done => {
    api.get('/api/events/123456789123456789123456')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return status 200', done => {
    api.get(`/api/events/${event._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/events/${event._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should be an object with the correct fields', done => {
    api.get(`/api/events/${event._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'category',
          'date',
          'time',
          'location',
          'postcode',
          'description'
        ])
        done()
      })
  })

  it('should be an object with the correct fields and values', done => {
    api.get(`/api/events/${event._id}`)
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