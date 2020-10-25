import bodyParser from 'body-parser'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import fs from 'fs'
import helmet from 'helmet'
import { createServer } from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'


const app = express()
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))

app.set('trust proxy', true)

/* Security middleware */
app.use(helmet())
app.use(cors())
app.use(compression())

const httpServer = createServer(app)
httpServer.listen({ port: 3000 }, () => {
  console.log('NODE_ENV', '3000')
})