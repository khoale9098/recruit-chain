import { Types } from 'mongoose'

import INotification from '../interface/INotification'
import IUser from '../interface/IUser'
import { User, Notification } from '../models'

import BaseService from './baseService'

class NotificationService extends BaseService<INotification>{
  async createNoti(userId: Types.ObjectId, myId: Types.ObjectId, type: string): Promise<INotification> {
    try {
      let notification = await this.model.findOne({ user: myId, creator: userId })
      if (!notification) {
        notification = await this.model.create({
          user: myId,
          creator: userId,
          type
        } as INotification)
      }
      return notification
    }
    catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default new NotificationService(Notification)
