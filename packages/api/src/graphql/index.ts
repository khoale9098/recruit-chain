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
const graphqlServer = new ApolloServer({
  typeDefs: schema, resolvers,
  formatError: (error: ApolloError) => {
    return {
      ...error,
      message: error.message,
    }
  },
  introspection: true,
  context: async ({ req, connection }: { req: Request; connection: any }) => {
    if (connection) {
      return connection.context
    }
    try {
      if (req) {
        const me = await authenticate(req.headers)

        return {
          me,
          clientIp: req.clientIp,
        }
      }
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  },

});

export default graphqlServer
