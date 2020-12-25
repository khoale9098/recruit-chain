import { List, Avatar } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

const ActivityDescription = () => {
  return <div>Fill work experience</div>
}
const ActivityTitle = () => {
  return (
    <div className="block">
      <div className="font-bold text-base"> Khoa le</div>
      <div className="flex flex-row items-center">
        <ClockCircleOutlined className="text-xs text-red-600 font-bold" />
        <p className="pl-2 text-sm">12:02 at 20:01:32</p>
      </div>
    </div>
  )
}
const Activity = () => {
  return (
    <List
      itemLayout="horizontal"
      className="px-4"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar size={42} src="http://app.aworker.io/images/profile/avatar_employee.png" />}
            title={<ActivityTitle />}
            description={<ActivityDescription />}
          />
        </List.Item>
      )}
    />
  )
}

export default Activity
