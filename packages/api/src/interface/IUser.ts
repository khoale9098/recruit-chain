import { Types, Document } from 'mongoose'

interface IUser extends Document {

  username?: string,
  name?: string,
  email?: string,
  about?: string,
  avatar?: string,
  coverImage?: string,
  birthday: Date,
  password?: string,
  address?: string,
  status?: string,
  gender?: string,
  loginClientIp: string,
  note?: string,
  language?: string,
  following?: Types.ObjectId[] | IUser[],
  connect?: Types.ObjectId[] | IUser[]
  searchHistory?: string[]
  activityLogs?: [
    {
      place?: string
      geometry?: { x: number; y: number }
      deviceType?: string
      activatedAt?: Date
      clientIp?: string
    }
  ],
  createdAt: Date,
  updatedAt: Date,
}
export default IUser