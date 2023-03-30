const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizationModel = new Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'application',
    required: true,
  },
  token: {
    type: String,
  },
})

const authorization = mongoose.model('authorization', authorizationModel);

module.exports = authorization;