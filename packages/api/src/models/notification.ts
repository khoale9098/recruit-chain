import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import INotification from 'src/interface/INotification'

import { IPagingModel } from '../interface/IPaging'

const Schema = mongoose.Schema
const modelName = 'notification'

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      default: 'liked',
      enum: ['fill', 'connect', 'review'],
    },
    connect: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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
