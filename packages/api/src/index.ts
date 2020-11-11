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


app.get('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /admins')
})

const dbUri = `mongodb://localhost:27017/recruit-chain`
console.log('MONGO URL ')

mongoose.connect(dbUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbUri}`)
})
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error')
  console.error(err.stack || err)
  throw new Error(err.stack || err)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

const httpServer = createServer(app)
httpServer.listen({ port: 3000 }, () => {
  console.log('NODE_ENV', '3000')
})