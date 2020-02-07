require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')

mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})
 
app.use(logger)

app.listen(port, () => console.log(`Express is up and running on ${port}`))

module.exports = app