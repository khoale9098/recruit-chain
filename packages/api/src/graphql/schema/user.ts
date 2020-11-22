import { gql } from 'apollo-server-express'


const User = gql`
  type User {
    _id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
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
    language: [String],
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
    activityLogs: [ActivityLog!]
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

  type UserPagination {
    docs: [User]
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
  }

  enum UserStatus {
    active
    deleted
  }
  enum UserType {
    employee
    employer
  }

  extend type Query [
    user(id: ID): User
    getUser(username: String): User
  ]

`
export default User
