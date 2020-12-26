import { gql } from 'apollo-server-express'

const Skill = gql`
    type Skill{
      _id: ID!
      title: String
      url:String
      attachment: String
      date_of_proof: DateTime!
    }
`
export default Skill
