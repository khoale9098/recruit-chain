import { gql } from 'apollo-server-express'

const Candidate = gql`
  type Candidate{
    _id: ID!
    candidate: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
export default Candidate
