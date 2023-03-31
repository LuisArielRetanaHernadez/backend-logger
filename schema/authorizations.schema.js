const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizationModel = new Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'aplications',
    required: true,
  },
  token: {
    type: String,
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

const authorization = mongoose.model('authorization', authorizationModel);

module.exports = authorization;