import { Document, Types } from 'mongoose'
import IUser from './IUser'

interface INotification extends Document {
  creator: Types.ObjectId | IUser
  user: Types.ObjectId | IUser
  type: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export default INotification
