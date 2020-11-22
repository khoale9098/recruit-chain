import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server-express'
import { Request } from 'express'

import { Types } from 'mongoose'
import resolvers from './resolvers'
import { authenticate } from '../setting/oauth/helper'
import schema from './schema'

const { ObjectId } = Types
ObjectId.prototype.valueOf = function () {
  return this.toString()
}
const graphqlServer = new ApolloServer({ typeDefs: schema, resolvers, introspection: true, playground: true });

export default graphqlServer
