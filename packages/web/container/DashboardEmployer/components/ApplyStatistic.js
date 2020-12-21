import React from 'react'
import { stringify } from 'qs'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'
import { CodepenOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const COUNT_CANDIDATE = gql`
  query countCandidateByStatus($status: CandidateStatus!) {
    countCandidateByStatus(status: $status)
  }
`

const STATUS_LANG = {
  responses: 'Responses',
  interview1: 'Interview first round',
  inteview2: 'Inteview second round',
  offer: 'Offer',
  rejected: 'Rejected',
  working: 'Working',
  accepted: 'Accepted',
  reserve: 'Reserve',
}

const ApplyStatistic = ({ status, isActive }) => {
  const router = useRouter()
  const { data, loading } = useQuery(COUNT_CANDIDATE, {
    variables: {
      status,
    },
  })

  const handleClickStatus = () => {
    const query = stringify({ status })
    router.push({
      pathname: '/dashboard',
      query: { query },
    })
  }

  return (
    <div className="w-full mx-2" style={{ minWidth: '200px' }}>
      <div className="flex flex-col ">
        <div
          className={`h-12 cursor-pointer flex border border-solid border-gray-600 flex-row justify-between ${
            isActive ? 'bg-primary text-white border-primary' : ''
          } font-bold items-center`}
          role="presentation"
          onClick={() => handleClickStatus()}
        >
          <div className="px-4">{STATUS_LANG[status]}</div>
          <div className="w-12">
            <CodepenOutlined className="text-3xl" />
          </div>
        </div>
        <div className="flex justify-center items-center border border-solid border-gray-600 border-t-0 py-8">
          <span className="text-3xl font-bold">{loading ? <Spin /> : data?.countCandidateByStatus}</span>
        </div>
      </div>
    </div>
  )
}
ApplyStatistic.propTypes = {
  status: PropTypes.string,
  isActive: PropTypes.bool,
}
export default ApplyStatistic
