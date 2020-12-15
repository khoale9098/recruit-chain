import { ApolloError, ForbiddenError } from 'apollo-server'
import bcrypt from 'bcrypt'
import { combineResolvers } from 'graphql-resolvers'
import momnent from 'moment'
import IToken from '../../interface/IToken'
import IUser from '../../interface/IUser'
import { User } from '../../models'
import { userService } from '../../services'

import { isAuthenticated } from './authorization'


import { Types } from 'mongoose'
import { Resolver, UserResolver } from './IResolver'

interface UserQuery {
  user: UserResolver,
  getUser: UserResolver,
  getUserList: UserResolver
}

interface UserMutation {
  updateUser: UserResolver
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
      const user = await User.findOne({ username }).populate('following')
      if (!user) throw new ApolloError('USER_NOT_FOUND')
      return user
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  getUserList: combineResolvers(
    isAuthenticated,
    async (_parent, { type = 'any', filter = {}, limit = 30, offset = 0 }, { me }) => {
      const userList = await userService.getUsers(type, filter, limit, offset, me)
      return userList
    }
  ),
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
}

export default { Query, Mutation }
