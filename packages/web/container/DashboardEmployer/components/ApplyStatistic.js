import React from 'react'
import { CodepenOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const ApplyStatistic = ({ value = 0, status }) => {
  return (
    <div className="w-full mx-2" style={{ minWidth: '200px' }}>
      <div className="flex flex-col ">
        <div className="h-12 flex border-border-solid border-primary flex-row justify-between bg-primary text-white font-bold items-center">
          <div className="px-4">{status}</div>
          <div className="w-12">
            <CodepenOutlined className="text-3xl" />
          </div>
        </div>
        <div className="flex justify-center items-center border border-solid border-gray-600 border-t-0 py-8">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
    </div>
  )
}
ApplyStatistic.propTypes = {
  value: PropTypes.number,
  status: PropTypes.string,
}
export default ApplyStatistic
