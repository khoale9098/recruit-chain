import { Types, Document } from 'mongoose'

interface IUser extends Document {
  username?: string,
  name?: string,
  about?: string,
  avatar?: string,
  coverImage?: string,
  birthday: Date,
  address?: string,
  gender?: string,
  status?: string,
  note?: string,
  language?: string,
  searchHistory?: string[]
  activityLogs: [
    {
      place?: string,
      geometry: { x: Number, y: Number },
      deviceType?: string,
      activatedAt: Date,
      clientIp?: string,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
}
export default IUser