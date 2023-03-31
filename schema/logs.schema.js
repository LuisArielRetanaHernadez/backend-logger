const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logsSchema = new Schema({
  application_id: {
    type: mongoose.Types.ObjectId,
    ref: 'aplications',
    required: true
  },
  type: {
    type: String,
    enum: ['error','warning','info']
  },
  priority: {
    type: String,
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
  },
  created_at: {
    type:  Date,
    default: Date.now,
    inmutable: true
  },
  updated_at: {
    type:  Date,
    default: Date.now
  }
})

const log = mongoose.model('log', logsSchema);

module.exports = log;