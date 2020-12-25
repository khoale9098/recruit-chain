import { ApolloError, ForbiddenError } from 'apollo-server'
import bcrypt from 'bcrypt'
import { combineResolvers } from 'graphql-resolvers'

import momnent from 'moment'
import IToken from '../../interface/IToken'
import IUser from '../../interface/IUser'
import { User, Token } from '../../models'
import { userService } from '../../services'

import { isAuthenticated } from './authorization'


import { Types } from 'mongoose'
import { Resolver, UserResolver } from './IResolver'

interface UserQuery {
  user: UserResolver,
  getUser: UserResolver,
  getUserList: UserResolver
  currentUser: UserResolver
  getMyEducation: UserResolver
}

interface UserMutation {
  updateUser: UserResolver
  changePassword: UserResolver
  clearSearchHistory: UserResolver
  clearToken: Resolver<Boolean>
  // connectUser: UserResolver
}

const Query: UserQuery = {
  user: async (_parent, { id }, { me }) => {
    try {
      const user = await User.findById(id)
      if (!user) throw new ApolloError('USER_NOT_FOUND')
      return user
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  getUser: async (_parent, { username }, { me }) => {
    try {
      const user = await User.findOne({ username })
      if (!user) throw new ApolloError('USER_NOT_FOUND')
      return user
    } catch (e) {
      console.error(e)
      throw e
    }
  },

  currentUser: async (_parent, _, { me }) => {
    try {
      const user = await User.findById(me._id)
      return user
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  getUserList: combineResolvers(
    isAuthenticated,
    async (_parent, { type = 'any', filter = {}, limit = 30, offset = 0 }, { me }) => {
      const userList = await userService.getUsers(type, filter, limit, offset, me)
      return userList
    }
  ),

  getMyEducation: async (_parent, _, { me }) => {
    try {
      const us = await User.findById(me._id, { education: 1 }).populate('education')
      return us
    }
    catch (err) {
      throw err
    }
  }
}


const Mutation: UserMutation = {
  updateUser: combineResolvers(isAuthenticated, async (_parent, { userInput }, { me }) => {
    try {
      if (userInput.password) {
        userInput.password = bcrypt.hashSync(userInput.password, bcrypt.genSaltSync(10))
      }
      // check if email have already existed
      if (userInput.email) {
        const user = await User.findOne({ username: userInput.username })
        if (user && user._id.toString() !== me._id.toString()) throw new Error('INVALID_USER')
      }
      // check if phone have already existed
      if (userInput.phone) {
        const user = await User.findOne({ phone: userInput.phone })
        if (user && user._id.toString() !== me._id.toString()) throw new Error('INVALID_USER')
      }
      const updatedUser = await User.findOneAndUpdate({ _id: me._id }, userInput, { new: true })
      return updatedUser
    } catch (err) {
      console.log(err)
      throw err
    }
  }),
  changePassword: combineResolvers(isAuthenticated, async (_parent, { oldPassword, newPassword }, { me }) => {
    if (!User.validPassword(oldPassword, me.password)) throw new Error('INVALID_REQUEST')
    const user = await userService.resetPassword(me._id, newPassword)
    return user
  }),
  clearSearchHistory: async (_parent, { }, { me }) => {
    const updatedUser = await User.findByIdAndUpdate(me._id, { $set: { searchHistory: [] } }, { new: true })
    return updatedUser
  },
  clearToken: async (_parent, { id }, { me }) => {
    try {
      await Token.deleteOne({ _id: id, user: me._id })
      return true
    } catch (err) {
      return false
    }
  },
  // connectUser: combineResolvers(isAuthenticated, async (_parent, { id, action }, { me }) => {
  //   try {
  //     const updatedUser = await userService.followUser(id, me, action)
  //     return updatedUser
  //   } catch (err) {
  //     console.log(err)
  //     // throw err
  //     throw new ApolloError(err.message, err.code)
  //   }
  // }),
}

export default { Query, Mutation }
