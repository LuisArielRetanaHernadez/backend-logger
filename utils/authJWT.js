// singJWT
const { verifyJWT } = require('./singJWT')

exports.authJWT = async (req, res, next) => {
  try {
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else {
      return res.status(401).json({ message: 'invalid credentials' })
    }

    const tokenIs = verifyJWT(token)

    if (!tokenIs) {
      return res.status(401).json({ message: 'invalid credentials' })
    }

    req.currentAplication = {
      tokenIs,
      token
    }

    return next()

  } catch (error) {
    return res.status(401).json({ message: 'invalid credentials' })
  }
}