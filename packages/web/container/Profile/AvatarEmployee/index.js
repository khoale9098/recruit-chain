import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const AvatarEmployee = ({ avatar }) => {
  return (
    <div className="text-left shadow-md p-1 bg-white  relative" style={{ marginTop: '-104px', borderRadius: '50%' }}>
      <Avatar size={152} icon={<UserOutlined />} className="flex justify-center items-center" src={avatar} />
    </div>
  )
}
AvatarEmployee.propTypes = {
  avatar: PropTypes.string,
}
AvatarEmployee.defaultProps = {
  avatar: '',
}

export default AvatarEmployee
