import { Types } from 'mongoose'

import INotification from '../interface/INotification'
import { Notification } from '../models'
import pubsub from '../graphql/pubsub'
import { NOTIFICATION_ADDED } from '../setting/constants'
import BaseService from './baseService'

class NotificationService extends BaseService<INotification>{
  async createNoti(userId: Types.ObjectId, myId: Types.ObjectId, type: string, text: string): Promise<INotification> {
    try {
      const notification = await this.model.create({
        user: myId,
        creator: userId,
        type,
        text
      } as INotification)

      pubsub.publish(NOTIFICATION_ADDED, {
        notificationAdded: notification,
        userId: myId
      })
      return notification
    }
    catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default new NotificationService(Notification)
