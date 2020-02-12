const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thanks for registering ${user.handle}` }))
    .catch(next)
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        throw new Error('Unauthorized')
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({ message: `Welcome Back ${user.firstName}`, token, user })
    })
    .catch(next)
}

function profile(req, res, next) {
  User
    .findById(req.currentUser._id)
    .populate('createdEvents')
    .populate('attendingEvents')
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports = { register, login, profile }