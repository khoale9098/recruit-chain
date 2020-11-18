import mongoose from 'mongoose'

import IToken from '../interface/IToken'

const Schema = mongoose.Schema
const modelName = 'token'

const schema = new Schema(
  {
    _id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    expireAt: Date,
    scope: String,
    place: String,
    geometry: { x: Number, y: Number },
    deviceType: String,
    deviceOS: String,
    activatedAt: Date,
    clientIp: String,
  },
  { collection: modelName, timestamps: true }
)

schema.index({ _id: 1, user: 1 })

export default mongoose.model<IToken>(modelName, schema)
