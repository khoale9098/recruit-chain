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

  console.log('loading: ', loading)
  console.log('data: ', data?.getJobList?.docs)

  return (
    <Card
      className="w-full bg-white"
      extra={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div>
          <Button
            onClick={() => routeToAddJob()}
            icon={<PlusOutlined />}
            className="bg-primary flex justify-center items-center text-white border border-solid border-primary rounded px-4"
          >
            Add New Job
          </Button>
        </div>
      }
    >
      <div className="px-4 pt-6">
        {/* <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data?.jobs?.data}
          loading={isValidating}
          renderItem={(item) => (
            <List.Item>
              <JobItem item={item} />
            </List.Item>
          )}
        /> */}
      </div>
    </Card>
  )
}
export default JobList
