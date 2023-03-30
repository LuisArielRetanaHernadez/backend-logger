// schema
const Authorizations = require('../schema/authorizations.schema')

class AuthorizationService {

  async findAllAuthorizations(req, res, next) {
    const { token } = req.currentToken

    const authorizationFind = await Authorizations.find({ token })

    if (!authorizationFind) {
      return res.status(404).json({
        message: 'invalid credentials'
      })
    }

    return next()

  }

  async protectId(req, res, next) {
    const { id } = req.params
    const idToken = req.currentToken._id
    
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
}

module.exports = new AuthorizationService()

