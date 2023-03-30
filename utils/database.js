const mongoose = require('mongoose')

// env
require('dotenv').config()

const connDB = async() => {
  await mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('conn DB'))
  .catch(() => console.log('error DB'))
}

module.exports = connDB