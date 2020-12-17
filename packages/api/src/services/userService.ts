import moment from 'moment'
import { Types } from 'mongoose'
import { encodeWearCharsRegex } from '../interface/helper'
import IUser from '../interface/IUser'
import { Token, User } from '../models'
import { USER } from '../setting/constants'
import BaseService from './baseService'

class UserService extends BaseService<IUser> {
  generateCond(type: string, filter: { [key: string]: string[] | number[] | boolean }, me: IUser) {
    const cond: { [key: string]: string | object | boolean } = {
      // show who did not block me
      blockList: { $ne: me._id },
      // and the people who status is active
      status: USER.STATUS.ACTIVE,
      // and username exists
      username: { $exists: true },
    }
    Object.keys(filter).forEach((k) => {
      switch (k) {
        case 'search':
          if (filter[k]) {
            const pattern = new RegExp(encodeWearCharsRegex(String(filter[k])), 'i')
            cond['$or'] = [{ username: { $regex: pattern } }, { nickname: { $regex: pattern } }]
          }
          break
        default:
          if (Array.isArray(filter[k])) {
            cond[k] = { $in: filter[k] }
          }
          break
      }
    })
    return cond
  }

  async getUsers(type: string, filter: { [key: string]: any }, limit: number, offset: number, me: IUser) {
    if (filter.search) {
      await User.findByIdAndUpdate(me._id, {
        $push: {
          searchHistory: {
            $each: [filter.search],
            $slice: -20,
          },
        },
      })
    }
    const cond = this.generateCond(type, filter, me)
    const sort = { createdAt: -1 }
    const userList = await User.find(cond).limit(limit).skip(offset).sort(sort)

    return userList
  }



  logout(tokenId: string) {
    return new Promise(async (resolve, reject) => {
      const token = await Token.findById(tokenId)
      if (token) {
        token.expireAt = moment().toDate()
        await token.save()
        resolve()
      } else {
        resolve('User not found')
        // reject('User not found')
      }
    })
  }

  async signUp(data: IUser) {
    try {
      const newUser = await User.create(data)
      return newUser
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async updateLastActive(me: IUser, clientIp: string) {
    const user = await User.findByIdAndUpdate(me._id, {
      $push: {
        activityLogs: {
          $each: [{ activatedAt: new Date(), clientIp }],
          $slice: -20,
        },
      },
    })
    return user
  }

  async resetPassword(userId: Types.ObjectId, newPassword: string) {
    try {
      const user = await User.findById(userId)
      if (!user) throw new Error('INVALID_USER')
      User.updateOne({ _id: userId }, { password: User.generateHash(newPassword), verifyCode: '' }).exec()
      return true
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async updateLoginClientIp(userId: Types.ObjectId, loginClientIp: string) {
    try {
      const user = await User.findById(userId)
      if (!user) throw new Error('INVALID_USER')
      User.updateOne({ _id: userId }, { loginClientIp }).exec()
      return true
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async deleteUserInfo(userId: Types.ObjectId) {
    Token.deleteMany({ user: userId }).exec()
  }

  async getRandomUser() {
    const userNum = await User.estimatedDocumentCount()
    const rand = Math.floor(Math.random() * userNum)
    const randomUser = await User.findOne().skip(rand)
    return randomUser
  }
  async updateFollowerCount(userId: Types.ObjectId) {
    try {
      const followerNo = await User.countDocuments({ following: userId })
      await User.findByIdAndUpdate(userId, { followerCount: followerNo })
      return true
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // async followUser(userId: Types.ObjectId, me: IUser, action: string) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const updatedUser = await this.model.findByIdAndUpdate(
  //         me._id,
  //         action === 'add' ? { $addToSet: { following: userId } } : { $pull: { following: userId } },
  //         { new: true }
  //       )
  //       this.updateFollowerCount(userId)
  //       await notificationService.generateFollowedNoti(action, me, userId)
  //       return resolve(updatedUser)
  //     } catch (err) {
  //       console.log(err)
  //       return reject(err)
  //     }
  //   })
  // }
}


export default new UserService(User)
