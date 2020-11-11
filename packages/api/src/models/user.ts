import bcrypt from 'bcrypt'
import {
  Schema,
  model,
  PaginateModel,
  Document
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { GENDER } from '../setting/constants'

const modelName = 'user'

const USER_TYPE = {
  EMPLOYEE: 'employee',
  EMPLOYER: 'employer'
}

const schema = new Schema({
  username: String,
  name: String,
  about: String,
  avatar: String,
  coverImage: String,
  birthday: Date,
  address: String,
  gender: {
    type: String,
    enum: Object(GENDER).values,
  },
  userType: {
    type: String,
    enum: Object(USER_TYPE).values,
    default: USER_TYPE.EMPLOYEE
  },
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
schema.plugin(mongoosePaginate)

// interface IUserPagingModel<T extends Document> extends PaginateModel<T> {
//   generateHash(password: string): string
//   validPassword(input: string, password: string): boolean
// }

// const UserPagingModel: IUserPagingModel<IUser> = model<IUser>(modelName, schema) as IUserPagingModel<IUser>

export default UserPagingModel
