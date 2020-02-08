/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')

describe('GET /events/:id', () => {
  let event = {}

  beforeEach(done => {
    Event.create([
      {
        name: 'Football on the Common',
        category: 'Football',
        date: new Date('June 18, 2020'),
        time: '0600PM',
        location: 'Clapham Common',
        postcode: 'SW4 7AJ',
        description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
        requiredPeople: 10
      }, {
        name: 'Field hockey game',
        category: 'Field Hockey',
        date: new Date('February 14, 2020'),
        time: '0300PM',
        location: 'Millfields Park',
        postcode: 'E5 0AR',
        description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.'
      }
    ])
      .then((events) => event = events[0])
      .then(() => done())
  })

  afterEach(done => {
    Event.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return status 404 when using wrong id', done => {
    api.get('/api/events/1234')
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