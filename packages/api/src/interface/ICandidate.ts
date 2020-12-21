import { Document, Types } from 'mongoose'
import { Type } from 'typescript'

interface ICandidate extends Document {
  candidate?: Types.ObjectId | ICandidate,
  status?: string,
  job?: Types.ObjectId | ICandidate,
  companyApply?: Types.ObjectId | ICandidate,
  sharer?: Types.ObjectId | ICandidate,
  createdAt?: Date,
  updatedAt?: Date,
}

export default ICandidate
