import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'
import { Resolver } from './IResolver'


export const isAuthenticated: Resolver<void, {}> = (_parent, __, { me }) => {
  if (me) {
    return skip
  } else {
    throw new AuthenticationError('Not authenticated as user.')
  }
}
