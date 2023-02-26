const express = require('express')
const router = express.Router()
const middleware = require('./middleware.route')
const jobController = require('../controllers/job.controller')

router.use(middleware.authToken)

router.get('/job', jobController.getJobList)
router.get('/job/:id', jobController.getJobDetail)

module.exports = router
