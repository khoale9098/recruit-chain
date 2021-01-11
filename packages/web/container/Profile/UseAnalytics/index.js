import React from 'react'
import { useQuery, gql } from '@apollo/client'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      tokenWork
      skill {
        _id
      }
      reputation
    }
  }
`

const UseAnalytics = ({ review }) => {
  const { data } = useQuery(CURRENT_USER)

  return (
    <div className="w-full flex border-t border-solid border-gray-400 mt-6">
      <div className="w-1/2 h-40 flex flex-col justify-center items-center text-gray-600 border-r border-solid border-gray-400">
        <div className="text-3xl font-bold ">{data?.currentUser?.skill?.length}</div>
        <div>Skills</div>
      </div>

      <div className="w-1/2 h-40 flex flex-col justify-center items-center text-gray-600 ">
        <div className="text-3xl font-bold ">{data?.currentUser?.reputation}</div>
        <div>Scores of reputation</div>
      </div>
    </div>
  )
}

export default UseAnalytics
