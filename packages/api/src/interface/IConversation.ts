import { Document, Types } from 'mongoose'
import IUser from './IUser'
import IMessage from './IMessage'

interface ConversationOption {
  _id: Types.ObjectId
  isBlocked: boolean
  isArchived: boolean
  isDeleted: boolean
  lastDeletedAt: Date
}

interface IConversation extends Document {
  users: Types.ObjectId[] | IUser[]
  status: string
  allowSend: boolean
  creator: Types.ObjectId | IUser
  lastMsg?: IMessage
  createdAt: Date
  updatedAt: Date
  userOption: ConversationOption[]
}

export default IConversation
