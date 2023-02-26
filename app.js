const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const db = require('./config/db.config')

app.use(cors())
app.use(express.json())

const indexRouter = require('./routes/index.route')
const userRouter = require('./routes/user.route')
const jobRouter = require('./routes/job.route')
app.use(indexRouter)
app.use(userRouter)
app.use(jobRouter)

app.listen(port, async () => {
  try {
    await db.authenticate()
    await db.sync()
    console.log('[database] Connection has been established successfully.')
  } catch (error) {
    console.error('[database] Unable to connect to the database: ', error)
  }

  console.log('[server] Listening on http://localhost:'+port)
})
