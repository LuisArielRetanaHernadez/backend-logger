// schema
const Authorizations = require('../schema/authorizations.schema')
const Log = require('../schema/logs.schema') 

class AuthorizationService {

  async protect(req, res, next) {
    const { token } = req.currentAplication

    const authorizationFind = await Authorizations.find({ token })

    if (!authorizationFind) {
      return res.status(404).json({
        message: 'invalid credentials'
      })
    }

    return next()

  }

  async protectLogById(req, res, next) {
    const { id } = req.params
    const idAplication = req.currentAplication.id

    const findLog = await Log.findOne({_id: id, application_id: idAplication})

    if (!findLog) {
      return  res.status(404).json({
        message: 'log not found'
      })
    }

    req.currentLog = findLog

    return next()
  } 
}

module.exports = new AuthorizationService()

