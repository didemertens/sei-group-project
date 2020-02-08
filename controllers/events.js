const Event = require('../models/event')

function index(req, res) {
  Event
    .find()
    .then((events) => res.status(200).json(events))
    .catch(err => res.json(err))
}

module.exports = { index }