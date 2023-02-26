const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const middleware = require('./middleware.route')

router.use((req, res, next) => {
  next()
})

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/user', middleware.authToken, (req, res) => {
  res.json({
    message: 'success get authenticated user',
    data: {
      user: req.user
    }
  })
})

module.exports = router
