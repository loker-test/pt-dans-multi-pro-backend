const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/', (req, res) => {
  res.send('Test Project [Laurentius Kevin Hendrawanto]')
})

// app.get('/token-secret', (req, res) => {
//   res.send(require('crypto').randomBytes(64).toString('hex'))
// }),

module.exports = router
