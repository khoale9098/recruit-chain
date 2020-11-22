import { Document, Types } from 'mongoose'

import IUser from './IUser'

interface ISearchHistory extends Document {
  user: Types.ObjectId | IUser
  keyword: string
  type: string
  account?: Types.ObjectId | IUser
  createdAt: Date
  updatedAt: Date
}

export default ISearchHistory
