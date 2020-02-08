/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')

describe('POST /events', () => {
  const testEvent = {
    name: 'Football on the Common',
    category: 'Football',
    date: new Date('June 18, 2020'),
    time: '0600PM',
    location: 'Clapham Common',
    postcode: 'SW4 7AJ',
    description: 'Casual game of football on Clapham Common, next to the pond (but not too close...) Everybody and anybody is welcome!',
    requiredPeople: 10
  }

  const wrongTestEvent = {
    name: 'Football on the Common',
    category: 'Football'
  }

  // it('should return a 422 response when body is empty/wrong', done => {
  //   api.post('/api/events')
  //     .send(wrongTestEvent)
  //     .end((err, res) => {
  //       expect(res.status).to.eq(422)
  //       done()
  //     })
  // })

  it('should return a 201 response when body is correct', done => {
    api.post('/api/events')
      .send(testEvent)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/events')
      .send(testEvent)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with the correct fields', done => {
    api.post('/api/events')
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
          'description'
        ])
        done()
      })
  })

  it('should return an object with the correct fields and value types', done => {
    api.post('/api/events')
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