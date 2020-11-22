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

export default { Query }
