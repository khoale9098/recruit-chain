import { Document, Types } from 'mongoose'

interface ICandidate extends Document {
  candidate?: Types.ObjectId | ICandidate,
  status?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export default ICandidate
