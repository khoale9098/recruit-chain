import { List, Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import JobItem from '../JobItem'

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
]

const JobList = () => {
  return (
    <Card
      className="w-full bg-white"
      extra={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Button
          icon={<PlusOutlined />}
          className="bg-primary flex justify-center items-center text-white border border-solid border-primary rounded px-4"
        >
          Add New Job
        </Button>
      }
    >
      <div className="px-4 pt-6">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <JobItem />
            </List.Item>
          )}
        />
      </div>
    </Card>
  )
}
export default JobList
