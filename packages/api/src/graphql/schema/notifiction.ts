import { gql } from 'apollo-server-express'

const Notification = gql`
  type Notification {
    _id: ID!
    user: ID!
    type: String
    creator: User!
    updatedAt: DateTime
    createdAt: DateTime
  }
  extend type Query {
    allNotifications(cursor: DateTime): [Notification]
  }

  extend type Query {
    notificationAdded: Notification!
  }

`
export default Notification