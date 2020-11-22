import { gql } from 'apollo-server-express'

const Job = gql`
  type Job{
    _id: ID!
    title: String
    salaryFrom: Int
    salaryTo: Int
    description: String
    requirement: String
    expiredAt: Date
    location: String
    slug: String
    status: Int
    isPin: Boolean
    category: String
    keyword: String
  }
`
export default Job
