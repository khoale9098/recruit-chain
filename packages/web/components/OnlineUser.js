import { Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const OnlineUser = ({ isCollapsed }) => {
  return (
    <div className="flex justify-center items-center my-4 flex-col">
      <span>
        <Badge dot offset={[-8, 8]} style={{ backgroundColor: '#52c41a' }}>
          <Avatar
            size={64}
            className="flex justify-center items-center object-cover"
            icon={<UserOutlined />}
            src="/img/profile.jpg"
          />
        </Badge>
      </span>
      {!isCollapsed && (
        <>
          <h3 className="font-bold pt-2 text-base">Khoa Le</h3>
          <span className="text-gray-500">employee</span>
        </>
      )}
    </div>
  )
}

OnlineUser.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
}

export default OnlineUser
