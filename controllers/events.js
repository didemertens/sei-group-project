const Event = require('../models/event')

function index(req, res) {
  Event
    .find()
    .then((events) => res.status(200).json(events))
    .catch(err => res.json(err))
}

function create(req, res) {
  req.body.user = req.currentUser
  Event
    .create(req.body)
    .then(createdEvent => res.status(201).json(createdEvent))
    .catch(err => res.status(422).json(err))

}

function show(req, res) {
  Event
    .findById(req.params.id)
    .populate('user')
    .populate('attendees.user')
    .populate('comments.user')
    .then(event => {
      if (!event) return res.status(404)
      res.status(200).json(event)
    })
}

function update(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404)
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(event, req.body)
      return event.save()
    })
    .then(updatedEvent => res.status(202).json(updatedEvent))
    .catch(err => console.log(err))
}

function destroy(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'No event Found' })
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      return event.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err))
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
      
      console.log('user', req.currentUser)
      console.log('attendess', event.attendees)
      return event.save()
    })
    .then(event => res.status(202).json(event))
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, attend }