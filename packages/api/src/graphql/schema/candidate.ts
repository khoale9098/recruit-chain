import { gql } from 'apollo-server-express'

const Candidate = gql`
  type Candidate{
    _id: ID!
    candidate: User!
    job: Job!
    sharer: User
    status: CandidateStatus
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  extend type Mutation {
    changeStatus(status: CandidateStatus!, candidateId: ID! ):Candidate 
  }

  enum CandidateStatus {
    responses
    interview1
    inteview2
    offer
    rejected
    working
    accepted
  }
`
export default Candidate
