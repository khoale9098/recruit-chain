import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import ICandidate from 'src/interface/ICandidate'
import { JOB } from '../setting/constants'
import { IPagingModel } from '../interface/IPaging'

const modelName = 'candidate'

const schema = new Schema({
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'job',
    required: true
  },
  sharer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    default: JOB.APPLY_STATUS.RESPONSES,
    enum: Object(JOB.APPLY_STATUS).values,
  }
},
  { collection: modelName, timestamps: true }
)

schema.plugin(mongoosePaginate)

const CandidateModel: IPagingModel<ICandidate> = model<ICandidate>(modelName, schema) as IPagingModel<ICandidate>

export default CandidateModel
