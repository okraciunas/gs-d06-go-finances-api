import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import 'express-async-errors'

import routes from './routes'
import exceptionHandling from './middlewares/exceptionHandling'
import createConnection from './database'

createConnection()

const app = express()
app.use(express.json())
app.use(routes)
app.use(exceptionHandling)
app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!')
})

export default app
