import { ENV } from '../constants'

const HOST = 'localhost:1345'
const URL = `http://${HOST}`
const WEB_HOST = 'localhost:3000'
const IP = '127.0.0.1'

export default {
  ENV: ENV.DEVELOPMENT,
  IP,
  HOST,
  URL,
  WEB_HOST,
  FACEBOOK: {
    // xpath dev
    clientID: '277601193209094',
    clientSecret: '6599b23d21e3c128e255170b8d077c43',
    callbackURL: `${URL}/auth/facebook/callback`,
    profileFields: ['id', 'email', 'gender', 'displayName', 'name'],
  },
  TWITTER: {},
  MONGODB: {
    USER: '',
    PASSWORD: '',
    HOST: 'localhost',
    DB: 'mycat-api',
    DBPORT: 27017,
  },
  S3: {
    AUTH: {
      accessKeyId: 'AKIA4JQ4QHSDWZUOK5O4',
      secretAccessKey: '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',
      region: 'ap-northeast-1',
    },
    BUCKET: 'mycats-stg',
    FOLDERS: {
      IMAGES: 'images/',
      LOGS: 'logs/',
      DB: 'db/',
    },
    LINK: 'https://s3-ap-northeast-1.amazonaws.com/',
  },
  JWT: {
    SECRET: '',
    OPTIONS: {
      expiresIn: '30d'
    }
  },

}
