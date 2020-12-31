import { List, Avatar } from 'antd'
import { useQuery, gql } from '@apollo/client'
import { ClockCircleOutlined } from '@ant-design/icons'
import moment from 'moment'

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
    }
  }
`

const ActivityDescription = () => {
  return <div>Fill work experience</div>
}
const ActivityTitle = ({ time, name }) => {
  return (
    <div className="block">
      <div className="font-bold text-base">{name}</div>
      <div className="flex flex-row items-center">
        <ClockCircleOutlined className="text-xs text-red-600 font-bold" />
        <p className="pl-2 text-sm">{`${moment(time).format('MM/DD')} at ${moment(time).format('HH:mm:ss')}`}</p>
      </div>
    </div>
  )
}
const Activity = () => {
  const { data, loading } = useQuery(ALL_NOTIFICATION)

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
              />
            }
            description={<ActivityDescription />}
          />
        </List.Item>
      )}
    />
  )
}

export default Activity
