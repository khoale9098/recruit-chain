import React from 'react'
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
}

const ApplyStatistic = ({ status }) => {
  const { data, loading } = useQuery(COUNT_CANDIDATE, {
    variables: {
      status,
    },
  })

  return (
    <div className="w-full mx-2" style={{ minWidth: '200px' }}>
      <div className="flex flex-col ">
        <div className="h-12 flex border-border-solid border-primary flex-row justify-between bg-primary text-white font-bold items-center">
          <div className="px-4">{STATUS_LANG[status]}</div>
          <div className="w-12">
            <CodepenOutlined className="text-3xl" />
          </div>
        </div>
        <div className="flex justify-center items-center border border-solid border-gray-600 border-t-0 py-8">
          <span className="text-2xl font-bold">{loading ? <Spin /> : data?.countCandidateByStatus}</span>
        </div>
      </div>
    </div>
  )
}
ApplyStatistic.propTypes = {
  status: PropTypes.string,
}
export default ApplyStatistic
