const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logsSchema = new Schema({
  application_id: {
    type: mongoose.Types.ObjectId,
  },
  type: {
    type: String,
    enum: ['error','warning','info']
  },
  priority: {
    type: String(),
    enum: ['lowest','low','medium','high','highest']
  },
  path: {
    type: String,
  },
  message: {
    type: String,
  },
  request: {
    data: Schema.Types.Mixed
  },
  response: {
    data: Schema.Types.Mixed
  }
})

const log = mongoose.model('log', logsSchema);

module.exports = log;