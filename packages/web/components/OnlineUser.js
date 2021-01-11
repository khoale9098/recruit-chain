import { Avatar, Badge } from 'antd'
import { UserOutlined, ThunderboltFilled } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { formatToken } from 'utils'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      companyName
      avatar
      tokenWork
      firstName
      lastName
      userType
    }
  }
`

const OnlineUser = ({ isCollapsed }) => {
  const { data } = useQuery(CURRENT_USER)
  console.log('data:', data)

  const isEmployee = data?.currentUser?.userType === 'employee'
  return (
    <div className="flex justify-center items-center my-4 flex-col">
      <span>
        <Badge dot offset={[-8, 8]} style={{ backgroundColor: '#52c41a' }}>
          <Avatar
            size={64}
            className="flex justify-center items-center object-cover"
            icon={<UserOutlined />}
            src={data?.currentUser.avatar}
          />
        </Badge>
      </span>
      {!isCollapsed && (
        <>
          <h3 className="font-bold pt-2 text-base">
            {isEmployee ? `${data?.currentUser?.firstName} ${data?.currentUser?.lastName}` : data?.currentUser?.companyName}
          </h3>
          <span className="text-gray-500">{isEmployee ? 'employee' : 'employer'}</span>
          <div>
            <div className="flex items-center">
              <ThunderboltFilled style={{ color: '#5369f8' }} />
              <p className="ml-1 text-primary font-semibold">{formatToken(data?.currentUser?.tokenWork)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

OnlineUser.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
}

export default OnlineUser
