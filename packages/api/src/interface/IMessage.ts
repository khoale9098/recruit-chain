import { Types, Document } from 'mongoose'
import IConversation from './IConversation'
import IUser from './IUser'

interface IMessage extends Document {
  conversation: Types.ObjectId | IConversation
  content: string
  sender: Types.ObjectId | IUser
  status: string
  readAt?: Date
  type: string
  attachment: string
  createdAt: Date
  updatedAt: Date
}

export default IMessage
