import { GraphQLResolveInfo } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import UserResolver from './user'
import JobResolver from './job'


export default {
  Query: {
    ...UserResolver.Query,
    ...JobResolver.Query
    // ...commonQuery
  },

  Mutation: {
    ...JobResolver.Mutation
  },

  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
}