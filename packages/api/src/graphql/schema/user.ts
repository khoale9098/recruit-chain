import { gql } from 'apollo-server-express'

const User = gql`
  type User{
    _id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    activityLogs: [ActivityLog!]
    firstName: String
    lastName: String
    email: String
    phone: String
    tokenWork: Int
    about: String
    live: String
    avatar: String
    title: String
    coverImage: String
    birthday: DateTime
    address: String
    following:[User!]
    connect:[User!]
    status: UserStatus
    userType: UserType
    note: String,
    experience: [Experience]
    education: [Education]
    skill: [Skill]
    website: String
    reputation: Int
    companyName: String
    companyType: String
    role: UserRole
    sizeMin: Int
    sizeMax: Int
    jobs: [Job],
    foundedDate: Date
    loginClientIp: String
    searchHistory: [String!]
    isPrivate: Boolean
  }

  type UserEducation{
    _id: ID!
    education: [Education]
  }

  type UserExperience{
    _id: ID!
    experience: [Experience]
  }

  type UserSkill{
    _id: ID!
    skill: [Skill]
  }

  type ActivityLog {
    _id: String
    place: String
    geometry: Geometry
    deviceType: String
    deviceOS: String
    activatedAt: DateTime
    clientIp: String
  }
  type Geometry {
    x: Float!
    y: Float!
  }

  enum UserStatus {
    active
    deleted
  }

  enum UserRole {
    admin
    user
  }

  enum UserType {
    employee
    employer
    admin
  }

  extend type Query {
    user(id: ID): User
    getUser(username: String): User
    getUserList(type: UserType = any, filter: FilterUser, limit: Int, offset: Int): [User!]
    currentUser: User
    getMyEducation: UserEducation
    getMyExperience: UserExperience
    getMySkill: UserSkill
  }
  
  extend type Mutation {
    updateUser(userInput: UserInput): User
    clearSearchHistory: User
    clearToken(id: String!): Boolean
    changePassword(oldPassword: String, newPassword: String): Boolean
    # connectUser(id: ID!, action: ActionEnum = add): User
  }


  input UserInput {
    email: String
    phone: String
    password: String
    about: String
    companyName: String
    live: String
    coverImage: String
    reputation: Int
    title: String
    avatar: String
  }

  input FilterUser {
    search: String
  }
`
export default User
