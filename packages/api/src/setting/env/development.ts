import { ENV } from '../constants'

const HOST = 'localhost:1345'
const URL = `http://${HOST}`
const WEB_HOST = 'localhost:3000'
const IP = '127.0.0.1'
const PORT = 3002
const DB_URL = `mongodb://localhost:27017/recruit-chain`

export default {
  ENV: ENV.DEVELOPMENT,
  IP,
  DB_URL,
  HOST,
  URL,
  WEB_HOST,
  PORT
}
