import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IJob from 'src/interface/IJob'
import { IPagingModel } from '../interface/IPaging'


const modelName = 'job'
const schema = new Schema({
  title: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  salaryFrom: Number,
  salaryTo: Number,
  description: String,
  requirement: String,
  expiredAt: Date,
  location: String,
  slug: String,
  status: Number,
  isPin: Boolean,
  category: String,
  keyword: String,
},
  { collection: modelName, timestamps: true }
)

schema.plugin(mongoosePaginate)
const JobModel: IPagingModel<IJob> = model<IJob>(modelName, schema) as IPagingModel<IJob>

export default JobModel
