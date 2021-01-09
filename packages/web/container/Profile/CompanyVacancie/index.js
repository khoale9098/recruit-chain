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
const CompanyVacancies = ({ review }) => {
  const { data } = useQuery(CURRENT_USER)
  return (
    <div className="w-full flex border-t border-solid border-gray-400 mt-6">
      <div className="w-1/3 h-40 flex flex-col justify-center items-center text-gray-600 border-r border-solid border-gray-400">
        <div className="text-3xl font-bold ">1</div>
        {/* Số lượng cần tuyển */}
        <div>open vacancies</div>
      </div>
      <div className="w-1/3 h-40 flex flex-col justify-center items-center text-gray-600 border-r border-solid border-gray-400">
        <div className="text-3xl font-bold ">1</div>
        <div>vacancies for tokens</div>
      </div>
      {!!review && (
        <div className="w-1/3 h-40 flex flex-col justify-center items-center text-gray-600 border-r border-solid border-gray-400">
          <div className="text-3xl font-bold ">{data?.currentUser?.tokenWork}</div>
          <div>tokens</div>
        </div>
      )}
    </div>
  )
}

export default CompanyVacancies
