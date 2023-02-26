const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]

  if (token === null)
    return res
      .status(401)
      .json({
        message: 'not allowed to access'
      })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res
      .status(401)
      .json({
        message: 'your session has been expired, please login again!'
      })

    req.user = user

    next()
  })
}

module.exports = {
  authToken
}
