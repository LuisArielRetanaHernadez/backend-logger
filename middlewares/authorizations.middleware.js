// schema
const Authorizations = require('../schema/authorizations.schema')
const Log = require('../schema/logs.schema')

// utils
const AppError = require('../utils/AppError')

class AuthorizationService {

  async protect(req, res, next) {
    const { token } = req.currentAplication

    const authorizationFind = await Authorizations.find({ token })

    if (!authorizationFind) {
      return next( new AppError('invalid credentials', 404))
    }
    
    return next()

  }

  async protectLogById(req, res, next) {
    const { id } = req.params
    const idAplication = req.currentAplication.id

    const findLog = await Log.findOne({_id: id, application_id: idAplication})

    if (!findLog) {
      return next( new AppError('log not found', 404))
    }

    req.currentLog = findLog

    return next()
  } 
}

module.exports = new AuthorizationService()

