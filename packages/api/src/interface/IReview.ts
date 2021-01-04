import { Types, Document } from 'mongoose'
import IUser from './IUser'

interface IReview extends Document {
  user: Types.ObjectId | IUser
  content: string
  creator: Types.ObjectId | IUser
  status: string
  createdAt: Date
  updatedAt: Date
}

export default IReview