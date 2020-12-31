import Notification from '../../models/notification'
import IUser from 'src/interface/IUser'
import { withFilter } from 'graphql-subscriptions'
import pubsub from '../pubsub'

import { NotificationResolver } from './IResolver'

interface NotificationQuery {
  allNotifications: NotificationResolver
}

const Query: NotificationQuery = {
  allNotifications: async (_parent, { cursor }: any, { me }) => {
    try {
      const notiCond = {
        ...(cursor && { updatedAt: { $lt: cursor } }),
        user: me._id
      };
      const notificationList = await Notification.aggregate([
        {
          $lookup: {
            from: 'user',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        { $unwind: '$creator' },
        {
          $match: notiCond,
        },
        { $sort: { updatedAt: -1 } },
        { $limit: 20 },
      ])
      return notificationList
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

const Subscription: any = {
  notificationAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('NOTIFICATION_ADDED'),
      // be careful when compare ObjectID in mongoose
      (payload, variables, { user }) => payload.userId.equals(payload.notificationAdded.user)
    ),
  }
}


export default { Query, Subscription }