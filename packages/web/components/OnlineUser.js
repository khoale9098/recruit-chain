import { Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useRecoilValue } from 'recoil'
import { authAtoms } from 'store'

const OnlineUser = ({ isCollapsed, isEmployee }) => {
  const auth = useRecoilValue(authAtoms.auth)

  const name = isEmployee ? auth?.user?.firstName : auth?.user?.companyName

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
          <h3 className="font-bold pt-2 text-base">{name}</h3>
          <span className="text-gray-500">{isEmployee ? 'employee' : 'employer'}</span>
        </>
      )}
    </div>
  )
}

OnlineUser.propTypes = {
  isEmployee: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
}

export default OnlineUser
