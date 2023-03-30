const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.singJWT = (data) => {  
  return jwt.sign({ data }, process.env.JWT_SECRET, { algorithm: 'HS256'})
}

exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};