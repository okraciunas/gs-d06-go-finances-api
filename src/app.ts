import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import exceptionHandling from './middlewares/exceptionHandling'
import createConnection from './database'

createConnection()

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(exceptionHandling)

export default app
