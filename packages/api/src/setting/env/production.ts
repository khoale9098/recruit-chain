import { ENV } from '../constants'

const HOST = 'localhost:1345'
const URL = `http://${HOST}`
const WEB_HOST = 'localhost:3000'
const IP = '127.0.0.1'
const PORT = 3002
const DB_URL = "mongodb+srv://khoale:khoale@cluster0.9tsan.mongodb.net/recruit-chain?retryWrites=true&w=majority"

export default {
  ENV: ENV.PRODUCTION,
  IP,
  HOST,
  URL,
  WEB_HOST,
  DB_URL,
  PORT
}
