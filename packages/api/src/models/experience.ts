import {
  Schema, model
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IPagingModel } from '../interface/IPaging'
import IExperience from '../interface/IEducation'


const modelName = 'experience'

const schema = new Schema({
  job_title: String,
  companyName: String,
  establishDate: Date,
})


schema.index({ _id: 1, startDate: -1 })

schema.plugin(mongoosePaginate)
const ExperienceModel: IPagingModel<IExperience> = model<IExperience>(modelName, schema) as IPagingModel<IExperience>

export default ExperienceModel