const mongoose = require('mongoose')

const { Schema } = require('mongoose')

const aplicationsSchema = new Schema({
  name: String,
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

const Aplications = mongoose.model('aplications', aplicationsSchema)

module.exports = Aplications