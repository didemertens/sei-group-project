const router = require('express').Router()
const events = require('../controllers/events')
const users = require('../controllers/auth')

// EVENT ROUTES

router.route('/events')
  .get(events.index)

// USER ROUTES

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router