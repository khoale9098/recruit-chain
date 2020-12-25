import React from 'react'
import { List, Card, Tag } from 'antd'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'

const GET_MY_VACANCIES = gql`
  query getJobsById {
    getJobsById {
      docs {
        _id
        title
        location
      }
    }
  }
`
const RecentVacencies = () => {
  const { data, loading } = useQuery(GET_MY_VACANCIES)

  const _renderSeeAll = () => (
    <Link href="/job">
      <Tag className="font-bold px-4 cursor-pointer hover:underline" color="blue">
        See All
      </Tag>
    </Link>
  )
  return (
    <div className="mt-4">
      <Card title="Recent Vacancies" extra={_renderSeeAll()}>
        <List
          dataSource={data?.getJobsById?.docs}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <div className="w-full flex flex-col ">
                <Link href={`/job/${item?._id}`}>
                  <h3 className="font-bold text-base hover:text-primary cursor-pointer">{item?.title}</h3>
                </Link>
                <div className="flex items-center">
                  <div className="h-4 w-4">
                    <img src="/img/icons/flagmap.png" alt="" />
                  </div>
                  <p className="ml-2">{item?.location}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default RecentVacencies
