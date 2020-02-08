require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
const dbURI = env === 'production' ? process.env.MONGODB_URI : `${process.env.MONGODB_URI}-${env}`

const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'shhh its a secret'

module.exports = {
  env, port,
  dbURI,
  secret
}