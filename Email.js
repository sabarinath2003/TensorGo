const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: String,
  subject: String,
  text: String,
  date: Date
});

module.exports = mongoose.model('Email', EmailSchema);
