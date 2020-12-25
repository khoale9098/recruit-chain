import { gql } from 'apollo-server-express'

const Experience = gql`
  type Experience {
    _id: ID!
    companyName: String
    job_title: String,
    employment_type: String,
    location: String,
    media: String,
    description: String,
    startDate: DateTime,
    endDate: DateTime,
  }
  
  extend type Mutation {
    createExperience(expInput: ExperienceInput! ):Experience 
    updateExperience(expInput: ExperienceInput!, expId: ID! ):Experience 
  }

  input ExperienceInput {
    companyName: String
    job_title: String,
    employment_type: String,
    location: String,
    description: String,
    media: String,
    startDate: DateTime,
    endDate: DateTime,
  }
`
export default Experience
