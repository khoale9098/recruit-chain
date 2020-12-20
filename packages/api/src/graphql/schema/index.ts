import { gql } from 'apollo-server-express'
import userSchema from './user'
import jobSchema from './job'
import experienceSchema from './experience'
import educationSchema from './education'
import candidateSchema from './candidate'

const linkSchema = gql`
  scalar Date
  scalar DateTime
  scalar JSON
  scalar JSONObject
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  input PagingInput {
    limit: Int = 20
    page: Int = 1
  }
  enum SortType {
    asc
    desc
  }
  input SortParam {
    field: String
    type: SortType
  }
`
export default [
  linkSchema,
  userSchema,
  experienceSchema,
  educationSchema,
  jobSchema,
  candidateSchema
]