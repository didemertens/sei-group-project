/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')

describe('GET /events', () => {
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
      .then(() => done())
  })

  afterEach(done => {
    Event.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event).to.contains.keys([
            '_id',
            'name',
            'category',
            'date',
            'time',
            'location',
            'postcode',
            'description'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and value types', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event.name).to.be.a('string')
          expect(event.category).to.be.a('string')
          expect(event.date).to.be.an('string')
          expect(event.time).to.be.a('string')
          expect(event.location).to.be.a('string')
          expect(event.postcode).to.be.a('string')
          expect(event.description).to.be.a('string')
        })
        done()
      })
  })
})