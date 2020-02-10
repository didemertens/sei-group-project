const User = require('../models/user')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')

function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      req.currentUser = user
      next()
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}

module.exports = secureRoute