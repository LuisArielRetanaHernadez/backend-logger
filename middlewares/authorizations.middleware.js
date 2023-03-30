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
}

module.exports = new AuthorizationService()

