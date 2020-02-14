const Event = require('../models/event')
const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
const axios = require('axios')
require('dotenv').config()

function index(req, res) {
  Event
    .find()
    .then((events) => res.status(200).json(events))
    .catch(err => res.json(err))
}

async function getLat(postcode) {
  try {
    const resMap = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}`)
    return resMap.data.features[0].center[1]
  } catch (err) {
    console.log(err)
  }
}

async function getLong(postcode) {
  try {
    const resMap = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}`)
    return resMap.data.features[0].center[0]
  } catch (err) {
    console.log(err)
  }
}

async function create(req, res) {
  req.body.user = req.currentUser
  req.body.latitude = await getLat(req.body.postcode)
  req.body.longitude = await getLong(req.body.postcode)
  // req.body.attendees[0] = req.currentUser

  Event
    .create(req.body)
    .then(createdEvent => {
      return res.status(201).json(createdEvent)
    })
    .catch(err => res.status(422).json(err))

}

function show(req, res, next) {
  Event
    .findById(req.params.id)
    .populate('user')
    .populate('attendees.user')
    .populate('comments.user')
    .then(event => {
      if (!event) throw new Error('NotFound')
      res.status(200).json(event)
    })
    .catch(next)
}

function update(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404)
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(event, req.body)
      return event.save()
    })
    .then(updatedEvent => res.status(202).json(updatedEvent))
    .catch(next)
}

function destroy(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'No event Found' })
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      return event.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}
function commentCreate(req, res) {
  req.body.user = req.currentUser
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found ' })
      event.comments.push(req.body)
      return event.save()
    })
    .then(event => res.status(201).json(event))
    .catch(err => res.json(err))
}

function commentDelete(req, res) {
  Event
    .findById(req.params.id)
    .then(event => { 
      if (!event) return res.status(404).json({ message: 'Not Found ' })
      const comment = event.comments.id(req.params.commentId)
      if (!comment) return res.status(404).json({ message: 'Not Found ' })
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      comment.remove()
      return event.save()
    })
    .then(event => res.status(202).json(event))
    .catch(err => res.json(err))
}

function attend(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found ' })
      if (event.attendees.some(attendee => attendee.user.equals(req.currentUser._id))) return event
      event.attendees.push({ user: req.currentUser })
      return event.save()
    })
    .then(event => res.status(202).json(event))
    .catch(err => res.json(err))
}

function notAttend(req, res) {
  Event
    .findById(req.params.id)
    .then(event => { 
      if (!event) return res.status(404).json({ message: 'Not Found ' })
      const attend = event.attendees.id(req.params.attendId)
      // console.log('REQ', req)
      if (!attend) return res.status(404).json({ message: 'Not Found ' })
      if (!attend.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      attend.remove()
      return event.save()
    })
    .then(event => res.status(202).json(event))
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, attend, notAttend }