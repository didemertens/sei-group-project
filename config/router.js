const router = require('express').Router()
const events = require('../controllers/events')
const users = require('../controllers/auth')

// EVENT ROUTES

router.route('/events')
  .get(events.index)
  .post(events.create)

router.route('/events/:id')
  .get(events.show)

// USER ROUTES

router.route('/register')
  .post(users.register)

module.exports = router