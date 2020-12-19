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
  applicant: [{
    type: Schema.Types.ObjectId,
    ref: 'applicant',
  }],
  tokenBonus: {
    type: Number,
    required: true,
    default: 100000
  },
  salaryFrom: String,
  salaryTo: String,
  description: String,
  requirement: String,
  benefit: String,
  expiredAt: Date,
  location: String,
  vacancies: Number, //Số lượng tuyển dụng
  slug: String,
  status: Number,
  isPin: Boolean,
  category: String,
  keyword: String,
},
  { collection: modelName, timestamps: true }
)

schema.plugin(mongoosePaginate)
const JobPagingModel: IPagingModel<IJob> = model<IJob>(modelName, schema) as IPagingModel<IJob>

export default JobPagingModel
