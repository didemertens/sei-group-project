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
      if (!event) throw new Error('Not Found')
      res.status(200).json(event)
    })
}




module.exports = { index, create, show }