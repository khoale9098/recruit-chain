import colors from 'colors/safe'
import { NextFunction, Request, Response } from 'express'
import requestIp from 'request-ip'

import { ENV } from '../setting/constants'
import config from '../setting/env'
import { authenticate } from './oauth/helper'


declare module 'express' {
  export interface Request {
    user: any
  }
}

const ipMiddleware = function (req: Request, res: Response, next: NextFunction) {
  // if (config.ENV === ENV.DEVELOPMENT) {
  //   req.clientIp = '118.69.55.211'
  // } else {
  //   req.clientIp = requestIp.getClientIp(req)
  // }
  req.clientIp = '118.69.55.211'
  next()
}

function consoleRequestInfo(req: Request, res: Response, next: NextFunction) {
  next()
  const time = new Date()
  console.log(colors.green(`${req.method} | ${time} | ${req.ip} | ${req.originalUrl}`))
  Object.keys(req.body).forEach((el) => {
    console.log(colors.green(`${el}: ${JSON.stringify(req.body[el])}`))
  })
}

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authenticate(req.headers)
    req.user = user
    return next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: 401,
      message: 'INVALID_TOKEN',
      error: true,
    })
  }
}

export { consoleRequestInfo, auth, ipMiddleware }
