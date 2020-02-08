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
    .catch(err => console.log(err))

}

function show(req, res) {
  Event
    .findById(req.params.id)
    .populate('user')
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






module.exports = { index, create, show, update }