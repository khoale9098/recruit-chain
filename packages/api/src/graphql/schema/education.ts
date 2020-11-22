import { gql } from 'apollo-server-express'

const Education = gql`
  type Education{
    _id: ID!
    summary: String
    education_org: String
    degress: [String]
    startDate: DateTime
    endDate: DateTime
  }
`
export default Education
