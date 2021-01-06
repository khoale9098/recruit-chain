import { gql } from 'apollo-server-express'

const Candidate = gql`
  type Candidate{
    _id: ID!
    candidate: User!
    job: Job!
    sharer: User
    companyApply: User!
    status: CandidateStatus
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  extend type Mutation {
    changeStatus(status: CandidateStatus!, candidateId: ID! ):Candidate 
  }

  extend type Query {
    getListCandidate(status:CandidateStatus!, limit: Int, offset: Int): [Candidate!]
    countCandidateByStatus(status: CandidateStatus!): Int
  }

  enum CandidateStatus {
    responses
    interview
    offer
    rejected
    working
    accepted
    reserve
  }
`
export default Candidate
