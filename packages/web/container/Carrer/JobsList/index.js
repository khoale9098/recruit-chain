import { List, Card } from 'antd'
import { useQuery, gql } from '@apollo/client'
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

  return (
    <Card className="w-full bg-white">
      <div className="px-4 pt-6">
        <List
          loading={loading}
          grid={{ gutter: 16, column: 3 }}
          dataSource={data?.getJobList?.docs}
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
