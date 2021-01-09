import { gql } from 'apollo-server-express'

const Review = gql`
  type Review{
    _id: ID!
    user: User!
    content: String
    creator: User!
  }

  extend type Mutation {
    createReview(reviewInput: ReviewInput! ):Review 
  }

  input ReviewInput {
    content: String!
    userId: ID!
  }
`

export default Review