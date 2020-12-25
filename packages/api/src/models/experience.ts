import {
  Schema, model
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IPagingModel } from '../interface/IPaging'
import IExperience from '../interface/IExperience'

const modelName = 'experience'

const schema = new Schema({
  job_title: { type: String, required: true },
  employment_type: String,
  companyName: { type: String, required: true },
  location: String,
  description: String,
  media: String,
  startDate: Date,
  endDate: Date,
})


schema.index({ _id: 1, startDate: -1 })

schema.plugin(mongoosePaginate)
const ExperienceModel: IPagingModel<IExperience> = model<IExperience>(modelName, schema) as IPagingModel<IExperience>

export default ExperienceModel