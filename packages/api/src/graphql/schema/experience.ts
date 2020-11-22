import { gql } from 'apollo-server-express'

const Experience = gql`
  type Experience {
    _id: ID!
    companyName: String
    establishDate: DateTime
  }
`
export default Experience
