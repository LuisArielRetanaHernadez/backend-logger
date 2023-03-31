// utils
const { verifyJWT } = require('../utils/singJWT')
const AppError = require('../utils/AppError');
const { tryCatch } = require('../utils/tryCatch');

exports.authJWT = tryCatch( async(req, res, next) => {
  let token = null;
    
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    return next(new AppError('invalid credentials', 401))
  }

  const tokenIs = verifyJWT(token)

  if (!tokenIs) {
    return next(new AppError('invalid credentials', 401))
  }

  req.currentAplication = {
    ...tokenIs,
    token
  }

  return next()

})