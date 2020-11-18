import { AuthenticationError } from 'apollo-server'
import { IncomingHttpHeaders } from 'http'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import moment from 'moment'
import { Types } from 'mongoose'
import { isUser } from '../../interface/helper'
import { Token, User } from '../../models'
import { tokenService, userService } from '../../services'
import config from '../../setting/env'
import { USER } from '../constants'

async function addToken(
  userId: string,
  deviceType: string,
  deviceOS: string,
  clientIp: string,
  scope: string
): Promise<Types.ObjectId> {
  const token = await tokenService.initialize(userId, deviceType, deviceOS, clientIp, scope)
  return token._id
}

async function mapProfile2User(profile: any, scope: string) {
  const { provider, providerId, id } = profile
  let user = await User.findOne({
    ...(provider === 'unknown' ? { _id: id } : { providerId, provider }),
  }).lean()
  if (!user) {
    user = await userService.signUp(profile)
  }
  let token
  let userId
  if (user.status === USER.STATUS.ACTIVE) {
    token = await addToken(user._id, profile.deviceType, profile.deviceOS, profile.loginClientIp, scope)
    userId = user._id
    userService.updateLoginClientIp(userId, profile.loginClientIp)
    userService.updateLastActive(userId, profile.loginClientIp)
  } else {
    throw new Error(user.status === USER.STATUS.DELETED ? 'DELETED_USER' : 'BANNED_USER')
  }
  return { token, userId, user: _.omit(user, ['password', 'verifyCode', 'providerId']) }
}

const issue = (payload: object, jwtOptions = {}) => {
  jwtOptions = Object.assign(jwtOptions, config.JT)
  return jwt.sign(payload, config.JWT.SECRET, jwtOptions)
}

interface JWTToken {
  id?: string
  isAdmin?: boolean
  iat?: number
}

const verify = (token: string): Promise<JWTToken> => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, config.JWT.SECRET, {}, function (err: Error, tokenPayload: JWTToken = {}) {
      if (err) {
        return reject(new AuthenticationError('Invalid token.'))
      }
      resolve(tokenPayload)
    })
  })
}

const authenticate = ({ authorization }: IncomingHttpHeaders) => {
  return new Promise(async (resolve, reject) => {
    try {
      const parts = authorization.split(' ')
      if (parts.length === 2) {
        const scheme = parts[0]
        const credentials = parts[1]
        if (/^Bearer$/i.test(scheme)) {
          const token = await Token.findById(credentials).populate('user')
          if (!token) {
            reject(new AuthenticationError('Token not found or expired'))
          } else if (moment() > moment(token.expireAt)) {
            reject(new AuthenticationError('Token not found or expired'))
          } else {
            if (isUser(token.user) && token.user.status !== USER.STATUS.ACTIVE) {
              reject(new AuthenticationError('Token not found or expired'))
            }
            return resolve(token.user)
          }
        } else {
          throw new AuthenticationError('No authorization header was found')
        }
      }
    } catch (err) {
      reject({ code: 401, message: 'INVALID_TOKEN' })
    }
  })
}

export { authenticate, mapProfile2User, verify, issue }
