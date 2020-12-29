import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  Schema,
  model,
  PaginateModel,
  Document
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import IUser from '../interface/IUser'

import { GENDER, USER } from '../setting/constants'
import config from '../setting/env'

const modelName = 'user'

const schema = new Schema({
  username: { type: String, lowercase: true },
  firstName: String,
  address: String,   //User's ETH address
  identityAddress: String,   //User's identity address. For legacy identity it is   different from the user's address. For newer identity it the same.
  lastName: String,
  email: String,
  phone: String,
  about: String,
  password: String,
  avatar: {
    type: String,
    default: '/img/cover/blank_img.png'
  },
  title: String,
  coverImage: {
    type: String,
    default: '/img/cover.png'
  }, //Ảnh bìa
  birthday: Date,
  live: String,
  tokenWork: {
    type: Number,
    default: 1000000
  },
  connect: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  gender: {
    type: String,
    enum: Object(GENDER).values,
  },
  reputation: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: USER.STATUS.ACTIVE,
    enum: Object(USER.STATUS).values,
  },
  role: {
    type: String,
    enum: Object(USER.ROLE).values,
    default: USER.ROLE.USER
  },

  userType: {
    type: String,
    enum: Object(USER.USER_TYPE).values,
    default: USER.USER_TYPE.EMPLOYEE
  },
  note: String,
  skill: [{
    type: Schema.Types.ObjectId,
    ref: 'skill'
  }],
  competency: {
    type: Number,
    default: 0
  },
  experience: [{
    type: Schema.Types.ObjectId,
    ref: 'experience'
  }],
  education: [{
    type: Schema.Types.ObjectId,
    ref: 'education'
  }],

  // Company
  website: String,
  companyName: String,
  companyType: String,
  sizeMin: Number,
  sizeMax: Number,
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'job'
  }],
  foundedDate: Date,
  // 
  loginClientIp: String,
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
  isPrivate: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date,
},
  { collection: modelName, timestamps: true }
)

schema.statics = {
  generateHash: function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },
  validPassword: function (input: string, password: string) {
    return bcrypt.compareSync(input, password)
  },
  decodeToken: function (token: string): Record<string, any> {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET)
      return decoded as object
    } catch (err) {
      console.log(err)
      throw err
    }
  }
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
