import { GraphQLResolveInfo } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import UserResolver from './user'

export default {
  Query: {
    ...UserResolver.Query,
    // ...commonQuery
  },
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
}