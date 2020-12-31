import Notification from '../../models/notification'
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

export default { Query }