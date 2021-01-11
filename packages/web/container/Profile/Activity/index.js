import React, { useEffect } from 'react'
import { List, Avatar } from 'antd'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { ClockCircleOutlined, LikeOutlined } from '@ant-design/icons'
import moment from 'moment'
import NotificationText from './NotificationText'

const ALL_NOTIFICATION = gql`
  query allNotifications($cursor: DateTime) {
    allNotifications(cursor: $cursor) {
      creator {
        _id
        avatar
        userType
        firstName
        lastName
        companyName
      }
      createdAt
      type
      text
    }
  }
`

const NOTIFICATION_ADDED = gql`
  subscription notificationAdded {
    notificationAdded {
      _id
    }
  }
`

const ActivityDescription = ({ text }) => {
  if (text === '__INIT_ANNOUNCEMENT__') return <NotificationText />
  return <div>{text}</div>
}

ActivityDescription.propTypes = {
  text: PropTypes.string,
}

const ActivityTitle = ({ time, name, type }) => {
  return (
    <div className="block">
      <div>
        <div className="flex justify-between ">
          <div className="font-bold text-base">{name}</div>

          <div className="flex items-center">
            <LikeOutlined style={{ color: '#bbb', fontSize: '12px' }} />
            <div className="text-xs ml-1" style={{ color: '#bbb' }}>
              1 point for Reputation
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <ClockCircleOutlined className="text-xs text-red-600 font-bold" />
          <p className="pl-2 text-sm">{`${moment(time).format('MM/DD')} at ${moment(time).format('HH:mm:ss')}`}</p>
        </div>
      </div>
    </div>
  )
}
ActivityTitle.propTypes = {
  time: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}

const Activity = () => {
  const { data, loading, subscribeToMore } = useQuery(ALL_NOTIFICATION)

  useEffect(() => {
    const subscribeToNewMessages = () => {
      return subscribeToMore({
        document: NOTIFICATION_ADDED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const { notificationAdded } = subscriptionData?.data
          return {
            ...prev,
            allNotifications: [notificationAdded].concat(
              prev.allNotifications.filter((conv) => conv.id !== notificationAdded.id)
            ),
          }
        },
      })
    }
    const unsubscribe = subscribeToNewMessages()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      className="px-4"
      dataSource={data?.allNotifications}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar size={42} src={item.creator.avatar} />}
            title={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <ActivityTitle
                name={
                  item?.creator?.userType === 'employer'
                    ? item?.creator.companyName
                    : `${item?.creator?.firstName} ${item?.creator?.lastName}`
                }
                time={item?.createdAt}
                type={item?.type}
              />
            }
            description={<ActivityDescription text={item?.text} />}
          />
        </List.Item>
      )}
    />
  )
}

export default Activity
