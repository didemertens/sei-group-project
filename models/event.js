const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
} , {
  timestamps: true
})

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  postcode: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  requiredPeople: { type: Number },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

eventSchema.plugin(require('mongoose-unique-validator'))


module.exports = mongoose.model('Event', eventSchema)