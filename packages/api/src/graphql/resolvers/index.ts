import { GraphQLResolveInfo } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import UserResolver from './user'
import JobResolver from './job'
import CandidateResolver from './candidate'
import EducationResolver from './education'


export default {
  Query: {
    ...UserResolver.Query,
    ...JobResolver.Query,
    ...CandidateResolver.Query
    // ...commonQuery
  },

  Mutation: {
    ...JobResolver.Mutation,
    ...UserResolver.Mutation,
    ...CandidateResolver.Mutation,
    ...EducationResolver.Mutation
  },

  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
}