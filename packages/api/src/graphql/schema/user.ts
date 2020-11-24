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
    about: String
     # password: String
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
    website: String,
    companyName: String,
    companyType: String,
    sizeMin: Int,
    sizeMax: Int,
    jobs: [Job],
    foundedDate: Date,
    loginClientIp: String
    searchHistory: [String!]
    isPrivate: Boolean
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

  enum UserType {
    employee
    employer
  }

  extend type Query {
    user(id: ID): User
    getUser(username: String): User
    getUserList(type: UserType = any, filter: FilterUser, limit: Int, offset: Int): [User!]
  }
  
  input FilterUser {
    search: String
  }
`
export default User
