import { gql } from 'apollo-server-express'

const Job = gql`
  type Job{
    _id: ID!
    title: String
    company: [User!]
    salaryFrom: String
    salaryTo: String
    description: String
    requirement: String
    expiredAt:  DateTime
    location: String
    slug: String
    vacancies: Int
    status: Int
    benefit: String
    isPin: Boolean
    category: String
    keyword: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }


  extend type Mutation {
    createJob(jobInput: JobInput!): Job
  }


  input JobInput{
    title: String!
    # company: ID!
    salaryFrom: String
    salaryTo: String
    description: String
    requirement: String
    expiredAt: DateTime
    benefit: String
    location: String
    slug: String
    vacancies: Int
    status: Int
    isPin: Boolean
    category: String
    keyword: String
  }
`


export default Job
