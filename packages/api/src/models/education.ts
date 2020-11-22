import {
  Schema, model
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IPagingModel } from '../interface/IPaging'
import IEducation from '../interface/IEducation'


const modelName = 'education'

const schema = new Schema({
  summary: String,
  education_org: String,
  degrees: [String],
  startDate: Date,
  endDate: Date
})


schema.index({ _id: 1, startDate: -1 })

schema.plugin(mongoosePaginate)
const EducationModel: IPagingModel<IEducation> = model<IEducation>(modelName, schema) as IPagingModel<IEducation>

export default EducationModel