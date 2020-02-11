/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')
const User = require('../../models/user')

describe('GET /events', () => {
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
        Event.create([
          {
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
          }, {
            name: 'Field hockey game',
            category: 'Field Hockey',
            date: new Date('February 14, 2020'),
            time: '03:00 PM',
            location: 'Millfields Park',
            postcode: 'E50AR',
            description: 'We are going to play a game of field hockey. Bring your own equipment. We will meet at the entrance of Millfields Park, opposite the Millfields cafe.',
            latitude: '51.55712',
            longitude: '-0.04406',
            requiredPeople: 10,
            user
          }
        ])
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
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