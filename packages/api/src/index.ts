import bodyParser from 'body-parser'
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import rfs from 'rotating-file-stream'
import moment from 'moment'
import fs from 'fs'
import helmet from 'helmet'
import { createServer } from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'
// Blockchain
import Web3 from 'web3'
import contact from 'truffle-contract'

import oauth from './setting/oauth'
import graphqlServer from './graphql'
import { consoleRequestInfo, ipMiddleware } from './setting/middleware'

import path from 'path'


const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))

app.set('trust proxy', true)

/* Security middleware */
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cors())
app.use(compression())

app.use(ipMiddleware)



/* Logging */
const logDirectory = path.join(__dirname, 'logs')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
})
app.use(morgan('combined', { stream: accessLogStream }))
app.use(consoleRequestInfo)


const restartTime = moment().format('lll')
console.log('restartTime:', restartTime)
app.get('/info/restart', (req, res) => res.json({ restartAt: restartTime }))

app.get('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /admins')
})

oauth(app)


const dbUri = `mongodb://localhost:27017/recruit-chain`

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

graphqlServer.applyMiddleware({ app, path: '/graphql' })
const httpServer = createServer(app)
graphqlServer.installSubscriptionHandlers(httpServer)

const PORT = 3002

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${graphqlServer.subscriptionsPath}`)
})