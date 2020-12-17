import { Document, Types } from 'mongoose'
import IUser from './IUser'

interface INotification extends Document {
  user: Types.ObjectId | IUser
  type: string
  connect: Types.ObjectId | IUser
  createdAt: Date
  updatedAt: Date
}

export default INotification
