import { List, Card, Button, Space } from 'antd'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import JobItem from 'components/JobItem'

const GET_JOB_LIST = gql`
  query getJobList {
    getJobList {
      docs {
        _id
        createdAt
        updatedAt
        company {
          _id
          avatar
          companyName
        }
        tokenBonus
        title
        salaryFrom
        salaryTo
        location
        vacancies
        expiredAt
        category
      }
    }
  }
`

const JobList = () => {
  const { data, loading } = useQuery(GET_JOB_LIST)

  const _renderTitle = () => (
    <div className="flex items-center">
      <Space className="flex items-center">
        <div className="font-semibold">Jobs</div>
        <p className="text-xs">Search vacancies by various parameters</p>
      </Space>
    </div>
  )
  return (
    <Card className="w-full bg-white" title={_renderTitle()}>
      <div className="px-4 pt-6">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data?.getJobList?.docs}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <JobItem item={item} />
            </List.Item>
          )}
        />
      </div>
    </Card>
  )
}
export default JobList
