import { gql } from 'apollo-server-express'

const Skill = gql`
    type Skill{
      _id: ID!
      title: String!
      url:String
      attachment: String
      date_of_proof: DateTime
      status: SkillStatus!
    }

    enum SkillStatus {
      pending
      approved
      rejected
    }
    extend type Mutation {
     createSkill(skillInput: SkillInput! ):Experience 
    }
    
    input SkillInput {
      title: String
      url:String
      attachment: String
    }
`
export default Skill
