const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  handle: { type: String, required: true, unique: true, maxlength: 20 },
  password: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)

// userSchema
//   .set('toJSON', {
//     transform(doc, json) {
//       delete json.password
//       return json
//     }
//   })