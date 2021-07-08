const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId, ref: 'Employee'
  },
  to: {
    type: Schema.Types.ObjectId, ref: 'Employee'
  },
  subject: {
    type: String
  },
  type: {
    type: String,
    default: 'email'
  },
  content: {
    type: String,
    default: ''
  },
  unread: {
    type: Boolean,
    default: true
  },
  date: {
    type: String,
    default: Date.now()
  }
}, {timestamps : true})

module.exports = mongoose.model('Mail', messageSchema, 'Mails' );