import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import INotification from 'src/interface/INotification'

import { IPagingModel } from '../interface/IPaging'
import { NOTIFICATION_TYPE } from '../setting/constants'

const Schema = mongoose.Schema
const modelName = 'notification'

const schema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    type: {
      type: String,
      default: NOTIFICATION_TYPE.FILLED,
      enum: Object(NOTIFICATION_TYPE).values,
    },
    text: {
      type: String,
    },
  },
  { collection: modelName, timestamps: true }
)

schema.index({ user: 1 })

schema.plugin(mongoosePaginate)

const NotificationModel: IPagingModel<INotification> = mongoose.model<INotification>(modelName, schema) as IPagingModel<
  INotification
>

export default NotificationModel
