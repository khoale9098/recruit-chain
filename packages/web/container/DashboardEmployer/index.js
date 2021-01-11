import React from 'react'
import { Card } from 'antd'
import { parse } from 'qs'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
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
        email
        reputation
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

const { ACCEPTED, INTERVIEW, OFFER, REJECT, RESPONSES, RESERVE } = CONFIG.JOB.APPLY_STATUS
const DashboardEmployer = () => {
  const {
    query: { query },
  } = useRouter()
  const status = parse(query, { ignoreQueryPrefix: true })?.status

  const { data, loading, refetch } = useQuery(GET_LIST_CANDIDATE, {
    variables: {
      status: status || RESPONSES,
    },
  })

  return (
    <Card>
      <div className="flex w-full" style={{ flex: '0 0 1/4' }}>
        <ApplyStatistic status={RESPONSES} isActive={status === RESPONSES || !status} />
        <ApplyStatistic status={INTERVIEW} isActive={status === INTERVIEW} />

        <ApplyStatistic status={OFFER} isActive={status === OFFER} />
      </div>
      <div className="flex w-full mt-4">
        <div className="w-3/4">
          <ResponsesList candidate={data?.getListCandidate} loading={loading} refetchCount={refetch} />
        </div>
        <div className="w-1/4 mx-2">
          <div className="mr-2">
            <ApplyStatistic status={ACCEPTED} isActive={status === ACCEPTED} />
          </div>
          <div className="mr-2 mt-4">
            <ApplyStatistic status={REJECT} isActive={status === REJECT} />
          </div>
          <div className="mr-2 mt-4">
            <ApplyStatistic status={RESERVE} isActive={status === RESERVE} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DashboardEmployer
