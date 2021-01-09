import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IReview from 'src/interface/IReview'
import { IPagingModel } from '../interface/IPaging'
import { COMMON_STATUS } from '../setting/constants'

const Schema = mongoose.Schema
const modelName = 'review'

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
  },
  { collection: modelName, timestamps: true }
)

schema.plugin(mongoosePaginate)

const ReviewModel: IPagingModel<IReview> = mongoose.model<IReview>(modelName, schema) as IPagingModel<IReview>

export default ReviewModel
