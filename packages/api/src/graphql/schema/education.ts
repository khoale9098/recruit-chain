import { gql } from 'apollo-server-express'

const Education = gql`
  type Education{
    _id: ID!
    summary: String
    education_org: String
    degree: String
    media: String
    field_of_study: String
    startDate: String
    endDate: String
  }
  extend type Mutation {
    createEducation(educationInput: EducationInput! ):Education 
    updateEducation(educationInput: EducationInput!, educationId: ID! ):Education 
    deleteEducation(educationId: ID! ):Education 
  }
  
  input EducationInput {
    summary: String
    education_org: String
    degree: String
    media: String
    field_of_study: String
    startDate: String
    endDate: String
  }
`

export default Education
