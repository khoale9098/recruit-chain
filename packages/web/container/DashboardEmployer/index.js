import React from 'react'
import { Card } from 'antd'
import { useQuery, gql } from '@apollo/client'
import ApplyStatistic from './components/ApplyStatistic'
import ResponsesList from './components/ResponsesList'
import { CONFIG } from '../../constants'

const GET_LIST_CANDIDATE = gql`
  query getListCandidate($status: CandidateStatus!, $limit: Int, $offset: Int) {
    getListCandidate(status: $status, limit: $limit, offset: $offset) {
      _id
      candidate {
        _id
        firstName
        lastName
        avatar
      }
      status
      job {
        _id
        title
      }
      companyApply {
        _id
      }
    }
  }
`

const DashboardEmployer = () => {
  const { data, loading } = useQuery(GET_LIST_CANDIDATE, {
    variables: {
      status: CONFIG.JOB.APPLY_STATUS.RESPONSES,
    },
  })
  return (
    <Card>
      <div className="flex w-full" style={{ flex: '0 0 1/4' }}>
        <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.RESPONSES} />
        <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.INTERVIEW_FIRST_ROUND} />
        <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.INTERVIEW_SECOND_ROUND} />
        <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.OFFER} />
      </div>
      <div className="flex w-full mt-4">
        <div className="w-3/4">
          <ResponsesList candidate={data?.getListCandidate} loading={loading} />
        </div>
        <div className="w-1/4 mx-2">
          <div className="mr-2">
            <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.ACCEPTED} />
          </div>
          <div className="mr-2 mt-4">
            <ApplyStatistic status={CONFIG.JOB.APPLY_STATUS.REJECT} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DashboardEmployer
