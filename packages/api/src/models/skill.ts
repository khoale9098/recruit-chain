import {
  Schema, model
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { IPagingModel } from '../interface/IPaging'
import ISkill from '../interface/ISkill'

const modelName = 'skill'

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: String,
  attachment: String,
  date_of_proof: Date,
},
  { collection: modelName, timestamps: true }
)


schema.plugin(mongoosePaginate)
const SkillModeal: IPagingModel<ISkill> = model<ISkill>(modelName, schema) as IPagingModel<ISkill>

export default SkillModeal
