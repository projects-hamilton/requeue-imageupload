const mongoose = require('mongoose');

// const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  location: String,
  from: Object,
  time: String,
  date: String,
  to: String
}, { timestamps: true })

const Message = mongoose.model('Location', LocationSchema);

module.exports = Message