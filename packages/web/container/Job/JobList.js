import { List, Card, Button } from 'antd'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import { stringify, parse } from 'qs'

import useSWR from 'swr'
import API from 'core/api/API'
import { fetcher } from 'core/api'

import JobItem from 'components/JobItem'

const JobList = () => {
  let {
    query: { page = 1, search = {} },
  } = useRouter()
  const router = useRouter()

  page = Number(page)
  search = parse(search)

  const { data, isValidating } = useSWR(
    `${API.JOB.LIST}?${stringify({
      page,
      ...search,
    })}`,
    fetcher
  )

  console.log('data L ', data)
  const routeToAddJob = () => router.push('job/add')
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
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data?.jobs?.data}
          loading={isValidating}
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
