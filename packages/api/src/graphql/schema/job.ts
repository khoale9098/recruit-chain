import { gql } from 'apollo-server-express'

const Job = gql`
  type Job{
    _id: ID!
    title: String
    company: User!
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
    tokenBonus: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }


  extend type Mutation {
    createJob(jobInput: JobInput!): Job
    updateJob(id: ID!, jobInput:JobInput!): Job
    deleteJob(id: ID!): Job
    applyJob(jobId: ID!): Job
  }
  extend type Query{
    job(id: ID!): Job
    getJobList(
      filter: FilterJob
      paging: PagingInput = { limit: 20, page: 1 }
    ): JobPagination
    getJobsById(
      filter: FilterJob
      paging: PagingInput = { limit: 20, page: 1 }
    ): JobPagination
  }

  input FilterJob {
    name: String
  }

  type JobPagination {
    docs: [Job]
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
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
