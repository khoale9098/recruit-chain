import { Document, Types } from 'mongoose'
import IUser from './IUser'

interface IToken extends Document {
  _id: any
  user: Types.ObjectId | IUser
  expireAt: Date
  createdAt: Date
  updatedAt: Date
  scope?: string
  place?: string
  geometry?: { x: number; y: number }
  deviceType?: string
  deviceOS?: string
  activatedAt?: Date
  clientIp?: string
}

export default IToken
