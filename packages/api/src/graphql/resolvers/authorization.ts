import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'
import { USER } from '../../setting/constants'
import { Resolver } from './IResolver'


export const isAuthenticated: Resolver<void, {}> = (_parent, __, { me }) => {
  if (me) {
    return skip
  } else {
    throw new AuthenticationError('Not authenticated as user.')
  }
}

export const isAdmin = combineResolvers(isAuthenticated, (_parent, args, { me }) => {
  if (me.role === USER.ROLE.ADMIN) {
    return skip
  } else {
    throw new AuthenticationError('Not authorized as admin.')
  }
})
