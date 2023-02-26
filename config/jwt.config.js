const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '7d'})
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '30d'})
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
}
