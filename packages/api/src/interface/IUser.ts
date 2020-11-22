import { Types, Document } from 'mongoose'

interface IUser extends Document {
  username?: string,
  firstName?: string,
  lastName?: string,
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
  isPrivate?: boolean,
  skill?: Types.ObjectId[] | IUser[],
  experience?: Types.ObjectId[] | IUser[],
  education?: Types.ObjectId[] | IUser[],
  // certifications?: Types.ObjectId[] | IUser[],

  website?: string,
  companyName?: string,
  companyType?: string,
  sizeMin?: number,
  sizeMax?: number,
  jobs?: Types.ObjectId[] | IUser[],
  foundedDate?: Date,
}

export default IUser