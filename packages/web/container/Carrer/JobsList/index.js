import { List, Card } from 'antd'
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
    <div className="w-full bg-white">
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
    </div>
  )
}
export default JobList
