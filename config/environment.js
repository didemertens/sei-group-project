require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGOLAB_RED_URI || `mongodb://localhost/out-n-about-${env}`

const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'shhh its a secret'

module.exports = {
  env, port,
  dbURI,
  secret
}