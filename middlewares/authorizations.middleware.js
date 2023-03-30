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

  async protectById(req, res, next) {
    const { id } = req.params
    const idToken = req.currentAplication.data.id
    console.log(req.currentAplication)
    
    if (id !== idToken) {
      return res.status(401).json({
        message: 'invalid credentials'
      })
    }

    const aplicationFind = await Authorizations.findById(id)

    if (!aplicationFind) {
      return res.status(404).json({
        message: 'invalid credentials'
      })
    
    }

    return next()
  }

  async protectLogById(req, res, next) {
    const { id } = req.params
    const idAplication = req.currentAplication.data.id

    const finLog = await Log.findOne({application_id: idAplication, _id: id})

    if (!finLog) {
      return  res.status(404).json({
        message: 'invalid credentials'
      })
    }

    req.currentLog = finLog

    return next()
  } 
}

module.exports = new AuthorizationService()

