import { List, Card, Button } from 'antd'
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
  const router = useRouter()
  const routeToAddJob = () => router.push('job/add')
  const { data, loading } = useQuery(GET_JOB_LIST)

  const renderButton = () => (
    <div>
      <Button
        onClick={() => routeToAddJob()}
        icon={<PlusOutlined />}
        className="bg-primary flex justify-center items-center text-white border border-solid border-primary rounded px-4"
      >
        Add New Job
      </Button>
    </div>
  )
  return (
    <Card className="w-full bg-white" extra={renderButton()}>
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
