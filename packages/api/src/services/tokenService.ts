import moment from 'moment'
import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4'
import IToken from '../interface/IToken'
import { Token } from '../models'
import BaseService from './baseService'

class TokenService extends BaseService<IToken> {
  async initialize(
    userId: string,
    deviceType: string,
    deviceOS: string,
    clientIp: string,
    scope: string = undefined,
    ttl: number = 720
  ) {
    try {
      let place
      let geometry
      if (clientIp) {
        const token = await this.model.findOne({ clientIp })
        if (token) {
          place = token.place
          geometry = token.place
        } else {
          const res = await fetch('http://ip-api.com/json/' + clientIp)
          const ipInfo = await res.json()
          if (ipInfo.status === 'success') {
            place = ipInfo.regionName
            geometry = { x: ipInfo.lat, y: ipInfo.lon }
          }
        }
      }
      const data = {
        _id: uuidv4(),
        user: userId,
        expireAt: moment().add(ttl, 'hours').toDate(),
        scope,
        place,
        geometry,
        deviceType,
        deviceOS,
        activatedAt: new Date(),
        clientIp,
      }
      const token: IToken = await this.model.create(data as any)
      return token
    } catch (err) {
      throw err
    }
  }
}

export default new TokenService(Token)
