import bcrypt from 'bcrypt'
import {
  Schema,
  model,
  PaginateModel,
  Document
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import IUser from '../interface/IUser'

import { GENDER, USER } from '../setting/constants'

const modelName = 'user'

const schema = new Schema({
  username: { type: String, lowercase: true },
  name: String,
  email: String,
  about: String,
  password: String,
  avatar: String,
  coverImage: String,
  birthday: Date,
  address: String,
  following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  connect: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  gender: {
    type: String,
    enum: Object(GENDER).values,
  },
  status: {
    type: String,
    default: USER.STATUS.ACTIVE,
    enum: Object(USER.STATUS).values,
  },
  userType: {
    type: String,
    enum: Object(USER.USER_TYPE).values,
    default: USER.USER_TYPE.EMPLOYEE
  },
  loginClientIp: String,
  note: String,
  language: String,
  searchHistory: [String],
  activityLogs: [
    {
      place: String,
      geometry: { x: Number, y: Number },
      deviceType: String,
      activatedAt: Date,
      clientIp: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
})

schema.statics.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// checking if password is valid
schema.statics.validPassword = function (input: string, password: string) {
  return bcrypt.compareSync(input, password)
}

const indexTextField = {
  username: 'text',
  name: 'text',
}

schema.index(indexTextField, { name: 'user_search_field' })

schema.plugin(mongoosePaginate)

interface IUserPagingModel<T extends Document> extends PaginateModel<T> {
  generateHash(password: string): string
  validPassword(input: string, password: string): boolean
}

const UserPagingModel: IUserPagingModel<IUser> = model<IUser>(modelName, schema) as IUserPagingModel<IUser>

export default UserPagingModel
