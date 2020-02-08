const router = require('express').Router()
const events = require('../controllers/events')

router.route('/events')
  .get(events.index)

module.exports = router