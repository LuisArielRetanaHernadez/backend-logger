const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.singJWT = (data, expiresIn) => {
  const expiresInIs =  expiresIn || process.env.JWT_EXPIRES_IN;
  
  return jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: expiresInIs})
}

exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};