import { GraphQLResolveInfo } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'

export default {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
}