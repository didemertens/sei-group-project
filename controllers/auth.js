const User = require('../models/user')

function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thanks for Registering ${user.handle}` }))
    .catch(err => res.json(err))
}

module.exports = { register }