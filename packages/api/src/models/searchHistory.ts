import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import ISearchHistory from 'src/interface/ISearchHistory'

import { IPagingModel } from '../interface/IPaging'

const Schema = mongoose.Schema
const modelName = 'search_history'

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'account',
      enum: ['account', 'hashtag', 'location'],
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { collection: modelName, timestamps: true }
)

schema.index({ user: 1 })

schema.plugin(mongoosePaginate)

const SearchHistoryModel: IPagingModel<ISearchHistory> = mongoose.model<ISearchHistory>(modelName, schema) as IPagingModel<
  ISearchHistory
>

export default SearchHistoryModel
